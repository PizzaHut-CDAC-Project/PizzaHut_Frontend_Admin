import axios from "axios";
import { useEffect, useState } from "react";
import Home from "../Home";
import { URL } from "../../config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Showtoppings = () => {
  const [toppings, setToppings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchToppings = async () => {
      try {
        const response = await axios.get(`${URL}toppings/showAll`);
        const result = response.data;
        if (result.status === "success") {
          setToppings(result.data);
        }
      } catch (error) {
        console.error("There was an error fetching the toppings!", error);
      }
    };

    fetchToppings();
  }, []);

  const deleteTopping = (toppingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${URL}toppings/delete/${toppingId}`).then((response) => {
          Swal.fire("Deleted!", "Your topping has been deleted.", "success");
          setToppings((prevToppings) => prevToppings.filter(topping => topping.toppingId !== toppingId));
        });
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
        {toppings.length > 0 ? (
          toppings.map((topping) => (
            <div key={topping.toppingId}>
              <p>
                <strong>Topping Name:</strong> {topping.toppingName}
              </p>
              <p>
                <strong>Topping Price:</strong> {topping.price}
              </p>
             
              <div className="update">
                {/* <button
                  type="button"
                  onClick={() =>
                    navigate("/edittoppings", {
                      state: { toppingId: topping.toppingId },
                    })
                  }
                  className="btn btn-sm btn-success"
                >
                  Update
                </button> */}
                {/* <button
                  onClick={() => deleteTopping(topping.toppingId)}
                  className="btn btn-danger mx-3"
                >
                  Delete
                </button> */}
              </div>
              <ColoredLine color="black" />
            </div>
          ))
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </>
  );
};

export default Showtoppings;
