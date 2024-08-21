import "../DataList/DataList.css"
import {useEffect, useState} from "react";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import Header from "../DataList/Header";
import MySelect, {sizeOptions} from "../DataList/MySelect";
import SortButton from "../DataList/SortButton";
import qs from "qs";

const translateLocation = (location) => {
    switch (location) {
        case "class_a":
            return "강의실A";
        case "class_b":
            return "강의실B";
        case "office":
            return "사무실";
        case "storage":
            return "창고";
        case "meeting_room":
            return "회의실";
        case "server_room":
            return "서버실";
        case "lobby":
            return "로비";
        case "outdoor":
            return "야외";
        case "total":
            return "전체";
        default:
            return location;
    }
}

export default function Sensors() {

    const [sensorStatuses, setSensorStatuses] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(10);
    const [pageNum, setPageNum] = useState(0);
    const [inputValues, setInputValues] = useState({});
    const [sortOrder, setSortOrder] = useState("DESC");

    const handleInputChange = (sensorId, newValue) => {
        setInputValues(prevValues => ({
            ...prevValues,
            [sensorId]: newValue
        }));
    };

    const saveSensorName = (sensorId) => {
        const newSensorName = inputValues[sensorId];
        axios.put(`https://m0nit0ring.site/api/sensors/${sensorId}/name`,
            {sensorName: newSensorName},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .catch(error => console.error('Error saving name:', error));
    };

    useEffect(() => {
        axios.get(`https://m0nit0ring.site/api/sensor-statuses/latest`, {
            params: {
                page: pageNum,
                size: size,
                sort: `batteryLevel,${sortOrder}`
            }, paramsSerializer: params => {
                return qs.stringify(params, {arrayFormat: "repeat", encode: false})
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            setSensorStatuses(response.data.content);
            setTotalPages(response.data.totalPages);
        }).catch(error => console.error('Error fetching data:', error))
    }, [pageNum, size, sortOrder]);

    useEffect(() => {
        setPageNum(0);
    }, [size]);

    return (
        <div className="main-content"
             style={{
                 flexDirection: "column",
                 overflow: "auto",
                 flexWrap: "nowrap",
                 alignItems: "center",
             }}>
            <div className="data-list-header-container">
                <Header title="센서 상태 정보" subtitle="배터리 잔량이 20% 이하일 경우 빨간색으로 표시됩니다."/>
                <div className="my-select-container" style={{position: "absolute", right: 0, bottom: 0}}>
                    <MySelect options={sizeOptions} defaultValue={sizeOptions[0]}
                              onChange={(selectedOption) => setSize(selectedOption.value)}/>
                </div>
            </div>
            <ul className="data-list">
                <li className="data-item-header">
                    <div>센서 아이디</div>
                    <div>센서명</div>
                    <div>설치 장소</div>
                    <div>배터리<SortButton setSortField={() => {
                    }} sortOrder={sortOrder} setSortOrder={setSortOrder}/></div>
                </li>
                {
                    sensorStatuses.map(data => (
                        <li className="data-item" key={data.statusId}
                            style={{
                                backgroundColor: data.batteryLevel <= 20 ? '#f5afac' : ''
                            }}>
                            <div>{data.sensor.deviceId}</div>
                            <div className="data-name-container">
                                <input
                                    className={`sensor-name-input ${data.sensor.sensorName ? "name-active" : ""}`}
                                    type="text"
                                    placeholder={data.sensor.sensorName || "별명 없음"}
                                    value={inputValues[data.sensor.sensorId] || ''}
                                    onChange={(e) => handleInputChange(data.sensor.sensorId, e.target.value)}/>
                                <button className="sensor-name-submit"
                                        onClick={() => {
                                            if (inputValues[data.sensor.sensorId]) {
                                                saveSensorName(data.sensor.sensorId);
                                                alert("저장되었습니다.");
                                            }
                                        }}>
                                        <span className="material-symbols-outlined"
                                              style={{color: "#96989a"}}>edit</span>
                                </button>
                            </div>
                            <div>{translateLocation(data.sensor.location)}</div>
                            <div>{data.batteryLevel}</div>
                        </li>
                    ))
                }
            </ul>
            <nav className="data-list-footer">
                <Pagination totalPages={totalPages} pageNum={pageNum} setPageNum={setPageNum}/>
            </nav>
        </div>
    );
}

export {translateLocation};
