import "./Dashboard.css";
import Card from "../Card/Card";
import Chart from "../Chart/Chart";
import BatteryCard from "../Card/BatteryCard";
import AirQualityCard from "../Card/AirQualityCard";
import DataSummaryCard from "../Card/DataSummaryCard";
import powerConsumptionConfig from "../Chart/config/PowerConsumptionConfig";
import "../Chart/Chart.css";
import DecibelCard from "../Card/DecibelCard";
import {useEffect, useState} from "react";
import axios from "axios";
import {translateLocation} from "../Sensors/Sensors";
import TemperatureLineChart from "../Chart/TemperatureLineChart";

function Dashboard() {

    const [sensorStatuses, setSensorStatuses] = useState([]);

    useEffect(() => {
        axios.get("https://backend.m0nit0ring.site/api/sensor-statuses/low-battery?page=0&size=4")
            .then(response => {
                setSensorStatuses(response.data.content);
            }).catch(error => console.error('Error fetching data:', error));
    }, []);

    const batteryPropsArray = [];
    sensorStatuses.map(data => (
        batteryPropsArray.push({
            value: data.batteryLevel,
            place: translateLocation(data.sensor.location),
            sensorId: data.sensor.deviceId,
            timestamp: Math.floor(((Date.now() - data.time) / (1000 * 60 * 60)) % 24) + "시간 전 전송됨"
        })
    ));

    return (
        <div className="main-content">
            <Card width="100%" height="20%" content={<>
                <DataSummaryCard title="온도" value="27 °C" change="2 °C  상승"/>
                <DataSummaryCard title="습도" value="53 %" change="7 %  감소"/>
                <DataSummaryCard title="CO₂" value="869 ppm" change="105 ppm  상승"/>
                <DataSummaryCard title="총 방문자 수" value="24 명" change="3 명  감소"/>
            </>}/>
            <Card width="calc(100% - 15px - 40%)" height="calc((100% - 30px - 20%) / 2)" content={
                <BatteryCard dataArray={batteryPropsArray}/>
            }/>
            <Card className="center" width="40%" height="calc((100% - 30px - 20%) / 2)" content={
                <TemperatureLineChart/>
            }/>
            <Card width="calc((100% - 30px - 45%) / 2)" height="calc((100% - 30px - 20%) / 2)" content={
                <div className="chart-container">
                    <Chart id="rpowe-area-chart" option={powerConsumptionConfig}/>
                </div>
            }/>
            <Card width="45%" height="calc((100% - 30px - 20%) / 2)" content={
                <AirQualityCard/>
            }/>
            <Card width="calc((100% - 30px - 45%) / 2)" height="calc((100% - 30px - 20%) / 2)" content={
                <DecibelCard/>
            }/>
        </div>
    );
}

export default Dashboard;
