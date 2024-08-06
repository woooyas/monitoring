import "./Card.css";

function Card(props) {
    let className = props.className === undefined ? "" : props.className;
    let color = props.color === undefined ? "white" : props.color;

    return (
        <div className={"card " + className} style={{width: props.width, height: props.height, backgroundColor: color}}>
            {props.content}
        </div>
    );
}

export default Card;
