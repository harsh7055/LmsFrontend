import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.styles.css'


const Header = (props) => {
  const navigate = useNavigate();
  const pathname = window.location.pathname
  console.log(pathname);
  console.log(props);
  const handelAlert=()=>{
    props.setOpenError(true)
    props.setMessage("Can't go back ethier confirm or Clear")
  }
console.log(props.title +"aaya kya");
  return (
    
    <div className="navContainer">
      <div>
        <span className="title">{props.title}</span>
      </div>
      <div>
        {
          (props.path=="/skuscanner")? (<span onClick={() => handelAlert()}><img src={require('../../assets/images/left-arrow.png')} className="leftArrow" /></span>):
         (pathname=="/locationScan")?(<span onClick={() => navigate("/teamControl")}><img src={require('../../assets/images/left-arrow.png')} className="leftArrow" /></span>):(<span onClick={() => navigate(-1)}><img src={require('../../assets/images/left-arrow.png')} className="leftArrow" /></span>)
        }
      
        <span><img src={require('../../assets/images/right-arrow.png')} className="rightArrow" /></span>
      </div>
    </div>
  )
}

export default Header
