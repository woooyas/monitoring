import Chart, {groupDataValue} from "../Chart/Chart";
import decibelGaugeConfig from "../Chart/config/DecibelGaugeConfig";
import {useEffect, useState} from "react";
import axios from "axios";
import qs from "qs";

const locations = ["lobby", "office", "class_a", "class_b", "server_room", "meeting_room"];
export default function DecibelCard() {

    const [chartData, setChartData] = useState({
        lobby: [],
        office: [],
        class_a: [],
        class_b: [],
        server_room: [],
        meeting_room: []
    });
    const [chartConfig, setChartConfig] = useState(decibelGaugeConfig);

    useEffect(() => {
        axios.get("https://m0nit0ring.site/api/sensor-data/recent-noise?page=0&size=6", {
            params: {
                places: locations,
                page: 0,
                size: 6
            }, paramsSerializer: params => {
                return qs.stringify(params, {arrayFormat: "repeat"})
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                const data = response.data.content;
                const groupedData = groupDataValue(data, {
                    lobby: [],
                    office: [],
                    class_a: [],
                    class_b: [],
                    server_room: [],
                    meeting_room: []
                });
                setChartData(groupedData);
            }).catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        const nowValues = locations.map(location => chartData[location]?.[0] || 0);

        setChartConfig({
            ...decibelGaugeConfig,
            series: decibelGaugeConfig.series.map(seriesItem => ({
                ...seriesItem,
                data: seriesItem.data.map((dataItem, dataIndex) => ({
                    ...dataItem,
                    y: nowValues[dataIndex]
                }))
            }))
        });

    }, [chartData]);

    return (
        <div className="chart-container" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
        }}>
            <div className="card-header" style={{justifyContent: "start"}}>
                <span className="card-title">소음 데시벨 수치</span>
            </div>
            <Chart id="decibel-gauge-chart" option={chartConfig}/>
            <div className="card-footer">
                <span className="card-subtitle" style={{
                    textAlign: "justify",
                    fontSize: "13px"
                }}>
                    소음 수준이 업무 집중도와 스트레스 수준에 직접적인 영향을 미칠 수 있습니다.
                </span>
            </div>
        </div>
    );
};
