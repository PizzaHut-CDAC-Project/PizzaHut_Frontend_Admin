import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Home from "../Home";
import "./index.css";
import { URL } from "../../config";

const Addpizza = () => {
  const navigate = useNavigate();

  const initialValues = {
    type: "",
    itemName: "",
    description: "",
  };

  const validationSchema = Yup.object({
    type: Yup.string().required("Type is required"),
    itemName: Yup.string().required("Item name is required"),
    description: Yup.string().required("Description is required"),
  });

  const onSubmit = (values) => {
    const url = `${URL}item/addpizza`;

    axios.post(url, values).then((response) => {
      const result = response.data;
      if (result.status === "success") {
        const pizza = result.data;
        Swal.fire("Success", "Pizza Added successfully", "success");
        navigate("/Addpizzasize", { state: { pizza } });
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
          {({ setFieldValue }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="type" className="form-label">
                  Enter Item
                </label>
                <br />
                <Field
                  as="select"
                  name="type"
                  className="form-select form-select-sm"
                >
                  <option value="">Select Type</option>
                  <option value="Veg">Veg</option>
                  <option value="Nonveg">NonVeg</option>
                  <option value="Beverages">Beverages</option>
                </Field>
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="itemName" className="form-label">
                  Enter item name
                </label>
                <br />
                <Field
                  type="text"
                  name="itemName"
                  className="form-control form-control-sm"
                  placeholder="Enter item name"
                />
                <ErrorMessage
                  name="itemName"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Enter item description
                </label>
                <br />
                <Field
                  type="text"
                  name="description"
                  className="form-control form-control-sm"
                  placeholder="Enter item description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger"
                />
              </div>

              <button type="submit" className="btn btn-sm btn-success">
                Add
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Addpizza;
