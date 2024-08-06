import Chart from "../Chart/Chart";
import airQualityBarConfig, {modalContent} from "../Chart/config/AirQualityBarConfig";
import Modal from "../Modal/Modal";
import {useState} from "react";

export default function AirQualityCard() {

    const [chartModal, setChartModal] = useState(false);
    const handleChartModal = () => setChartModal(!chartModal);

    return (
        <div className="chart-container" style={{position: "relative"}}>
            <div className="card-header" style={{justifyContent: "start"}}>
                <span className="card-title">미세먼지 수치</span>
                <span className="material-symbols-outlined"
                      style={{fontSize: "20px", color: "#393E40", marginLeft: "3px"}}
                      onClick={() => handleChartModal()}>info</span>
            </div>
            <div style={{height: "calc(100% - 47px)"}}>
                <Chart id="air-quality-bar-chart" option={airQualityBarConfig}/>
                <Modal chartModal={chartModal} handleChartModal={handleChartModal} element={modalContent}/>
            </div>
        </div>
    );
}
