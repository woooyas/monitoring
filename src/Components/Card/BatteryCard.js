import Card from "./Card";
import BatteryDetail from "./BatteryDetail";
import {Link} from "react-router-dom";

function BatteryCard({dataArray}) {

    const data = [];

    for (let i = 0; i < dataArray.length; i++) {
        dataArray[i].levelColor = "#54A0F8";
        dataArray[i].backColor = "#B2D7FF";
        if (Number(dataArray[i].value) <= 10) {
            dataArray[i].levelColor = "#D5534D";
            dataArray[i].backColor = "#EBA9A6";
        }
        if (Number(dataArray[i].value) > 10 && Number(dataArray[i].value) < 20) {
            dataArray[i].levelColor = "#F1AA3E";
            dataArray[i].backColor = "#F8D6A1";
        }
        data.push(
            <Card key={dataArray[i].sensorId} width="25%" height="95%" color={dataArray[i].backColor} content={
                <BatteryDetail data={dataArray[i]}/>}></Card>);
    }

    return (
        <>
            <div className="card-header">
                    <span className="card-title">
                        센서 배터리 현황
                    </span>
                <Link className="see-all" to="/">전체보기</Link>
                <span className="card-subtitle">배터리 잔량이 낮은 센서들을 우선적으로 표시합니다.</span>
            </div>
            <div className="battery-container">
                {data}
            </div>
        </>
    );
}

export default BatteryCard;
