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
    colors: ['#FC5D19', '#595959'],
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 5,
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
    grid: {
        borderColor: '#e7e7e7',
        padding: {
            left: -3,
            right: -1
        }
    },
    xaxis: {
        categories: ['13시', '14시', '15시', '16시', '17시', '18시', '19시']
    },
    yaxis: {
        min: 0,
        max: 40,
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
