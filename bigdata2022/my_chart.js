const ctx = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Clean', 'Offensive', '', 'Hate'],
        datasets: [{
            label: 'Traffic Source',
            data: [1200, 1900, 3000],
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

var dataFirst = {
    label: "Car A - Speed (mph)",
    data: [0, 59, 75, 20, 20, 55, 40],
    lineTension: 0.4,
    fill: false,
    borderColor: 'red'
  };

var dataSecond = {
    label: "Car B - Speed (mph)",
    data: [20, 15, 60, 60, 65, 30, 70],
    lineTension: 0.4,
    fill: false,
  borderColor: 'blue'
  };

var data1 = {
    label: "Car C - Speed (mph)",
    data: [10, 60, 70, 23, 65, 82, 51],
    lineTension: 0.4,
    fill: false,
  borderColor: 'orange'
  };
var speedData = {
  labels: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"],
  datasets: [dataFirst, dataSecond,data1]
};

var chartOptions = {
  legend: {
    display: true,
    position: 'top',
    labels: {
      boxWidth: 80,
      fontColor: 'black'
    }
  }
};


const earnings = document.getElementById('earning').getContext('2d');
const earning = new Chart(earnings, {
    type: 'line',
    data: {
        labels: ['10h', '10h15', '10h20', '10h30', '10h40', '10h50'],
        datasets: [{
            label: '# Clean',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: 'blue',
            lineTension: 0.4
           
        },{
            label: 'Offensive',
            data: [6, 8, 3, 0, 2, 8],
            borderColor: 'red',
            lineTension: 0.4
           
        },
        {
            label: 'Hate',
            data: [1, 9, 3, 6, 4, 7],
            borderColor: 'orange',
            lineTension: 0.4
           
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

