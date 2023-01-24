import React, { useEffect, useState } from "react";
import './index.styles.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert";
import users from "../../helper/user.json"
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
  const inputUserName = (e) => {
    const { name, value } = e.target;
    setUsername(value)
  }
  const inputPasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword(value)
  }

  const SignInDirect = () => {
    navigate("/warehouse")
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWarning(false);
    setOpenError(false);
    setOpenSuccess(false);
  };
  console.log(users);

  const SignIn = (e) => {
    e.preventDefault();
    let jsonData={};

  if (users.username===username && users.password===password){
    jsonData = {
      "grant_type": "password",
      username: users.enc_uname,
      password: users.enc_pass
    }
       
  }
  else{
    setOpenError(true);
    setMessage("Invalid Credential")
  }

   

    // https://mingle-sso.se1.inforcloudsuite.com:443

    const url = "http://ec2-15-152-41-1.ap-northeast-3.compute.amazonaws.com:8000/auth";
    axios.post(url, jsonData)
      .then((res) => {
        console.log(res.data)
        localStorage.setItem("Token", res.data.access_token);
        navigate("warehouse")
        if (res.status == "200") {
          console.log(res);
          localStorage.setItem("Token", res.data.access_token)
          localStorage.setItem("UserName", username)

          navigate("/warehouse")
        } else {
          localStorage.clear();
        }
      })
      .catch(err => {
        setOpenError(true);
        setMessage("Invalid Credential")
        console.log(err)
      })
  }
  return (
    <div className="container1">
      <div class="card">
        <div>
          <img
            src={require("../../assets/images/trangilelogo.jpeg")}
            alt="trangileimages"
          />
          <form>
            <div className="input-container">
              <div className="inputWrapper">
                <label class="form-label mb-0.2">Username</label>
                <input type="text" class="form-control mt-0" name="uname" required onChange={inputUserName} />
              </div>
              <div className="inputWrapper">
                <label class="form-label mb-0.2  passwordLabel">Password</label>
                <input type="password" name="pass" class="form-control " required onChange={inputPasswordChange} />
              </div>
            </div>
            <div className="buttoncontainer">
              <p>Forget Password?</p>
              <button onClick={SignIn}>Sign In</button>
            </div>
          </form>
        </div>
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
export default Login;