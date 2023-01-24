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

export default function TeamControl() {
    const navigate = useNavigate();
    const [select, setselect] = useState()
    const [input, setInput] = useState("")
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
    const handleSelect = (e) => {
        e.preventDefault();
        const { name, value } = e.target
        setselect(e.target.value)
        console.log(e.target.value)
    }
    const handleSubmit = (e) => {
        console.log("done")
        localStorage.setItem("team", select)
        localStorage.setItem("controlKey", input)
        if (input == undefined || input == '') {
            setOpenError(true)
            setMessage("Enter Control key")
        }
        else if (select == undefined) {
            setOpenError(true)
            setMessage("Select Team")
        }
        else {
            const jsondata = {
                headers: {
                    Authorization: "Bearer" + " " + tokenData,
                },
                team: select,
                controlKey: input,

                warehouse: localStorage.getItem("warehouse")
            }
            axios.post("http://ec2-15-152-41-1.ap-northeast-3.compute.amazonaws.com:8000/controlKey", jsondata)
                .then(res => {
                    console.log(res);
                    if (res.status == 200) {

                        console.log(res.data)
                        localStorage.setItem("team", select)
                        localStorage.setItem("controlkey", input)
                        navigate('/locationScan')


                    }
                })
                .catch(err => {
                    console.log(err)
                    setInput("")
                    setOpenError(true)
                    setMessage("invalid ControlKey")
                })
        }
    }
    const handleInput = (e) => {
        console.log(e.target.value + "line 64");
        e.preventDefault();
        setInput(e.target.value);
    }
    return (
        <div >
            <Header title="Team" />
            <div className='container1 inner-page-container' >
                <div className="card card-with-border">
                    <div className="input-container">
                        <div className="inputWrapper">
                            <label class="form-label mb-0.2"> Team</label>
                            <select onChange={handleSelect} name="team" className="form-control">
                                <option value="0">Select </option>
                                <option value="A">Team A </option>
                                <option value="B">Team B </option>
                                <option value="C">Team C </option>

                            </select>
                            <br></br>
                            <div className="inputWrapper">
                                <label class='form-label mb-0.2'>Control Key</label>
                                <input class='form-control mt-0' onChange={handleInput} value={input} name="controlKey" type='text' />
                            </div>
                        </div>
                    </div>
                    <div className="buttoncontainer">
                        <button onClick={handleSubmit} >Submit</button>
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



