import Chart from "./Chart";
import powerConsumptionConfig from "./config/PowerConsumptionConfig";
import {useEffect, useState} from "react";
import axios from "axios";
import qs from "qs";

function fetchData(startTime, endTime, setThisMonth, setLastMonth) {
    axios.get("https://m0nit0ring.site/api/sensor-data/range", {
        params: {
            measurement: "power_consumption",
            startTime: startTime,
            endTime: endTime
        }, paramsSerializer: params => {
            return qs.stringify(params, {arrayFormat: "repeat"})
        },
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            const data = response.data;
            setLastMonth(data.slice(0, 30).map(data => data.value));
            setThisMonth(data.slice(30, 60).map(data => data.value));
            console.log(data.slice(30, 60).map(data => data.value));

        }).catch(error => console.error('Error fetching data:', error));
}

export default function PowerAreaChart() {
    const [thisMonth, setThisMonth] = useState([]);
    const [lastMonth, setLastMonth] = useState([]);
    const [chartConfig, setChartConfig] = useState(powerConsumptionConfig);


    useEffect(() => {
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        fetchData(todayDate - 60 * 86400000, todayDate.getTime(), setThisMonth, setLastMonth);
    }, []);

    useEffect(() => {
        setChartConfig({
            ...powerConsumptionConfig,
            series: [{
                name: '지난 달',
                data: lastMonth
            }, {
                name: '이번 달',
                data: thisMonth
            }]
        });
    }, [thisMonth, lastMonth]);

    return (
        <div className="chart-container">
            <Chart id="power-area-chart" option={chartConfig}/>
        </div>
    );
}
