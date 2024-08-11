import "./modal.css"

function Modal({chartModal, handleChartModal, element}) {
    return (
        <div className="modal" style={{display: chartModal ? "flex" : "none"}}>
            <div className="modal-container">
                {element}
            </div>
            <button className="modal-close" onClick={() => handleChartModal()}>
                <span className="material-symbols-outlined">close</span>
            </button>
        </div>
    );
}

export default Modal;
