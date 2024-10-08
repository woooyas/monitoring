const decibelGaugeConfig = {
    series: [
        {
            name: '현재',
            data: [
                {
                    x: '로비',
                    y: 43,
                    goals: [
                        {
                            name: '권장',
                            value: 50,
                            strokeHeight: 3,
                            strokeWidth: 8,
                            strokeLineCap: 'round',
                            strokeColor: '#595959'
                        }
                    ]
                },
                {
                    x: '사무실',
                    y: 51,
                    goals: [
                        {
                            name: '권장',
                            value: 45,
                            strokeHeight: 3,
                            strokeWidth: 8,
                            strokeLineCap: 'round',
                            strokeColor: '#595959'
                        }
                    ]
                },
                {
                    x: '강의실A',
                    y: 62,
                    goals: [
                        {
                            name: '권장',
                            value: 50,
                            strokeHeight: 3,
                            strokeWidth: 8,
                            strokeLineCap: 'round',
                            strokeColor: '#595959'
                        }
                    ]
                },
                {
                    x: '강의실B',
                    y: 43,
                    goals: [
                        {
                            name: '권장',
                            value: 50,
                            strokeHeight: 3,
                            strokeWidth: 8,
                            strokeLineCap: 'round',
                            strokeColor: '#595959'
                        }
                    ]
                },
                {
                    x: '서버실',
                    y: 57,
                    goals: [
                        {
                            name: '권장',
                            value: 60,
                            strokeHeight: 3,
                            strokeWidth: 8,
                            strokeLineCap: 'round',
                            strokeColor: '#595959'
                        }
                    ]
                },
                {
                    x: '회의실',
                    y: 36,
                    goals: [
                        {
                            name: '권장',
                            value: 45,
                            strokeHeight: 3,
                            strokeWidth: 8,
                            strokeLineCap: 'round',
                            strokeColor: '#595959'
                        }
                    ]
                }
            ]
        }
    ],
    chart: {
        type: 'bar',
        toolbar: {
            show: false
        },
        height: "60%"
    },
    plotOptions: {
        bar: {
            columnWidth: '60%',
            borderRadius: 7
        }
    },
    colors: ['#FC5D19'],
    dataLabels: {
        enabled: false
    },
    legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: ['현재', '권장'],
        markers: {
            fillColors: ['#FC5D19', '#595959']
        },
        offsetY: 0,
    },
    xaxis: {
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
        max: 80,
        labels: {
            show: false
        }
    },
    grid: {
        yaxis: {
            lines: {
                show: false
            }
        },
        padding: {
            top: -35,
            bottom: 0,
            left: -5,
        }
    },
    tooltip: {
        y: {
            formatter: function (value) {
                return value + " dB";
            }
        }
    }
};
export default decibelGaugeConfig;
