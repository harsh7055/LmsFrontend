import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.styles.css";
import Header from "../../components/Header";
import axios from "axios";
import BarcodeReader from 'react-barcode-reader'
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar"
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const LocationScan = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState("")
  const [select, setselect] = useState()
  const [input, setInput] = useState(" ")
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
  document.onkeydown = function (e) {
    console.log(e.key);
    if (e.key == "Enter") {
      if (result == undefined || result == "") {
        handleScan();
      } else {
        getApi();
      }
    }
  };
  const handleScan = (data) => {
    setResult(data)
  }
  const handleError = (err) => {
    console.error(err)
  }
  const InputHandleChange = (e) => {
    const { name, value } = e.target
    setResult(value)
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWarning(false);
    setOpenError(false);
    setOpenSuccess(false);
  };
  const Submitdata = (e) => {
    e.preventDefault();
    if (result != "") {
      navigate("/skuscanner")
    }
  }
  const handleSelect = (e) => {
    e.preventDefault();
    const { name, value } = e.target
    setselect(e.target.value)
    console.log(e.target.value)
  }
  const handleSubmit = (e) => {

    console.log("done")
    localStorage.setItem("SLOC", select)
    localStorage.setItem("LPN", input)
    if (select == undefined) {
      setOpenError(true)
      setMessage("Select SLOC")
    }
    else {
      getApi();
    }

  }
  const handleInput = (e) => {
    console.log(e.target.value + "line 64");
    e.preventDefault();
    setInput(e.target.value);
  }
  const tokenData = localStorage.getItem("Token")
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
          if (res.status == '200') {
            localStorage.setItem("location", result)
            if (select == undefined) {
              setOpenError(true);
              setMessage("Select SLOC")
            }
            else {
              navigate("/skuscanner")

            }
          }

        })
        .catch(err => {
          console.log(err)

          setOpenError(true)
          setMessage("invalid Location")
        })

    }
  }
  return (
    <div>
      <Header title="Location Scan" />
      <BarcodeReader
        onError={handleError}
        onScan={handleScan}
      />
      <div className='container1 inner-page-container' >
        <div className='card card-with-border ' >
          <div className="input-container">
            <div className="inputWrapper">
              <label class="form-label mb-0.2"> Location</label>
              <input class="form-control mt-0" type="text" name="datavalue" value={result} required onChange={InputHandleChange} />
              <br></br>
              <label class="form-label mb-0.2"> SLoc</label>
              <select onChange={handleSelect} name="SLOC" className="form-control">
                {/* const[inpu IN01 | IN02 | IN03 | IN05 | IN06 | IN08 | IN09 | IN10 | IN15 | IN18 | IN19 */}
                <option value="0">Select </option>
                <option value="IN01">IN01</option>
                <option value="IN02">IN02</option>
                <option value="IN03">IN03</option>
                <option value="IN05">IN05</option>
                <option value="IN06">IN06</option>
                <option value="IN08">IN08</option>
                <option value="IN09">IN09</option>
                <option value="IN10">IN10</option>
                <option value="IN15">IN15</option>
                <option value="IN18">IN18</option>
                <option value="IN19">IN19</option>
              </select>
              <br></br>
              <label class="form-label mb-0.2"> LPN</label>
              <input class="form-control mt-0" type="text" onChange={handleInput} name="LPN" />
            </div>
            <div className="buttoncontainer">
              <button onClick={handleSubmit} >Submit</button>
            </div>
          </div>

        </div>
      </div>
      {

      }
      <div >
      </div>
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
  );
};

export default LocationScan;
