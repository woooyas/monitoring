const today = new Date();
const monthAgo = new Date(today);
monthAgo.setMonth(today.getMonth() - 1);

const getDatesStartToLast = (startDate, lastDate) => {
    const result = [];
    const current = new Date(startDate);
    const end = new Date(lastDate);

    while (current <= end) {
        result.push(current.toISOString().split('T')[0]);
        current.setDate(current.getDate() + 1);
    }
    return result;
};

function generateRandomData(startValue, days) {
    const data = [];
    for (let i = 0; i < days; i++) {
        let currentValue = startValue;
        currentValue += (Math.random() - 0.5) * 30;
        data.push(Math.round(currentValue));
    }
    return data;
}

let oneMonth = getDatesStartToLast(monthAgo, today);

const powerConsumptionConfig = {
    series: [{
        name: '지난 달',
        data: generateRandomData(130, oneMonth.length)
    }, {
        name: '이번 달',
        data: generateRandomData(135, oneMonth.length)
    }],
    chart: {
        fontFamily: 'GmarketSansMedium',
        height: "95%",
        type: 'area',
        toolbar: {
            show: false
        }
    },
    title: {
        text: '전월 대비 전력 소비량',
        offsetX: -5,
        offsetY: 16,
        align: 'left',
        style: {
            fontSize: '20px',
            fontWeight: 'bold'
        }
    },
    colors: ['#595959', '#FC5D19'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    tooltip: {
        x: {
            format: 'yy.MM.dd'
        },
        y: {
            formatter: function (value) {
                return value + " kWh";
            }
        }
    },
    xaxis: {
        type: 'datetime',
        categories: oneMonth,
        labels: {
            show: false
        },
        axisTicks: {
            show: false
        },
        axisBorder: {
            show: false
        }
    },
    yaxis: {
        min: 100,
        max: 160,
        labels: {
            offsetX: -10,
            show: false
        }
    },
    grid: {
        padding: {
            left: -5,
            right: -5
        },
        yaxis: {
            lines: {
                show: false
            }
        }
    }
};

export default powerConsumptionConfig;
