import axios from "axios";
import { useEffect, useState } from "react";
import Home from "../Home";
import { URL } from "../../config";
import "./index.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const Viewprofile = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location);

  const userId = sessionStorage["userId"];
  const firstName = sessionStorage["firstName"];
  const lastName = sessionStorage["lastName"];
  const email = sessionStorage["email"];
  const phoneNo = sessionStorage["phoneNo"];

  useEffect(
    () => {
      getProducts();
    },
    [],
    [location]
  );

  const getProducts = () => {
    const url = `${URL}admin/profile`;
    axios.get(url).then((response) => {
      const result = response.data;
      console.log(result);
      if (result["status"] == "success") {
        setProducts(result["data"]);
      }
    });
  };

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 3,
      }}
    />
  );
  function deletesize(itemId) {
    const url = `${URL}/item/deleteAll/${itemId}`;
    axios.delete(url).then((response) => {
      window.location.reload(false);
    });
  }

  return (
    <>
      <Home />
      <div className="outerdiv-emp-form">
        <div>
          <h3>Here Is The Current login user Details </h3>
          <h5>
            <b>Hello,</b> {firstName} {lastName}
          </h5>
          <h5>
            <b>email:</b>
            {email}
          </h5>
          <h5>
            <b>phoneNo:</b>
            {phoneNo}
          </h5>
        </div>
        <ColoredLine color="black" />

        <div className="customer">
          <h3>Customer Details</h3>
        </div>

        <table class="table table-success table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">firstname </th>
              <th scope="col">lastname </th>
              <th scope="col">email </th>
              <th scope="col">phoneno </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr>
                  <td>{product["firstName"]}</td>
                  <td>{product["lastName"]}</td>
                  <td>{product["email"]}</td>
                  <td>{product["phoneNo"]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Viewprofile;
