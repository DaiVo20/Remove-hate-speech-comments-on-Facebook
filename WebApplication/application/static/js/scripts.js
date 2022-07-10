const ctx = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: [{% for item in labels_doughnut %}
                    "{{item}}",
                {% endfor %}],
        datasets: [{
            label: 'Count',
            data: [{% for item in values_doughnut %}
                    "{{item}}",
                {% endfor %}],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

var src_Labels = [];
var srt_Values = [];

setInterval(function(){
    $.getJSON('/refreshData', {
    }, function(data) {
        src_Labels = data.labels_doughnut;
        src_Labels = data.values_doughnut;
    });

    myChart.data.labels = src_Labels;
    myChart.data.datasets.data = srt_Values
    
    myChart.update();

},1000);

// var dataFirst = {
//     label: "Car A - Speed (mph)",
//     data: [0, 59, 75, 20, 20, 55, 40],
//     lineTension: 0.4,
//     fill: false,
//     borderColor: 'red'
//   };

// var dataSecond = {
//     label: "Car B - Speed (mph)",
//     data: [20, 15, 60, 60, 65, 30, 70],
//     lineTension: 0.4,
//     fill: false,
//   borderColor: 'blue'
//   };

// var data1 = {
//     label: "Car C - Speed (mph)",
//     data: [10, 60, 70, 23, 65, 82, 51],
//     lineTension: 0.4,
//     fill: false,
//   borderColor: 'orange'
//   };
// var speedData = {
//   labels: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"],
//   datasets: [dataFirst, dataSecond,data1]
// };

// var chartOptions = {
//   legend: {
//     display: true,
//     position: 'top',
//     labels: {
//       boxWidth: 80,
//       fontColor: 'black'
//     }
//   }
// };


// const earnings = document.getElementById('earning').getContext('2d');
// const earning = new Chart(earnings, {
//     type: 'line',
//     data: {
//         labels: ['10h', '10h15', '10h20', '10h30', '10h40', '10h50'],
//         datasets: [{
//             label: '# Clean',
//             data: [12, 19, 3, 5, 2, 3],
//             borderColor: 'blue',
//             lineTension: 0.4
           
//         },{
//             label: 'Offensive',
//             data: [6, 8, 3, 0, 2, 8],
//             borderColor: 'red',
//             lineTension: 0.4
           
//         },
//         {
//             label: 'Hate',
//             data: [1, 9, 3, 6, 4, 7],
//             borderColor: 'orange',
//             lineTension: 0.4
           
//         }]

//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });

// const ctx = document.getElementById("myChart").getContext('2d');;
// const myChart = new Chart(ctx, {
//     type: 'doughnut',
//     data: {
//         labels: ['Clean', 'Offfensive', 'Hate'],
//         datasets: [{
//             data: [65, 59, 80],
//             backgroundColor: [
//             'rgba(255, 99, 132, 0.2)',
//             'rgba(255, 159, 64, 0.2)',
//             'rgba(255, 205, 86, 0.2)'
//             ],
//             borderColor: [
//             'rgb(255, 99, 132)',
//             'rgb(255, 159, 64)',
//             'rgb(255, 205, 86)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: True
//             }
            
//         }
//     }
// });

// var src_Labels = [];
// var src_Data_pos = [];
// var src_Data_neu = [];
// var src_Data_neg = [];

// setInterval(function(){
//     $.getJSON('/refreshData', {
//     }, function(data) {
//         src_Labels = data.sLabel;
//         src_Data_pos = data.sData_pos;
//         src_Data_neu = data.sData_neu;
//         src_Data_neg = data.sData_neg;
//     });

//     myChart.data.labels = src_Labels;
//     myChart.data.datasets[0].data = src_Data_pos;
//     myChart.data.datasets[1].data = src_Data_neu;
//     myChart.data.datasets[2].data = src_Data_neg;
    
//     myChart.update();

// },1000);