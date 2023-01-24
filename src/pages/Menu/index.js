import React from 'react'
import Header from '../../components/Header'
// import Footer from '../../components/Footer'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './index.styles.css'


export default function Menu() {
    const param=useParams();
    const navigate=useNavigate();

  return (
    <div>
        <Header title="Menu"/>

         <div className='buttonDiv'>
            <button  onClick={()=>navigate('/teamControl')}>Stock Count</button>
            <button  style={{ visibility:"hidden" }} onClick={()=>navigate('/locationScan')}>Sku Count</button>
            <button style={{ visibility:"hidden" }} onClick={()=>navigate('/locationScan')}>Sku Count</button>
            <button style={{ visibility:"hidden" }} onClick={()=>navigate('/locationScan')}>Sku Count</button>
            <button style={{ visibility:"hidden" }} onClick={()=>navigate('/locationScan')}>Sku Count</button>

         </div>
    </div>
  )
}
