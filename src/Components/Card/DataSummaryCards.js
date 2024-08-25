import DataSummaryCard from "./DataSummaryCard";
import {useEffect, useState} from "react";
import axios from "axios";
import qs from "qs";

function fetchData(places, measurement, setState) {
    axios.get("https://m0nit0ring.site/api/sensor-data/recent-and-yesterday", {
        params: {
            places: places,
            measurement: measurement,
        }, paramsSerializer: params => {
            return qs.stringify(params, {arrayFormat: "repeat", encode: false})
        }
    }).then(response => {
        const data = response.data;
        setState(data);
    }).catch(error => console.error("Error fetching data:", error));
}

function getChangeString(data, unit) {
    let diff = Math.round((data.recent - data.yesterday) * 10) / 10;
    let str = Math.abs(diff) + " " + unit + " ";
    if (diff > 0) {
        return str + "증가";
    }
    if (diff === 0) {
        return "변화 없음";
    }
    if (diff < 0) {
        return str + "감소";
    }
}

export default function DataSummaryCards() {
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [co2, setCo2] = useState(null);
    const [visitor, setVisitor] = useState(null);

    useEffect(() => {
        fetchData(["lobby", "class_a", "class_b", "office", "meeting_room", "server_room", "storage"], "temperature", setTemperature);
        fetchData(["lobby", "class_a", "class_b", "office", "meeting_room", "server_room", "storage"], "humidity", setHumidity);
        fetchData(["class_a", "class_b"], "co2", setCo2);
        fetchData(["total"], "visitor", setVisitor);
    }, []);

    return (
        <>
            {temperature && <DataSummaryCard title="평균 온도" value={temperature.recent + " °C"} change={getChangeString(temperature, "°C")}/>}
            {humidity && <DataSummaryCard title="평균 습도" value={humidity.recent + " %"} change={getChangeString(humidity, "%")}/>}
            {co2 && <DataSummaryCard title="평균 CO₂" value={co2.recent + " ppm"} change={getChangeString(co2, "ppm")}/>}
            {visitor && <DataSummaryCard title="총 방문자 수" value={visitor.recent + " 명"} change={getChangeString(visitor, "명")}/>}
        </>
    );
};
