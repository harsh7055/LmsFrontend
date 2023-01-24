import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header';
import axios from 'axios';
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar"
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Owner() {

    const navigate = useNavigate();
    const tokenData = localStorage.getItem("Token");
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [openWarning, setOpenWarning] = useState(false);
    const [currentOwner, setCurrentOwner] = useState();
    const handleSelect = (e) => {
        localStorage.setItem("owner", e.target.value)
        setCurrentOwner(e.target.value)
    }
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenWarning(false);
        setOpenError(false);
        setOpenSuccess(false);
    };
    const handleSubmit = (e) => {
        console.log()
        e.preventDefault()
        const jsondata = {
            headers: {
                Authorization: "Bearer" + " " + tokenData,
            },
            owner: currentOwner,
            warehouse: localStorage.getItem("warehouse")
        }

        axios.post("http://ec2-15-152-41-1.ap-northeast-3.compute.amazonaws.com:8000/ownerValidate", jsondata)
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    navigate("/menu")
                }
            })
            .catch(err => {
                console.log(err)
                setOpenError(true)
                setMessage("invalid Owner")
            })
    }
    return (
        <div>
            <Header title="Owner" />
            <div className='container1 inner-page-container' >
                <div className='card card-with-border ' >
                    <div className="input-container">
                        <div className="inputWrapper">
                            <label class='form-conrol mb-1'>Owner</label>
                            <input class='form-control mt-0' onChange={handleSelect} name="owner" type='text' />
                        </div>
                        <div className="buttoncontainer">
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
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
