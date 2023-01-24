import React from 'react'

const Modal = ({ heading, closeModal }) => {
    return (
        <div className="container">
            <div className="modalHeader">
                <h2 style={{ fontSize: "25px", fontWeight: "bold" }}>{heading}</h2>
                <img src={require('../../assets/images/close.png')} className="closeBtn" style={{height:"10px" ,width:"10px"}}  onClick={() => closeModal(false)} />
            </div>
            <div className="modalContent">
                <div>
                    <h3 className="dialogTitle">RCC01</h3>
                    <h3 className="dialogTitle">PRODUCTION_WH1_IN47</h3>
                    <h3 className="dialogTitle">F1=<span className="dialogTitle">Display about dialog</span></h3>
                    <h3 className="dialogTitle">F2=<span className="dialogTitle">Display lookup screen</span></h3>
                    <h3 className="dialogTitle">F11=<span className="dialogTitle">Display messaging screen</span></h3>
                    <hr style={{ height: "2px", borderWidth: 0, color: "grey", backgroundColor: "grey" }}></hr>

                    <h3 className="dialogTitle">F7=<span className="dialogTitle">Close ASN </span></h3>

                </div>
            </div>
        </div>
    )
}

export default Modal