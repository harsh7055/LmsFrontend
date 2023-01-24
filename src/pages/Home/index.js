import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.styles.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { postAuthO } from "../../api/authO";
import axios from "axios";
// import Barcode from "../../components/BarcodeReader/Barcode";
import BarcodeReader from 'react-barcode-reader'

const Home = () => {
    const navigate = useNavigate();
    // const [location, setlocation] = useState()
    // const [tokenData, setTokenData] = useState();
    const [result, setResult] = useState("")



    const InputHandleChange = (e) => {
        const { name, value } = e.target
        // setlocation({ ...location, [name]: value })
        // setlocation(value)
        setResult(value)
    }
    const Submitdata = (e) => {
        e.preventDefault();
        // setlocation(location)
        navigate("/menu/" + result)
    }
    const tokenData=localStorage.getItem("Token")
    const getApi = () => {
        if (tokenData == undefined) {
            console.log("hi")
        } else {
            const jsondata = {
                headers: {
                    Authorization: "Bearer" + " " + tokenData
                }
            }
            console.log(jsondata)
            axios.post("http://ec2-15-152-33-235.ap-northeast-3.compute.amazonaws.com:8000/getData", jsondata)
                .then(res => {
                    console.log(res);
                })
        }


    }
    getApi();


    return (
        <div>
            <Header title="Location Scan" />
            <div id="main" className="main">
                <label className="recieptLabel">Location#</label>
                <input type="text" name="datavalue" value={result} required placeholder="Location" onChange={InputHandleChange} />
                <span onClick={Submitdata}><img src={require('../../assets/images/search.png')} className="search" /></span>

            </div>
            {

            }
            <Footer result={result} setResult={setResult} />
        </div>
    );
};

export default Home;



// https://mellifluous-eclair-397731.netlify.app/