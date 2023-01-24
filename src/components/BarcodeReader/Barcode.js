import React from 'react'
import BarcodeReader from 'react-barcode-reader'


import { useState } from "react";

const Barcode = () => {
    const [result, setResult] = useState('No Result')

   const handleScan=(data)=>{
        setResult(data)
      }
     const handleError=(err)=>{
        console.error(err)
      }


  
    return (
        <div>
            <BarcodeReader
              onError={handleError}
              onScan={handleScan}
              />
              
            <p>{result}</p>
          </div>
    );
};

export default Barcode;