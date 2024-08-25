import "./Dashboard.css";
import Card from "../Card/Card";
import BatteryCard from "../Card/BatteryCard";
import AirQualityCard from "../Card/AirQualityCard";
import "../Chart/Chart.css";
import DecibelCard from "../Card/DecibelCard";
import {useEffect, useState} from "react";
import axios from "axios";
import {translateLocation} from "../Sensors/Sensors";
import TemperatureLineChart from "../Chart/TemperatureLineChart";
import DataSummaryCards from "../Card/DataSummaryCards";
import PowerAreaChart from "../Chart/PowerAreaChart";

function Dashboard() {

    const [sensorStatuses, setSensorStatuses] = useState([]);

    useEffect(() => {
        axios.get("https://m0nit0ring.site/api/sensor-statuses/low-battery?page=0&size=4")
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
                <DataSummaryCards/>
            </>}/>
            <Card width="calc(100% - 15px - 40%)" height="calc((100% - 30px - 20%) / 2)" content={
                <BatteryCard dataArray={batteryPropsArray}/>
            }/>
            <Card className="center" width="40%" height="calc((100% - 30px - 20%) / 2)" content={
                <TemperatureLineChart/>
            }/>
            <Card width="calc((100% - 30px - 45%) / 2)" height="calc((100% - 30px - 20%) / 2)" content={
                <PowerAreaChart/>
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
