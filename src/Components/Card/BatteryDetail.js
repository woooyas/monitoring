import "./BatteryDetail.css"

function BatteryDetail({data}) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "15px",
                paddingRight: "15px",
                textAlign: "left",
                width: "100%",
                justifyContent: "center"
            }}>
            <div className="battery-level" style={{backgroundColor: data.levelColor}}>{data.value}</div>
            <div className="battery-title">{data.place}</div>
            <div className="battery-text">{data.sensorId}</div>
            <div className="battery-text" style={{fontSize: "11px", color: "#5F83E5"}}>{data.timestamp}</div>
        </div>
    );
}

export default BatteryDetail;
