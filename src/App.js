import Signin from "./project/Signin";
import Home from "./project/Home";
import Addpizza from "./project/Addpizza";
import Addpizzasize from "./project/Addpizzasize";
import Addtoppings from "./project/Addtoppings";
import Showallpizza from "./project/showallpizza";
import Showtoppings from "./project/showtoppings";
import Showfeedback from "./project/showfeedback";
import Editpizza from "./project/editpizza";
import Editpizzasize from "./project/editpizzasize";
import Addpizzasizes from "./project/Addpizzasizes";
import Viewprofile from "./project/viewprofile";
import AddPizzaimage from "./project/Addpizzaimage";
import Edittoppings from "./project/edittoppings";
import Orderstatus from "./project/orderstatus";
import Changestatus from "./project/changestatus";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import React, { Component, useEffect } from "react";
import Header from "./project/Header";
import UploadToppingImg from "./project/Addtoppingimage";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const AuthorizeUser = () => {
  const role = sessionStorage["role"];
  return role == "Admin" ? <Home /> : <Signin />;
  
};

function App() {
  useEffect(() => {
    document.title = "pizzaHut"; 
  }, []);
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthorizeUser />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/home" element={<Home />} />
            <Route path="/addpizza" element={<Addpizza />} />
            <Route path="/addpizzasize" element={<Addpizzasize />} />
            <Route path="/showallpizza" element={<Showallpizza />} />
            <Route path="/addtoppings" element={<Addtoppings />} />
            <Route
              path="/addtoppingimage"
              element={<UploadToppingImg />}
            ></Route>
            <Route path="/showtoppings" element={<Showtoppings />} />
            <Route path="/showfeedback" element={<Showfeedback />} />
            <Route path="/editpizza" element={<Editpizza />} />
            <Route path="/editpizzasize" element={<Editpizzasize />} />
            <Route path="/addpizzasizes" element={<Addpizzasizes />} />
            <Route path="/viewprofile" element={<Viewprofile />} />
            <Route path="/pizzaimage" element={<AddPizzaimage />} />
            <Route path="/edittoppings" element={<Edittoppings />} />
            <Route path="/orderstatus" element={<Orderstatus />} />
            <Route path="/changestatus" element={<Changestatus />} />
            <Route path="/showfeedback" element={<Showfeedback />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer theme="colored" />
      </div>
    </>
  );
}

export default App;
