import "./Chart.css"
import Chart, {groupData} from "./Chart";
import tempLineConfig from "./config/TempLineConfig";
import {useEffect, useState} from "react";
import axios from "axios";

export default function TemperatureLineChart() {

    const [chartData, setChartData] = useState({
        outdoor: [],
        class_a: [],
        office: [],
        lobby: []
    });

    const [chartConfig, setChartConfig] = useState(tempLineConfig);

    useEffect(() => {
        axios.get("https://backend.m0nit0ring.site/api/sensor-data/recent-temperature")
            .then(response => {
                const data = response.data;
                const groupedData = groupData(data, {
                    outdoor: [],
                    class_a: [],
                    office: [],
                    lobby: []
                });

                setChartData(groupedData);
            }).catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        setChartConfig({
            ...tempLineConfig,
            series: [
                {
                    name: "야외",
                    data: chartData["outdoor"].reverse().map(data => data.value)
                },
                {
                    name: "강의실A",
                    data: chartData["class_a"].reverse().map(data => data.value)
                },
                {
                    name: "사무실",
                    data: chartData["office"].reverse().map(data => data.value)
                },
                {
                    name: "로비",
                    data: chartData["lobby"].reverse().map(data => data.value)
                }
            ],
            xaxis: {
                type: 'datetime',
                categories: chartData["outdoor"].reverse().map(data => data.time),
                labels: {
                    show: false
                }
            }
        });
    }, [chartData]);

    return (
        <div className="chart-container">
            <Chart id="temperature-line-chart" option={chartConfig}/>
        </div>
    );
};
