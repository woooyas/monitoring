import Chart from "../Chart/Chart";
import decibelGaugeConfig from "../Chart/config/DecibelGaugeConfig";

export default function DecibelCard() {
    return (
        <div className="chart-container" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
        }}>
            <div className="card-header" style={{justifyContent: "start"}}>
                <span className="card-title">소음 데시벨 수치</span>
            </div>
            <Chart id="decibel-gauge-chart" option={decibelGaugeConfig}/>
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
