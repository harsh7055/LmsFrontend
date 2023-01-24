import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./index.styles.css";
import Header from '../../components/Header';
import axios from "axios"
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar"
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function WareHouse() {
    const navigate = useNavigate();
    const [select, setselect] = useState({})
    const [wareHouseData, setWareHouseData] = useState([])
    const tokenData = localStorage.getItem("Token");
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [openWarning, setOpenWarning] = useState(false);

    const jsondata = {
        headers: {
            Authorization: "Bearer" + " " + tokenData
        }
    }
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenWarning(false);
        setOpenError(false);
        setOpenSuccess(false);
    };
    useEffect(() => {
        axios.post("http://ec2-15-152-41-1.ap-northeast-3.compute.amazonaws.com:8000/warehouse", jsondata)
            .then(res => {
                console.log(res)
                setWareHouseData(res.data)
            })
            .catch(err => {
                setOpenError(true)
                setMessage("warehouse data is not fetched")
            })
    }, [])

    const handleSelect = (e) => {
        e.preventDefault();
        const { name, value } = e.target
        setselect({ ...select, [name]: value })
    }
    console.log(select)
    localStorage.setItem("warehouse", select.warehouse)

    const handleSubmit = (e) => {
        console.log()
        e.preventDefault()
        if (select.warehouse) {
            navigate("/owner" )
            // navigate('/barcodeReader')
        }
        else {
            setOpenError(true);
            setMessage("Please Select Warehouse")
        }
    }
    return (
        <div >
            <Header title="Warehouse" />
            <div className='container1 inner-page-container' >

                <div className="card card-with-border">
                    <div className="input-container">
                        <div className="inputWrapper">
                            <label class="form-label mb-0.2"> WareHouse</label>
                            <select onChange={handleSelect} name="warehouse" className="form-control">
                                <option value="0">Select </option>
                                {wareHouseData.map((res) => (
                                    <option value={res.db_name}>{res.db_alias}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="buttoncontainer">
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={openWarning}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="warning">
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={openError}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={openSuccess}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success">
                    <p style={{ fontSize: "15px", color: "whitesmoke" }}>{message}</p>
                </Alert>
            </Snackbar>
        </div>
    )
}
