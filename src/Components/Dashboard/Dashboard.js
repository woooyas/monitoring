import "./Dashboard.css";
import Card from "../Card/Card";
import Chart from "../Chart/Chart";
import BatteryCard from "../Card/BatteryCard";
import tempLineConfig from "../Chart/config/TempLineConfig";
import AirQualityCard from "../Card/AirQualityCard";
import DataSummaryCard from "../Card/DataSummaryCard";
import powerConsumptionConfig from "../Chart/config/PowerConsumptionConfig";
import "../Chart/Chart.css";
import DecibelCard from "../Card/DecibelCard";

function Dashboard() {

    const batteryProps1 = {
        value: "8",
        place: "강의실A",
        sensorId: "sensor-001",
        timestamp: "1분 전 전송됨"
    };
    const batteryProps2 = {
        value: "14",
        place: "창고",
        sensorId: "temp-sensor-02",
        timestamp: "3분 전 전송됨"
    };
    const batteryProps3 = {
        value: 19,
        place: "강의실B",
        sensorId: "sensor-003",
        timestamp: "1분 전 전송됨"
    };
    const batteryProps4 = {
        value: 42,
        place: "로비",
        sensorId: "sensor-012",
        timestamp: "2분 전 전송됨"
    };
    const batteryPropsArray = [batteryProps1, batteryProps2, batteryProps3, batteryProps4];

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
                <div className="chart-container">
                    <Chart id="temperature-line-chart" option={tempLineConfig}/>
                </div>
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
