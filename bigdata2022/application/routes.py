
from application import app

from plotly.offline import plot
from plotly.graph_objs import Scatter
from flask import Markup,render_template, request, redirect, url_for


@app.route('/')
@app.route('/results', methods=['GET', 'POST'])
def results():
    error = None
    # if request.method == 'POST':
    my_plot_div = plot([Scatter(x=[1, 2, 3], y=[3, 1, 6])], output_type='div')
    return render_template('results.html',
                            div_placeholder=Markup(my_plot_div)
                            )
    # If user tries to get to page directly, redirect to submission page
    #elif request.method == "GET":
        #return redirect(url_for('submission', error=error))

