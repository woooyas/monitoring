const tempLineConfig = {
    series: [
        {
            name: "야외",
            data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
            name: "강의실",
            data: [21, 21, 24, 25, 26, 23, 23]
        },
        {
            name: "창고",
            data: [12, 11, 14, 18, 17, 13, 13]
        },
        {
            name: "냉장고",
            data: [3, 2, 4, 5, 6, 3, 3]
        }
    ],
    chart: {
        fontFamily: 'GmarketSansMedium',
        height: "95%",
        type: 'line',
        zoom: {
            enabled: true
        },
        toolbar: {
            show: true,
            offsetX: -10,
            offsetY: 15,
            tools: {
                download: false
            }
        }
    },
    colors: ['#711DB0', '#C21292', '#FC5D19', '#FFA732'],
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 3,
        curve: 'smooth'
    },
    title: {
        text: '장소별 온도',
        offsetY: 16,
        align: 'left',
        style: {
            fontSize: '20px',
            fontWeight: 'bold'
        }
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
        padding: {
            left: -3,
            right: -1,
            bottom: -10,
            top: 10
        }
    },
    xaxis: {
        labels: {
            show: false
        }
    },
    yaxis: {
        labels: {
            offsetX: -10
        }
    },
    legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        floating: false
    }
};

export default tempLineConfig;
