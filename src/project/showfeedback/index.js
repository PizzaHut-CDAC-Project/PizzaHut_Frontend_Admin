import axios from "axios";
import { useEffect, useState } from "react";
import Home from "../Home";

import { URL } from "../../config";

const Showfeedback = () => {
  const url = `${URL}feedback/feedbackList`;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios.get(url).then((response) => {
      const result = response.data;
      console.log(response);
      setProducts(response["data"]);
      if (result["status"] == "success") {
        setProducts(result["data"]);
        console.log(result["data"]);
      
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
        {products.map((product) => {
          return (
            <p>
              <p>
                <strong>No :</strong> {product["feedbackId"]}
              </p>
              <p>
                <b>Name :</b> {product["firstName"]} {product["lastName"]}
              </p>

              <p>
                <strong>Phone No :</strong> {product["phoneNo"]}
              </p>

              <p>
                <strong>Email Id :</strong> {product["email"]}
              </p>
              <p>
                <strong>feedback :</strong> {product["feedback"]}
              </p>

              <ColoredLine color="black" />
            </p>
          );
        })}
      </div>
    </>
  );
};

export default Showfeedback;
