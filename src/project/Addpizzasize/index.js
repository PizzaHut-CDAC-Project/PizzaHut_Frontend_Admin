import axios from "axios";
import React, { useEffect, useState } from "react";
import "./index.css";
import { URL } from "../../config";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Home from "../Home";

const Addpizzasize = () => {
  const [itemId, setItemId] = useState("");
  const [pizza, setPizza] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.pizza) {
      setPizza(location.state.pizza);
      setItemId(location.state.pizza.itemid);
    }
  }, [location.state]);

  const initialValues = {
    size: "",
    price: "0.0",
  };

  const validationSchema = Yup.object({
    size: Yup.string().required("Size is required"),
    price: Yup.number().required("Price is required").positive("Price must be positive"),
  });

  const onSubmit = (values, { resetForm }) => {
    const body = {
      itemId,
      ...values,
    };

    const url = `${URL}itemSize/addItemSize`;

    axios.post(url, body).then((response) => {
      const result = response.data;
      if (result.status === "success") {
        Swal.fire("Success", "Pizza size and price added successfully", "success");
        resetForm();
        navigate("/Addpizzasize");
      } else {
        Swal.fire("Error", result.error, "error");
      }
    });
  };

  const drinkOptions = pizza.type === "Beverages" && (
    <>
      <option value="200ml">200ml</option>
      <option value="500ml">500ml</option>
      <option value="750ml">750ml</option>
    </>
  );

  return (
    <>
      <Home />
      <div className="outerdiv-emp-form">
        <p>Enter the size details for: {pizza.itemName}</p>
        <hr style={{ color: "black", backgroundColor: "black", height: 3 }} />

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form>
            <div className="mb-3">
              <label htmlFor="size" className="form-label">
                Enter item size
              </label>
              <br />
              <Field as="select" name="size" className="form-select form-select-sm">
                <option value="">Choose Size</option>
                <option value="Small">Small</option>
                <option value="Regular">Regular</option>
                <option value="Large">Large</option>
                {drinkOptions}
              </Field>
              <ErrorMessage name="size" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Enter item price
              </label>
              <br />
              <Field
                type="number"
                name="price"
                className="form-control form-control-sm"
                placeholder="Enter item price"
              />
              <ErrorMessage name="price" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-sm btn-success">
              Add
            </button>
            <button
              type="button"
              onClick={() => navigate("/pizzaimage", { state: pizza })}
              className="btn btn-primary mx-3"
            >
              Add Image
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Addpizzasize;

