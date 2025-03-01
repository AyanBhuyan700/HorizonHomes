import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from 'react-router-dom'
import About from "./containers/About";
import Support from "./containers/Support";
import Contact from "./containers/Contact";
import Register from "./containers/Register";
import Login from "./containers/Login";
import Dashboard from "./containers/Admin/Dashboard";
import Detail from "./containers/Admin/Detail";
import PropertyAdd from "./containers/Admin/PropertyAdd";
import PropertyEdit from "./containers/Admin/PropertyEdit";
import Home from "./containers/User/Home";
import PropertyView from "./containers/User/PropertyView";
import PropertyDetail from "./containers/User/PropertyDetail";
import Faq from "./containers/Faq";
import PaymentGateway from "./containers/PaymentGateway";
import Success from "./containers/Success";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/support" element={<Support />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/addProperty" element={<PropertyAdd />}></Route>
        <Route path="/editProperty" element={<PropertyEdit />}></Route>
        <Route path="/detail" element={<Detail />}></Route>
        <Route path="/view" element={<PropertyView />}></Route>
        <Route path="/faq" element={<Faq />}></Route>
        <Route path="/propertyDetail" element={<PropertyDetail />}></Route>
        <Route path="/payment" element={<PaymentGateway />}></Route>
        <Route path="/success" element={<Success />}></Route>
      </Routes>
    </>
  )
}

export default App;
