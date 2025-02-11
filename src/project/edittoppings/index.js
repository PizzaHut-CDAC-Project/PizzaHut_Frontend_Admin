import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../../config";
import { useLocation } from "react-router";
import Home from "../Home";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const Edittoppings = () => {
  const { state } = useLocation();
  const { toppingId } = state;

  const [initialValues, setInitialValues] = useState({
    toppingName: "",
    price: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getTopping = async () => {
      try {
        const response = await axios.get(`${URL}toppings/${toppingId}`);
        const result = response.data;
        if (result.status === "success") {
          const topping = result.data;
          setInitialValues({
            toppingName: topping.toppingName,
            price: topping.price,
          });
        }
      } catch (error) {
        console.error("There was an error fetching the topping!", error);
      }
    };

    getTopping();
  }, [toppingId]);

  const validationSchema = Yup.object({
    toppingName: Yup.string().required("Please enter the topping name"),
    price: Yup.number().required("Please enter the topping price").positive("Price must be positive"),
  });

  const save = async (values) => {
    try {
      const url = `${URL}toppings/updateTopping/${toppingId}`;
      const response = await axios.put(url, values);
      const result = response.data;
      if (result.status === "success") {
        toast.success("Successfully updated");
        navigate("/showtoppings");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("There was an error updating the topping!", error);
    }
  };

  return (
    <>
      <Home />
      <div className="edit">
        <h2 className="title">
          <b>Update Topping</b>
        </h2>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={save}
        >
          <Form className="form">
            <div className="mb-3">
              <label htmlFor="toppingName" className="label-control">
                Topping Name:
              </label>
              <Field
                name="toppingName"
                type="text"
                className="form-control"
                placeholder="Enter topping name"
              />
              <ErrorMessage name="toppingName" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="label-control">
                Price:
              </label>
              <Field
                name="price"
                type="text"
                className="form-control"
                placeholder="Enter topping price"
              />
              <ErrorMessage name="price" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <button type="submit" className="btn btn-success">
                Update Topping
              </button>
              <Link to="/showtoppings" className="btn btn-danger float-end">
                Cancel
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Edittoppings;
