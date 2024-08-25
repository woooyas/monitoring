import "../DataList/DataList.css";
import {useEffect, useState} from "react";
import axios from "axios";
import Header from "../DataList/Header";
import Pagination from "../Pagination/Pagination";
import {translateLocation} from "../Sensors/Sensors";
import MySelect, {measurementOptions, placeOptions, sizeOptions} from "../DataList/MySelect";
import qs from "qs";
import SortButton from "../DataList/SortButton";
import "./SensorData.css";

export default function SensorData() {

    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(10);
    const [pageNum, setPageNum] = useState(0);
    const [sensorData, setSensorData] = useState([]);
    const [places, setPlaces] = useState([]);
    const [measurements, setMeasurements] = useState([]);
    const [sortField, setSortField] = useState("time");
    const [sortOrder, setSortOrder] = useState("DESC");

    useEffect(() => {
        axios.get("https://m0nit0ring.site/api/sensor-data/recent-data", {
            params: {
                places: places,
                measurements: measurements,
                page: pageNum,
                size: size,
                sort: `${sortField},${sortOrder}`
            }, paramsSerializer: params => {
                return qs.stringify(params, {arrayFormat: "repeat", encode: false})
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            const data = response.data.content;
            setSensorData(data);
            setTotalPages(response.data.totalPages);
        }).catch(error => console.error('Error fetching data:', error));
    }, [pageNum, size, places, measurements, sortField, sortOrder]);

    useEffect(() => {
        setPageNum(0);
    }, [size]);

    return (
        <div className="main-content"
             style={{flexDirection: "column", overflow: "auto", flexWrap: "nowrap", alignItems: "center"}}>
            <div className="data-list-header-container slim">
                <Header title="센서 데이터 로그" /*subtitle="표와 그래프로 확인할 수 있습니다."*/ setSize={setSize}/>
                <div className="my-select-container" style={{position: "absolute", right: 0, bottom: 0}}>
                    <MySelect isMulti={true} placeholder="장소 선택" defaultValue={null} options={placeOptions}
                              onChange={(selectedOption) => setPlaces(selectedOption.map(option => option.value))}/>
                    <MySelect isMulti={true} placeholder="데이터 선택" defaultValue={null} options={measurementOptions}
                              onChange={(selectedOption) => setMeasurements(selectedOption.map(option => option.value))}/>
                    <MySelect options={sizeOptions} defaultValue={sizeOptions[0]}
                              onChange={(selectedOption) => setSize(selectedOption.value)}/>
                </div>
            </div>
            <ul className="data-list log-list">
                <li className="data-item-header">
                    <div>센서 아이디<SortButton value="sensor.sensorId" setSortField={setSortField} sortOrder={sortOrder}
                                           setSortOrder={setSortOrder}/></div>
                    <div>센서명<SortButton value="sensor.sensorName" setSortField={setSortField} sortOrder={sortOrder}
                                        setSortOrder={setSortOrder}/></div>
                    <div>장소<SortButton value="place" setSortField={setSortField} sortOrder={sortOrder}
                                       setSortOrder={setSortOrder}/></div>
                    <div>종류<SortButton value="measurement" setSortField={setSortField} sortOrder={sortOrder}
                                       setSortOrder={setSortOrder}/></div>
                    <div>시간<SortButton value="time" setSortField={setSortField} sortOrder={sortOrder}
                                       setSortOrder={setSortOrder}/></div>
                    <div>값<SortButton value="value" setSortField={setSortField} sortOrder={sortOrder}
                                      setSortOrder={setSortOrder}/></div>
                </li>
                {
                    sensorData.map(data => (
                        <li className="data-item" key={data.dataId}>
                            <div>{data.sensor.deviceId}</div>
                            <div style={{color: data.sensor.sensorName ? "black" : "#757575"}}>
                                {data.sensor.sensorName || "별명 없음"}</div>
                            <div>{translateLocation(data.sensor.location)}</div>
                            <div>{data.measurement}</div>
                            <div>{new Date(data.time).toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'})}</div>
                            <div>{data.value}</div>
                        </li>
                    ))
                }
            </ul>
            <nav className="data-list-footer">
                <Pagination totalPages={totalPages} pageNum={pageNum} setPageNum={setPageNum}/>
            </nav>
        </div>
    );
};
