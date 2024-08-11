import "./DataSummaryCard.css"

export default function DataSummaryCard({title, value, change}) {
    let changeColor;
    if (change.includes("상승")) {
        changeColor = "#5AC451"
    }
    if (change.includes("감소")) {
        changeColor = "#D5534D"
    }

    return (
        <div className="data-summary-container">
            <span className="data-summary-title">{title}</span>
            <span className="data-summary-value">{value}</span>
            <div className="data-summary-sub">
                <span style={{color: changeColor}}>{change}</span>
                <span style={{marginRight: "10px"}}>어제 대비</span>
            </div>
        </div>
    );
};
