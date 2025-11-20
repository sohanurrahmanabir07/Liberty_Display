import React, { useState } from "react";
import { capitalizeWords } from "../Functions/functions";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  useLocation,
  useNavigate,
  useOutlet,
  useOutletContext,
} from "react-router";
import Swal from "sweetalert2";

export const ProductDetails = ({ item }) => {
  const admin = useSelector((state) => state.AirWheel.users);
  const { setProducts } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItem, setCartItem] = useState(0);
  const handleDelete = () => {
    if (item._id) {
      const data = {
        id: item._id,
      };
      Swal.fire({
        title: "Do you want to Delete this?",
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: "Confirm Delete?",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios
            .delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteProduct`, {
              data,
            })
            .then((res) => {
              if (res.status == 200) {
                setProducts(res.data.data);
                Swal.fire(res.data.message, "success");
                navigate("/dashboard/products");
              }
            });
        } else if (result.isDenied) {
          Swal.fire("Ok keep this Product", "", "info");
        }
      });
    } else {
      Swal.fire({
        title: "Not Found",
        icon: "error",
      });
    }
  };
  return (
    <div className="p-5">
      {/* <br /> */}

      <div>
        <p className="font-semibold text-3xl text-black">{item?.name}</p>
      </div>

      {/* <div >
                <p className='font-semibold text-4xl text-black'>{item?.name}</p>
            </div> */}

      <br />

      <div className="hidden">
        <p className="font-semibold text-lg">$ 3999</p>

        <p className="font-semibold text-lg">Size : 48L</p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setCartItem(cartItem - 1)}
            className="btn rounded-full bg-blue-500 text-white"
          >
            -
          </button>

          <p className="text-lg font-semibold">{cartItem}</p>

          <button
            onClick={() => setCartItem(cartItem + 1)}
            className="btn  rounded-full bg-blue-500 text-white"
          >
            +
          </button>
        </div>
      </div>

      <p className="bg-gray-100 p-4 rounded-xl   text-lg">
        {item?.description}
      </p>
      <br />

      <div className="flex justify-between bg-gray-100 rounded-xl p-3">
        <p className="font-bold text-xl text-gray-700 ">
          Model : {item?.model.toUpperCase()}
        </p>

        {/* <p className='font-semibold text-2xl text-[#2a337b]'>{capitalizeWords(item?.category)}</p> */}
      </div>
    </div>
  );
};
