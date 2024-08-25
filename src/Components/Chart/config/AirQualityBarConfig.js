const airQualityBarConfig = {
    series: [
        {
            name: "10 분 전",
            data: [20, 45, 27, 80, 96, 165]
        }, {
            name: "현재",
            data: [32, 53, 25, 65, 104, 160]
        }
    ],
    chart: {
        fontFamily: 'GmarketSansMedium',
        type: 'bar',
        height: '95%',
        toolbar: {
            show: false
        }
    },
    colors: [function ({value, seriesIndex}) {
        if (seriesIndex === 0) {
            return '#595959';
        }

        if (0 <= value && value <= 30) {
            return "#54A0F8";
        }
        if (30 < value && value <= 80) {
            return "#5AC451";
        }
        if (80 < value && value <= 150) {
            return "#F1AA3E";
        }
        if (150 < value) {
            return "#D5534D";
        }
        return '#D5534D';
    }],
    plotOptions: {
        bar: {
            horizontal: false,
            dataLabels: {
                position: 'top',
            },
            columnWidth: '80%'
        }
    },
    dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
            fontSize: '12px',
            colors: ['black']
        }
    },
    stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
    },
    tooltip: {
        shared: true,
        intersect: false
    },
    xaxis: {
        categories: ["로비", "강의실A", "강의실B", "사무실", "서버실", "창고"],
    },
    yaxis: {
        max: 180,
        title: {
            text: '미세먼지 (µg/m³)'
        },
        labels: {
            offsetX: 0
        }
    }
};

let liStyle = {
    flex: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column"
};

let rangeText = {
    marginBottom: "2px",
    marginRight: "7%",
    fontSize: "12px",
    textAlign: "right"
};

let rangeLine = {
    width: "95%",
    height: "4px",
    borderRadius: "4px",
    backgroundColor: "red",
};

let rangeSub = {
    marginTop: "4px",
    fontSize: "12px",
    textAlign: "center",
    color: "#808080"
};

let modalContent = <>
    <div style={{
        fontWeight: "bold",
        textAlign: "start",
        fontSize: "16px",
        marginBottom: "10px"
    }}>
        미세먼지
    </div>
    <div style={{
        color: "#808080"
    }}>
        미세먼지는 1000분의 10mm미만 먼지로 각종 공해와 생물성 연소에서 발생합니다.
        다량 흡입 시 호흡기와 폐에 부정적 영향을 줄 수 있습니다.
    </div>
    <ul style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        listStyle: "none",
        padding: "0",
        margin: "0",
        height: "100%"
    }}>
        <li style={liStyle}>
            <span style={rangeText}>~30</span>
            <span style={{...rangeLine, backgroundColor: "#54A0F8"}}></span>
            <span style={rangeSub}>좋음</span>
        </li>
        <li style={liStyle}>
            <span style={rangeText}>~80</span>
            <span style={{...rangeLine, backgroundColor: "#5AC451"}}></span>
            <span style={rangeSub}>보통</span>
        </li>
        <li style={liStyle}>
            <span style={rangeText}>~150</span>
            <span style={{...rangeLine, backgroundColor: "#F1AA3E"}}></span>
            <span style={rangeSub}>나쁨</span>
        </li>
        <li style={liStyle}>
            <span style={{...rangeText, textAlign: "left", marginLeft: "7%"}}>151~</span>
            <span style={{...rangeLine, backgroundColor: "#D5534D"}}></span>
            <span style={rangeSub}>매우나쁨</span>
        </li>

    </ul>
</>;


export default airQualityBarConfig;
export {modalContent};
