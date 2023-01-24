import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Modal from '../Modal';
import BarcodeReader from 'react-barcode-reader'
import axios from 'axios';
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar"

import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const Footer = ({ result, setResult }) => {
    const navigate = useNavigate();
    const [openf1Modal, setOpenF1Modal] = useState(false);
    const [openf2Modal, setOpenF2Modal] = useState(false);
    const [openf4Modal, setOpenF4Modal] = useState(false);
    const [openf7Modal, setOpenF7Modal] = useState(false);
    const [barcode, setBarcode] = useState(false);
    const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [openWarning, setOpenWarning] = useState(false);

    const tokenData = localStorage.getItem("Token")
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
                    Authorization: "Bearer" + " " + tokenData
                },
                location: result
            }

            axios.post("http://ec2-15-152-41-1.ap-northeast-3.compute.amazonaws.com:8000/location", jsondata)
                .then(res => {
                    console.log(res);
                    if(res.status=='200'){
                        
                        navigate("/skuscanner/" + result)
                    }

                })
                .catch(err => {console.log(err)
                    
                    setOpenError(true)
                setMessage("invalid Location")
                })
                      
        }



    }

    // document.onkeydown = function (e) {

    //     console.log(e.key);
    //     if (e.key == "F1") {
    //         setOpenF1Modal(true)
    //     } else if (e.key == "F2") {
    //         setOpenF2Modal(true)
    //     } else if (e.key == "F4") {
    //         setOpenF4Modal(true)
    //     } else if (e.key == "F7") {
    //         setOpenF7Modal(true)
    //     } else if (e.key == "Escape") {
    //         navigate("/")
    //     }
    //     else if (e.key == "Tab") {
    //         navigate("/menu")
    //     }
    //     else if (e.key == "Enter") {
    //         //     setBarcode(true);
    //         //   console.log(result);
    //         if (result == undefined || result == "") {
    //             // alert("hi scan is working")
    //             handleScan();
    //         } else {

    //             getApi();
    //         }

    //     }

    // };

    function keyEvents(key) {
        setOpenF1Modal(false)
        setOpenF2Modal(false)
        setOpenF4Modal(false)
        setOpenF7Modal(false)


        if (key == "F1") {
            setOpenF1Modal(true)
        } else if (key == "F2") {
            setOpenF2Modal(true)
        } else if (key == "F4") {
            setOpenF4Modal(true)
        } else if (key == "F7") {
            setOpenF7Modal(true)
        } else if (key == "Escape") {
            navigate("/")
        }
        else if (key == "Tab") {
            navigate("/menu")
        }

    }
    // const handleScan = (data) => {
    //     // console.log("hi"+data)
    //     // alert(d)
    //     setResult(data)




    // }
    // const handleError = (err) => {
    //     console.error(err)
    // }
    const arr = ["F1", "F2", "F4", "F7"];
    return (
        <>

            {/* {
            (barcode==true)?(<><BarcodeReader
                onError={handleError}
                onScan={handleScan}
            />
            <h1>working</h1>
            </>):(<h1>not working</h1>)
         } */}
            {/* <BarcodeReader
                onError={handleError}
                onScan={handleScan}
            /> */}
            <div>
            
            </div>
            
            {/* <div className="footer">
                {
                    arr.map((ele) =>
                        <button onClick={(e) => keyEvents(`${ele}`)} className="F-button"><span>{ele}</span></button>
                    )
                }


            </div> */}
            {openf1Modal ? (
                <Modal heading="F1 Modal" closeModal={setOpenF1Modal} />
            ) : ("")}
            {openf2Modal ? (

                <Modal heading="F2 Modal" closeModal={setOpenF2Modal} />
            ) : ("")}
            {openf4Modal ? (
                <Modal heading="F4 Modal" closeModal={setOpenF4Modal} />

            ) : ("")}
            {openf7Modal ? (
                <Modal heading="F7 Modal" closeModal={setOpenF7Modal} />

            ) : ("")}

        </>
    )

}

export default Footer







// https://musical-clafoutis-821a9a.netlify.app/