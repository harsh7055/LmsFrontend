import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.styles.css";
import { useParams } from "react-router-dom";
import React from "react";
import Header from "../../components/Header";
import BarcodeReader from 'react-barcode-reader'
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar"
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export const UserContext = React.createContext();


const SkuScanner = ({ store, setStore }) => {
useEffect(() => {
    setpath(window.location.pathname)
}, [])
    // console.log(SkuDetail);
    const navigate = useNavigate();
    const param = useParams();
    const initialState = {
        currScan: "",
        sku: "",
        packkey: "",
        loc: "",
        uom: "",
        Lottable06: localStorage.getItem("SLOC"),
        team: localStorage.getItem("team"),
        id: localStorage.getItem("LPN"),
        controlkey: localStorage.getItem("controlKey"),
        storerkey: localStorage.getItem("owner"),
        loc: localStorage.getItem("location")
    }
    const [openf1Modal, setOpenF1Modal] = useState(false);
    const [openf2Modal, setOpenF2Modal] = useState(false);
    const [openf4Modal, setOpenF4Modal] = useState(false);
    const [openf7Modal, setOpenF7Modal] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [openWarning, setOpenWarning] = useState(false);
    const [data, setdata] = useState(initialState)
    const [sku, setsku] = useState()
    const [count, setcount] = useState(0)
    const tokenData = localStorage.getItem("Token")
    const [path, setpath] = useState()

    console.log(window.location.pathname);



    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenWarning(false);
        setOpenError(false);
        setOpenSuccess(false);
    };
    const getApi = () => {
        if (tokenData == undefined) {
            console.log("token wrong")
        } else {
            const jsondata = {
                headers: {
                    Authorization: "Bearer" + " " + tokenData,
                },
                owner: localStorage.getItem("owner"),
                warehouse: localStorage.getItem("warehouse"),
                altsku: sku
            }

            axios.post("http://ec2-15-152-41-1.ap-northeast-3.compute.amazonaws.com:8000/altsku", jsondata)
                .then(res => {
                    console.log(res);
                    if (res.status == '200') {
                        console.log(res.data.sku);
                        setStore([...store, {
                            ...data,
                            currScan: sku,
                            sku: res.data.sku,
                            packkey: res.data.packkey,
                            uom: res.data.barcodeuom,
                        }]);
                        setsku("")
                        console.log(store);
                    }
                })
                .catch(err => {
                    console.log(err)
                    setOpenError(true)
                    setMessage("invalid Sku")
                })
        }
    }
    console.log(store);
    const convert = (store) => {
        const res = {};
        store.forEach((obj) => {
            const key = `${obj.sku}${obj["currScan"]}`;
            if (!res[key]) {
                res[key] = { ...obj, qty: 0 };
            };
            res[key].qty += 1;
        });
        return Object.values(res);
    };
    const skuQuantity = convert(store);
    console.log(skuQuantity);
    document.onkeydown = function (e) {
        console.log(e.key);
        if (e.key == "F1") {
            e.preventDefault();
            setOpenF1Modal(true)
            setOpenF4Modal(false)
            setOpenF7Modal(false)
            setOpenF2Modal(false)
        } else if (e.key == "F2") {
            setOpenF1Modal(false)
            setOpenF4Modal(false)
            setOpenF7Modal(false)
            setOpenF2Modal(true)
        } else if (e.key == "F4") {
            setOpenF1Modal(false)
            setOpenF7Modal(false)
            setOpenF2Modal(false)
            setOpenF4Modal(true)
        } else if (e.key == "F7") {
            setOpenF7Modal(true)
            setOpenF1Modal(false)
            setOpenF2Modal(false)
            setOpenF4Modal(false)
            SkuTable();
            
        } else if (e.key == "Escape") {
            navigate("/")
        }
        else if (e.key == "Tab") {
            navigate("/menu")
        }
        else if (e.key == "Enter") {
            console.log("enter")
            console.log(data);
            if (data == "" || data == undefined) {
                handlescan();

            } else {
                getApi();
            }

        }
    };
    function keyEvents(key) {
        console.log(key + "Line 7");
        if (key == "F1") {
            setOpenF1Modal(true)
            setOpenF2Modal(false)
            setOpenF4Modal(false)
            setOpenF7Modal(false)
        } else if (key == "F2") {
            setOpenF1Modal(false)
            setOpenF4Modal(false)
            setOpenF7Modal(false)
            setOpenF2Modal(true)
        } else if (key == "F4") {
            setOpenF1Modal(false)
            setOpenF7Modal(false)
            setOpenF2Modal(false)
            setOpenF4Modal(true)
        } else if (key == "F7") {
            setOpenF7Modal(true)
            setOpenF1Modal(false)
            setOpenF2Modal(false)
            setOpenF4Modal(false)
            SkuTable();
        } else if (key == "Escape") {
            navigate("/")
        }
    }
    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }
    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    const inputhandleChange = (e) => {
        const { name, value } = e.target
        console.log("called onchange");
        setsku(e.target.value)
    }
    const handlescan = (e) => {
        setsku(e)
    }
    const handleError = (err) => {
        console.error(err)
    }
    const ConfirmData = () => {
        for (let i = 0; i < skuQuantity.length; i++) {
            const element = skuQuantity[i];
            console.log(element);
            const jsondata = {
                headers: {
                    Authorization: "Bearer" + " " + tokenData,
                }, jsonParameters: element, warehouse: localStorage.getItem("warehouse")
            }
            console.log(jsondata);
            axios.post('http://ec2-15-152-41-1.ap-northeast-3.compute.amazonaws.com:8000/storeSku', jsondata)
                .then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        setStore([])
                        navigate("/locationScan")
                    }
                }
                )
                .catch((err) => {
                    setOpenError(true);
                    setMessage("Something went wrong")
                    console.log(err)
                })
        }
    }
    const ClearData = () => {
        if (store.length != 0) {
            setStore([])
            setdata(initialState)
            setsku("")
            setOpenF4Modal(false)
            setpath("duplicate")

        }
        else {
            setOpenError(true)
            setMessage("Data is already Empty")
            setOpenF4Modal(false)
        }

    }
    const SkuTable = () => {
        if (store.length == 0) {
            setOpenError(true)
            setMessage("Data is Empty")
        }
        else {
            navigate('/sku')

        }
    }
    return (
        <div>

            <Header title="Scan Sku" path={path}   setOpenError={setOpenError}
            setMessage={setMessage}/>
            <div className='container1 inner-page-container deviceContainer' >
                <div className={openf4Modal || openf2Modal || openf1Modal ? "mainContainer" : ""} style={{
                    display: "flex", justifyContent: "center", flexDirection: "column",
                    alignItems: "center", width: "100%", height: "50%"
                }}>
                    <div className="card card-with-border" >
                        <div className="input-container">
                            <div className="inputWrapper">
                            <label class="form-label mb-0.2">Location: {localStorage.getItem('location')}</label>
                            <br></br>
                                <label class="form-label mb-0.2"> Scan SKU/EAN</label>
                                <input type="text" name="currScan" value={sku} onChange={inputhandleChange}></input>
                                <br></br>
                                <br></br>
                            
                                <div >
                                    {store.length == 0 ? ("") : (<h6><span><b>Last Scan:</b> </span>{store.length === 0 ? "" : store[store.length - 1].currScan}</h6>)}
                                    {store.length == 0 ? ("") : (<h6><span><b> Sku:</b> </span>{store.length === 0 ? "" : store[store.length - 1].sku}</h6>)}
                                    {store.length == 0 ? ("") : (<h6><span><b>Pack Key:</b> </span>{store.length === 0 ? "" : store[store.length - 1].packkey}</h6>)}
                                    {store.length == 0 ? ("") : (<h6><span><b>Barecode UOM:</b> </span>{store.length === 0 ? "" : store[store.length - 1].uom}</h6>)}
                                    <h6><b>Counter: {store.length}</b></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BarcodeReader
                    onError={handleError}
                    onScan={(e) => handlescan(e)
                    }
                />
                <div className="footer">
                    <button onClick={(e) => keyEvents("F1")} className="F-button"><span>F1</span></button>
                    <button onClick={(e) => keyEvents("F2")} className="F-button"><span>F2</span></button>
                    <button onClick={(e) => keyEvents("F4")} className="F-button"><span>F4</span></button>
                    <button onClick={(e) => keyEvents("F7")} className="F-button"><span>F7</span></button>
                </div>

                {openf1Modal == true ? (
                    <div className="modalContainer ">
                        <div className="modalHeader">
                            <h2 style={{ fontSize: "15px", fontWeight: "bold", color: "white" }}>Help</h2>
                            <img src={require('../../assets/images/close.png')} height="15px" width="15px" className="cancelSign" onClick={() => setOpenF1Modal(false)} />
                        </div>
                        <div className="modalContent">
                            <div className="ModalText">
                                <h6 className="dialogTitle">F1 = <span className="dialogTitle">About</span></h6>
                                <h6 className="dialogTitle">F2 = <span className="dialogTitle">Confirm Sku</span></h6>
                                <h6 className="dialogTitle">F4 = <span className="dialogTitle">Delete Sku</span></h6>
                                <h6 className="dialogTitle">F7 = <span className="dialogTitle">Display Sku</span></h6>
                            </div>
                        </div>
                    </div>
                ) : ("")}
                {openf2Modal ? (
                    <div className="modalContainer">
                        <div className="modalHeader">
                            <h2 style={{ fontSize: "15px", fontWeight: "bold", color: "white" }}>Confirm Data</h2>
                            <img src={require('../../assets/images/close.png')} height="15px" width="15px" className="cancelSign" onClick={() => setOpenF2Modal(false)} />
                        </div>
                        <div className="modalContent">
                            <div>
                                <button className="ModalButton w-25" onClick={ConfirmData}>Confirm</button>
                                <button className="ModalButton w-25" onClick={() => setOpenF2Modal(false)}>Cancel</button>

                            </div>

                        </div>
                    </div>
                ) : ("")}
                {openf4Modal ? (
                    <div className="modalContainer">
                        <div className="modalHeader">
                            <h2 style={{ fontSize: "15px", fontWeight: "bold", color: "white" }}>Clear All Data</h2>
                            <img src={require('../../assets/images/close.png')} className="cancelSign" height="15px" width="15px" onClick={() => setOpenF4Modal(false)} />
                        </div>
                        <div className="modalContent">
                            <div>
                                <button className="ModalButton w-25" onClick={ClearData}>Yes</button>
                                <button className="ModalButton w-25" onClick={() => setOpenF4Modal(false)}>No</button>

                            </div>

                        </div>
                    </div>
                ) : ("")}


                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={openWarning}
                    autoHideDuration={3000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="warning">
                        <p style={{ fontSize: "15px", color: "whitesmoke" }}>{message}</p>
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={openError}
                    autoHideDuration={3000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="error">
                        <p style={{ fontSize: "15px", color: "whitesmoke" }}>{message}</p>
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={openSuccess}
                    autoHideDuration={3000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="success" >
                        <p style={{ fontSize: "15px", color: "whitesmoke" }}>{message}</p>
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
};

export default SkuScanner;



