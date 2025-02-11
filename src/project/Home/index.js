import { useNavigate } from "react-router";
import Header from "../Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../config";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className=" text-white bg-black div-1">
        <div className="navbar bg-black">
          <hr />
          {sessionStorage.getItem("role") != "Admin" ? (
            <div className="nav nav-pills flex-column mb-auto">
            
            </div>
          ) : (
            <div className="nav nav-pills flex-column mb-auto bg-black" style={{display:"flex"}}>
            
              <li className="list-group-item ">
                <Link className="nav-link text-black " to="/Addpizza">
                  Add New Items
                </Link>
              </li>
              <br />
              <li className="list-group-item ">
                <Link className="nav-link text-black " to="/Addtoppings">
                  Add New Topings
                </Link>
              </li>
              <br />
              <li className="list-group-item ">
                <Link className="nav-link text-black " to="/orderstatus">
                  Change Order Status
                </Link>
              </li>
              <br />
              <li className="list-group-item ">
                <Link className="nav-link text-black " to="/showallpizza">
                  Show Pizzas
                </Link>
              </li>
              <br />
              <li className="list-group-item ">
                <Link className="nav-link text-black " to="/Showtoppings">
                  Show Toppings
                </Link>
              </li>
              <br />
              <li className="list-group-item ">
                <Link className="nav-link text-black " to="/viewprofile">
                  View Profile
                </Link>
              </li>
              <br />
              <li className="list-group-item ">
                <Link className="nav-link text-black" to="/showfeedback">
                  Show All Feedback
                </Link>
              </li>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
