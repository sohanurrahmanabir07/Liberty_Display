import { useLocation, useNavigate, useOutletContext } from "react-router";

import axios from "axios";
import Swal from "sweetalert2";
import { capitalizeWords } from "../Functions/functions";
import { ProductUpdate } from "../Dashboard/Update/ProductUpdate";
import { useState } from "react";

export const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { products, categories, setProducts } = useOutletContext();
  const location = useLocation();
  const handleDelete = () => {
    if (item) {
      const formData = {
        id: item._id,
      };

      Swal.fire({
        title: `Do you want Delete ${item?.model}?`,
        showDenyButton: true,
        confirmButtonText: "Yes",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setLoading(item._id);

          axios
            .delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteProduct`, {
              data: { id: item._id },
            })
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: `${item?.model} got deleted`,
                text: "Deletion successful!",
              });

              setProducts(res.data.data);
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Oops Image Couldnt Select...",
                text:
                  err.response.data.message ||
                  err.response.data.message ||
                  err.message,
              });
            })
            .finally(() => setLoading(false));
        }
      });
    } else {
      Swal.fire("Changes are not saved", "", "info");
    }
  };

  return (
    <div className="md:min-w-[250px]">
      <div className="relative group">
        <div
          onClick={() =>
            loading != item?._id && navigate(`/products/${item?.model}`)
          }
          className="md:w-[300px]  cursor-pointer rounded-2xl shadow-sm border-[6px] border-[#f8f8f8] flex flex-col items-center  p-4 relative transition-all duration-300 hover:shadow-md"
        >
          {/* Product Image */}
          <div className=" flex justify-center items-center overflow-hidden ">
            <img
              src={item?.imageUrl[0]}
              alt={item?.name}
              className={` ${
                loading == item?._id ? `opacity-20` : ``
              }  md:w-[250px] md:h-[200px] object-contain hover:scale-105 transition-all duration-300 `}
              draggable="false"
            />
          </div>

          {/* Product Name */}
          <div className="text-gray-700 font-semibold text-base text-center mb-1">
            {capitalizeWords(item?.model)}
          </div>
        </div>

        {location.pathname.startsWith("/dashboard") && loading == false && (
          <div className="absolute  md:group-hover:opacity-100 md:opacity-0 opacity-100 space-x-2 transition-all duration-150 ease-in-out right-2 top-2">
            {!item ? (
              <button
                className="btn btn-primary btn-dash px-2 rounded-sm"
                disabled={true}
              >
                Update
              </button>
            ) : (
              <label
                htmlFor={`ProductUpdate-${item?._id}`}
                className="btn btn-primary btn-dash px-2 rounded-sm"
              >
                Update
              </label>
            )}

            <button
              className="btn btn-error btn-dash px-2 rounded-sm"
              onClick={handleDelete}
            >
              Delete?
            </button>
          </div>
        )}
      </div>

      <ProductUpdate item={item}></ProductUpdate>
    </div>
  );
};
