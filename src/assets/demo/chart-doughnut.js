// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily =
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "#292b2c";

// Area Chart Example
var ctx = document.getElementById("myDoughnutChart");
const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};
var myLineChart = new Chart(ctx, {
  type: "doughnut",
  data: data,
  options: {
    // scales: {
    //   xAxes: [
    //     {
    //       time: {
    //         unit: "date",
    //       },
    //       gridLines: {
    //         display: false,
    //       },
    //       ticks: {
    //         maxTicksLimit: 7,
    //       },
    //     },
    //   ],
    //   yAxes: [
    //     {
    //       ticks: {
    //         min: 0,
    //         max: 40000,
    //         maxTicksLimit: 5,
    //       },
    //       gridLines: {
    //         color: "rgba(0, 0, 0, .125)",
    //       },
    //     },
    //   ],
    // },
    legend: {
      display: true,
    },
  },
});
