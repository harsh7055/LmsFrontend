import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LocationScan from "../pages/LocationScan";
import Login from "../pages/Login";
import SkuScanner from "../pages/SkuScanner";
import Scanner from "../components/Scanner";
import SkuDetail from "../pages/SkuDetails";
import WareHouse from "../pages/Warehouse";
import Barcode from "../components/BarcodeReader/Barcode";
import Menu from "../pages/Menu";
import Owner from "../pages/Owner"; 
import TeamControl from "../pages/TeamControl";
export default function Router() {
  const [store, setStore] = useState([])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/locationScan" element={<LocationScan />} />
        <Route path="/skuscanner" element={<SkuScanner store={store} setStore={setStore} />} />
        <Route path="/" element={<Scanner />} />
        <Route path="/warehouse" element={<WareHouse />} />
        <Route path="/sku" element={<SkuDetail store={store} />} />
        <Route path="/barcodeReader" element={<Barcode />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/teamControl" element={< TeamControl/>} />


      </Routes>
    </BrowserRouter>
  );
}
