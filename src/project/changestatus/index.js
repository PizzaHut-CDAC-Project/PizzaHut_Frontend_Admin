import axios from "axios";
import { useEffect, useState } from "react";
import Home from "../Home";
import { URL } from "../../config";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Changestatus = () => {
  const location = useLocation();
  const [deliveryId, setDeliveryId] = useState("");
  const deliveryid = location.state.deliveryid;
  const [deliverystatus, setDeliverystatus] = useState("");
  const [product, setProducts] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("in useEffect");
    console.log(deliveryid);
    const url = `${URL}cart/deliveryid/${deliveryid}`;
    axios.get(url).then((response) => {
      const result = response.data;
      console.log(result);
      if (result["status"] === "success") {
        console.log(result.data);
        setProducts(result.data);
        console.log("products" + product);
      } else {
        console.log("error");
      }
    });
  }, [deliveryid]);

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 3,
      }}
    />
  );

  function savePizza() {
    if (deliverystatus === "") {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please select a delivery status!',
      });
    } else {
      const body = {
        deliverystatus,
      };
      console.log(deliverystatus);
      const url = `${URL}DeliveryStatus/dStatus/${deliveryid}`;
      axios.put(url, body).then((response) => {
        const result = response.data;
        console.log(result);
        if (result["status"] === "success") {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Delivery status updated successfully!',
          }).then(() => {
            navigate("/orderstatus");
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Delivery status updated successfully!',
          });
        }
      });
    }
  }

  return (
    <>
      <Home />
      <div className="outerdiv-emp-form">
        <h1> Orders Details </h1>
        <hr />
        {product ? (
          <div>
            <div className="row">
              <div className="col">
                <p>
                  <b>Pizza Type :</b> {product.itemsize.item.type}
                </p>
                <p>
                  <b>Pizza Name :</b> {product.itemsize.item.itemName}
                </p>
                <p>
                  <b>Pizza Size :</b> {product.itemsize.size}
                </p>
                <p>
                  <b>Current Delivery Status :</b> {product.deliveryId.deliveryStatus}
                </p>
              </div>
              <div className="col"></div>
              <div className="update">
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">
                    Select Status
                  </label>
                  <br />
                  <select
                    className="form-select form-select-sm"
                    onChange={(e) => setDeliverystatus(e.target.value)}
                    aria-label="Default select example"
                  >
                    <option value="">Choose Status</option>
                    <option>Order preparing</option>
                    <option>Out for delivery</option>
                    <option>Delivered</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={savePizza}
                  className="btn btn-sm btn-success"
                >
                  Update Status
                </button>
              </div>
            </div>
            <ColoredLine color="black" />
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
};

export default Changestatus;
