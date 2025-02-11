import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { URL } from "../../config";
import Home from "../Home";
import "./index.css";

const Orderstatus = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(
    () => {
      getProducts();
    },
    [],
    [location]
  );

  const url = `${URL}DeliveryStatus/alldelivery`;
  const getProducts = () => {
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

  return (
    <>
      <Home />

      <div className="outerdiv-emp-form">
        <h1>All Orders </h1>
        <hr></hr>
        {products.map((product, index) => {
          console.log(product.deliveryId);
          return (
            <div key={index}>
              <div className="row">
                <div className="col">
                  <p>
                    <b>Name :</b> {product.user.firstName}
                    {product.user.lastName}
                  </p>
                  <p>
                    <b>Email :</b> {product.user.email}
                  </p>
                </div>
                <div className="col">
                  <p>
                    <b>Plot No :</b> {product.address.plotNo}{" "}
                    {product.address.streetName}
                  </p>
                  <p>
                    <strong>City :</strong> {product.address.city}-
                    {product.address.pincode}
                  </p>
                </div>
                <div className="col">
                  <p>
                    <b>Total amount :</b> {product.payment.totalAmount}
                  </p>
                  <p>
                    <strong>Payment status :</strong>{" "}
                    {product.payment.payStatus}
                  </p>
                </div>
                <div className="update">
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/changestatus", {
                        state: { deliveryid: product.deliveryId },
                      })
                    }
                    className="btn btn-sm btn-success"
                  >
                    Change Status
                  </button>
                </div>
              </div>

              <ColoredLine color="black" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Orderstatus;
