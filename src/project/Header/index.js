import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useHistory } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";
import img from "../../image/colorLogo.png"
const Header = () => {
  //const history = useHistory();
  //const navigate = useNavigate()
  const Logout = () => {
    sessionStorage.clear();
    window.location = "/Signin";
  };

  return (
    <div className="bg-black">
      <div
        className="row shadow sticky-top bg-black"
      >
        <img src={img} alt="" style={{maxWidth:"100px",marginLeft:"20px"}} className="bg-black" />
        <div className="col bg-black">
          <div className="text bg-black">
            <center>
            <h1 className="bg-black text-white">DASHBOARD</h1>
            </center>
          </div>
          <div className="bg-black" style={{ position:"absolute",top:"10px",right:"100px"}}>
            <button onClick={Logout} className="btn btn-danger" >Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
