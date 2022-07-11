import sys

import pyspark
from pyspark.sql import SparkSession
from pyspark.sql.functions import col
from pyspark.sql import types as t
from data_preprocessing import pre_process_data
from pyspark.sql.types import StructType, StructField, StringType
from pyspark.sql import SparkSession, DataFrame
from pyspark.ml import PipelineModel
from pyspark.sql.functions import udf
from pyspark.sql.streaming import DataStreamReader, DataStreamWriter
from pyspark.sql.types import StructType, StructField, StringType, ArrayType, FloatType, DoubleType

from IPython.display import display, clear_output
import html
from time import sleep
import pandas as pd
import numpy as np
import pickle
import base64
import requests
import json

import findspark
findspark.init()

# spark-submit spark_streaming.py
# python spark_streaming.py

with open("config.json") as f:
    config = json.load(f)

inpath = config['output_path']
server = config['server']
refresh = config['refresh']


def send_df_to_dashboard(df):
    pickled = pickle.dumps(df)
    pickled_b64 = base64.b64encode(pickled)
    hug_pickled_str = pickled_b64.decode('utf-8')
    url = f"http://{server}/updateData"
    request_data = {'data': str(hug_pickled_str)}
    response = requests.post(url, data=request_data)
    print(f"Response - {response}")


def main():
    timestampformat = "dd-MM-yyyy'T'HH:mm:ss"

    spark = SparkSession.builder.appName(
        "FacebookCommentStreaming").getOrCreate()
    spark.sql("set spark.sql.legacy.timeParserPolicy=LEGACY")
    spark.conf.set("spark.sql.legacy.timeParserPolicy", "LEGACY")

    schema = StructType([
        StructField("user", StringType(), True),
        StructField("comment", StringType(), True),
        StructField("timestamp", StringType(), True)
    ])

    spark_reader = spark.readStream.schema(schema)

    streaming_data_raw = (
        spark_reader.json(inpath)
        .select(
            col("timestamp").cast('double').alias("timestamp"),
            "user",
            "comment"
        )
        .coalesce(1)
    )

    streaming_data_clean = pre_process_data(streaming_data_raw)

    # est = init_estimator()
    # predictions = est.predict(
    #     data=streaming_data_clean, feature_cols=['comment_encoded'])

    stream_writer = (
        streaming_data_clean.writeStream.queryName("Predictions")
        .trigger(processingTime='20 seconds')
        .outputMode("append")
        .format("memory")
    )

    query = stream_writer.start()
    # query.awaitTermination()

    if streaming_data_clean.isStreaming:
        from load_model import init_estimator, convert_prediction
        est = init_estimator()

        x = 0
        while True:
            try:
                if not query.isActive:
                    print("The query is not active!")
                    break

                print(f"Showing live view refreshed every {refresh} seconds...")
                print(f"Second passed: {x*refresh}")

                result = spark.sql(f"SELECT * FROM {query.name}")
                predictions = est.predict(data=result, feature_cols=['comment_encoded'])
                pd_prediction = convert_prediction(predictions).toPandas()

                # result = result.select('timestamp', 'user', 'comment')
                # pd_result = result.toPandas()
                display(pd_prediction)

                send_df_to_dashboard(pd_prediction)

                sleep(refresh)
                clear_output(wait=True)
                x += 1
            except KeyboardInterrupt:
                print("Break")
                break
        print("Live view ended...")
    else:
        print("Not streaming, showing static output instead")


if __name__ == "__main__":
    main()
