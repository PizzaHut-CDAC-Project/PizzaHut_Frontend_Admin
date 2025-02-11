import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Home from "../Home";
import { URL } from "../../config";

const Addtoppings = () => {
  const navigate = useNavigate();

  const initialValues = {
    toppingName: "",
    price: "0",
  };

  const validationSchema = Yup.object({
    toppingName: Yup.string().required("Topping name is required"),
    price: Yup.number().required("Price is required").positive("Price must be positive"),
  });

  const onSubmit = (values, { resetForm }) => {
    const url = `${URL}toppings/addTopping`;

    axios.post(url, values).then((response) => {
      const result = response.data;
      if (result.status === "success") {
        const top = result.data;
        Swal.fire("Success", "Topping added successfully", "success");
        resetForm();
        navigate('/addtoppingimage', { state: { top } });
      } else {
        Swal.fire("Error", result.error, "error");
      }
    });
  };

  return (
    <>
      <Home />
      <div className="outerdiv-emp-form">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="mb-3">
              <label htmlFor="toppingName" className="form-label">
                Enter Topping Name
              </label>
              <br />
              <Field
                type="text"
                name="toppingName"
                className="form-control form-control-sm"
                placeholder="Enter topping name"
              />
              <ErrorMessage name="toppingName" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Enter Topping Price
              </label>
              <br />
              <Field
                type="number"
                name="price"
                className="form-control form-control-sm"
                placeholder="Enter topping price"
              />
              <ErrorMessage name="price" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-sm btn-success">
              Add
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Addtoppings;
