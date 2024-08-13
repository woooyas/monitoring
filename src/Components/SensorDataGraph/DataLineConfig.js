const dataLineConfig = {
    series: [],
    chart: {
        fontFamily: 'GmarketSansMedium',
        height: "90%",
        type: 'line',
        zoom: {
            enabled: true
        },
        toolbar: {
            show: true,
            tools: {
                download: true
            },
        },
    },
    colors: ['#711DB0', '#C21292', '#FC5D19', '#FFA732'],
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 3,
        curve: 'smooth'
    },
    tooltip: {
        x: {
            formatter: function (value) {
                return new Date(value).toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'})
            }
        },
        y: {
            formatter: function (value) {
                return value + " °C";
            }
        }
    },
    grid: {
        borderColor: '#e7e7e7',
    },
    xaxis: {
        labels: {
            show: false
        }
    },
    legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        floating: false
    }
};

export default dataLineConfig;
