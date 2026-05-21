const revenueChart = {
    chart: {
        height: 220,
        width: '100%',
        type: 'bar',
        stacked: true,
        toolbar: {
            show: false,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                endingShape: 'rounded',
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 1,
        },
        xaxis: {
            categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$ " + val + "k"
                }
            }
        }
    },
    series: [{
        name: 'High',
        color: '#0E82FD',
        borderRadius: 10,
        data: [50, 40, 15, 45, 35, 48, 65]
    }],
}

const appointmentChart = {
    chart: {
        height: 220,
        type: 'bar',
        stacked: true,
        barColors: ['red'],
        toolbar: {
          show: false,
        },
        
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '50%',
            endingShape: 'rounded'  
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 1,
    },
    xaxis: {
        categories: ['M','T', 'W', 'T','F','S','S'],
    },
    tooltip: {
        y: {
            formatter: function (val) {
                return "$ " + val + "k"
            }
        }
    }
    },
    series: [{
         name: 'High',
        color: '#0F172A',
        data: [40,20,30,65,85,35,90]
    }],
    
}

export { revenueChart, appointmentChart };