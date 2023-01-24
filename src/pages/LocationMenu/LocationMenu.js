import React from 'react'
import Header from '../../components/Header'
// import Footer from '../../components/Footer'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './LocationMenu.styles.css'
export default function LocationMenu() {
    const param=useParams();
    const navigate=useNavigate();
  return (
    <div>
        <Header title={param.id}/>
         <div className='buttonDiv'>
            <button  onClick={()=>navigate('/menu/' + param.id)}>Sku Count</button>
         </div>
    </div>
  )
}
