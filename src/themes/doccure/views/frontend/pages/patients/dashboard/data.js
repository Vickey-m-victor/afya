const heartCharts = {
  series: [{
    data: [140, 100, 180, 130, 100, 130]
  }],
  rateCharts: {
    chart: {
      height: 306,
      type: 'bar',
      events: {
        click: function (chart, w, e) {
        }
      }
    },
    fill: {
      colors: ['#0E82FD']
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: [
        ['Mon'],
        ['Tue'],
        ['Wed'], ,
        ['Thu'],
        ['Fri'],
        ['Sat'],
      ],
    },
    crosshairs: {
      show: false
    }
  }
};

const bloodCharts = {
  series: [{
    data: [90, 60, 30, 60, 90, 70, 70]
  }, {
    data: [110, 90, 40, 120, 130, 130, 130]
  }],
  pressureCharts: {
    chart: {
      type: 'bar',
      height: 306
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },

    fill: {
      opacity: 1,
      colors: ['#0E82FD'],
    },
    states: {
      hover: {
        color: '#00008B'
      }
    }
  }
};

export { heartCharts, bloodCharts };