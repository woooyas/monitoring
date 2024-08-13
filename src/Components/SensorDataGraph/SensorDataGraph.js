import {useState} from "react";
import Header from "../DataList/Header";
import MySelect, {measurementOptions, placeOptions} from "../DataList/MySelect";
import "./SensorDataGraph.css";
import DataLineChart from "./DataLineChart";

export default function SensorDataGraph() {
    const [places, setPlaces] = useState([]);
    const [measurement, setMeasurement] = useState("temperature");

    return (
        <div className="main-content"
             style={{flexDirection: "column", overflow: "auto", flexWrap: "nowrap", alignItems: "center"}}>
            <div className="data-list-header-container slim">
                <Header title="센서 데이터 그래프" subtitle="하루 동안의 데이터가 표시됩니다."/>
                <div className="my-select-container" style={{position: "absolute", right: 0, bottom: 0}}>
                    <MySelect isMulti={true} placeholder="장소 선택" defaultValue={null} options={placeOptions}
                              onChange={(selectedOption) => setPlaces(selectedOption.map(option => option.value))}/>
                    <MySelect isMulti={false} placeholder="데이터 선택" defaultValue={measurementOptions[0]}
                              options={measurementOptions.slice(0, 4)}
                              onChange={(selectedOption) => setMeasurement(selectedOption.value)}/>
                </div>
            </div>
            <div className="data-chart-container">
                <DataLineChart places={places} measurement={measurement}/>
            </div>
        </div>
    );
};
