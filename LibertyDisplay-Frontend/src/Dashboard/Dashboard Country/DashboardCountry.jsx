import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { CountryUpload } from "../FileUpload/CountryUpload";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

// const data = [
//     {
//         name: 'Brazil',
//         imageUrl: ['https://www.countryflags.com/wp-content/uploads/brazil-flag-png-large.png']
//     },
//     {
//         name: 'Japan',
//         imageUrl: ['https://www.countryflags.com/wp-content/uploads/japan-flag-png-large.png']
//     }
// ]

export const DashboardCountry = () => {
  const { country, setCountry } = useOutletContext();
  const [loading, setLoading] = useState(false);
  console.log("Country", country);

  const handleDelete = (item) => {
    if (item) {
      const formData = {
        id: item._id,
      };

      Swal.fire({
        title: `Do you want Delete ${item.name}?`,
        showDenyButton: true,
        confirmButtonText: "YES",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setLoading(item._id);

          axios
            .delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteCountry`, {
              data: { id: item._id },
            })
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: `${item?.name} got deleted`,
                text: "Deletion successful!",
              });
              console.log("response", res);

              setCountry(res.data.data);
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Oops Couldnt Select...",
                text: error.response.data.message || error.message,
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
    <div className="p-5  space-y-10">
      <div>
        <label
          htmlFor="uploadCountry"
          className="text-white bg-[#2a337b] cursor-pointer px-3 py-2 font-semibold rounded-md"
        >
          {" "}
          Upload Logo{" "}
        </label>
      </div>

      <div className="flex flex-wrap gap-5 ">
        {country &&
          country.map((item, index) => {
            return (
              <div
                key={index}
                className={` ${
                  loading == item._id ? `opacity-40` : ``
                }  relative group  shadow-2xl cursor-pointer`}
              >
                <img
                  src={item?.imageUrl[0]}
                  className="w-20 h-20 hover:scale-105 rounded-xl  duration-300 transition-all "
                  alt=""
                />

                {loading == false && (
                  <FontAwesomeIcon
                    onClick={() => handleDelete(item)}
                    icon={faTrash}
                    size="md"
                    className={` absolute -top-2 -right-2 opacitit-100  md:opacity-0 text-red-500 md:group-hover:opacity-100 duration-300 transition-all  `}
                  ></FontAwesomeIcon>
                )}
              </div>
            );
          })}
      </div>

      <CountryUpload></CountryUpload>
    </div>
  );
};
