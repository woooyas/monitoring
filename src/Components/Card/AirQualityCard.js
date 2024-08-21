import Chart, {groupDataValue} from "../Chart/Chart";
import airQualityBarConfig, {modalContent} from "../Chart/config/AirQualityBarConfig";
import Modal from "../Modal/Modal";
import {useEffect, useState} from "react";
import axios from "axios";
import qs from "qs";

const locations = ["lobby", "class_a", "class_b", "office", "server_room", "storage"];

export default function AirQualityCard() {

    const [chartModal, setChartModal] = useState(false);
    const [chartData, setChartData] = useState({
        lobby: [],
        class_a: [],
        class_b: [],
        office: [],
        server_room: [],
        storage: []
    });
    const [chartConfig, setChartConfig] = useState(airQualityBarConfig);

    useEffect(() => {
        axios.get("https://m0nit0ring.site/api/sensor-data/recent-dust", {
            params: {
                places: locations,
                page: 0,
                size: 12
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
                    class_a: [],
                    class_b: [],
                    office: [],
                    server_room: [],
                    storage: []
                });
                setChartData(groupedData);
            }).catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        const prevValues = [];
        const nowValues = [];

        (function () {
            locations.forEach(location => {
                prevValues.push(chartData[location]?.[1] || 0);
                nowValues.push(chartData[location]?.[0] || 0);
            });
        })();

        setChartConfig({
            ...airQualityBarConfig,
            series: [
                {
                    name: "10 분 전",
                    data: prevValues
                },
                {
                    name: "현재",
                    data: nowValues
                }
            ]
        });
    }, [chartData]);

    const handleChartModal = () => setChartModal(!chartModal);

    return (
        <div className="chart-container" style={{position: "relative"}}>
            <div className="card-header" style={{justifyContent: "start"}}>
                <span className="card-title">미세먼지 수치</span>
                <span className="material-symbols-outlined"
                      style={{fontSize: "20px", color: "#393E40", marginLeft: "3px"}}
                      onClick={() => handleChartModal()}>info</span>
            </div>
            <div style={{height: "calc(100% - 47px)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Chart id="air-quality-bar-chart" option={chartConfig}/>
                <Modal chartModal={chartModal} handleChartModal={handleChartModal} element={modalContent}/>
            </div>
        </div>
    );
}
