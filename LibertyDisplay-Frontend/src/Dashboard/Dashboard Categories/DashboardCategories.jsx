import React from "react";
import { useNavigate, useOutletContext } from "react-router";
import { capitalizeWords, urlConverter } from "../../Functions/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ImageUpload } from "../FileUpload/ImageUpload";
import { ImageModal } from "../FileUpload/ImageModal";
import { UpdateCategory } from "../Update/CategoryUpdate";
import axios from "axios";
import Swal from "sweetalert2";

export const DashboardCategories = () => {
  const { categories, setCategories } = useOutletContext();
  const navigate = useNavigate();

  const handleClick = (item) => {
    navigate(`/category/${urlConverter(item?.name)}`);
  };
  const handleDelete = (item) => {
    if (item) {
      const formData = {
        id: item._id,
      };

      Swal.fire({
        title: `Do you want Delete ${item.name} Category?`,
        showDenyButton: true,
        confirmButtonText: "Save",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios
            .delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteCategory`, {
              data: { id: item._id },
            })
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: `${item.name} got deleted`,
                text: "Deletion successful!",
              });

              setCategories(res.data.data);
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Oops Image Couldnt Select...",
                text: error.response.data.message || error.message,
              });
            });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } else {
      Swal.fire("Changes are not saved", "", "info");
    }
  };

  return (
    <div className="md:mx-4 my-2 space-y-3 w-full px-5 ">
      <label
        htmlFor="my_modal_3"
        className="btn text-base font-semibold hover:bg-[#2a337b bg-[#2a337b] rounded-md text-white  "
      >
        Add Category <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
      </label>

      <section className="flex md:flex-wrap flex-col md:flex-row max-sm:items-center   gap-4">
        {!categories &&
          [1, 2, 3, 4, 5].map((item, index) => {
            return (
              <div key={index} className="skeleton h-[250px] w-[350px]"></div>
            );
          })}

        {categories &&
          categories.map((item, index) => {
            return (
              <div className="relative group" key={index}>
                <div
                  onClick={() => handleClick(item)}
                  className="card cursor-pointer relative bg-base-100 p-10 border-2 border-[#2a337b] rounded-md overflow-hidden  shadow-sm"
                >
                  <figure>
                    <img
                      loading="lazy"
                      src={
                        item?.imageUrl ||
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
                      }
                      alt="Shoes"
                      className="aspect-[3/2] md:w-[200px]  hover:scale-105 duration-150 transition-all ease-in-out object-cover"
                    />
                  </figure>
                  <div>
                    <p className="absolute bottom-2 left-2 text-center font-semibold text-xl text-gray-500 ">
                      {capitalizeWords(item?.name)}
                    </p>
                  </div>
                </div>
                <div className="absolute md:group-hover:opacity-100 md:opacity-0 opacity-100  space-x-2 transition-all duration-150 ease-in-out right-2 top-2">
                  <label
                    htmlFor={`updateCategory-${item.name}`}
                    className="btn btn-secondary btn-dash px-2 rounded-sm "
                  >
                    {" "}
                    Update{" "}
                  </label>
                  <button
                    className="btn btn-error btn-dash px-2 rounded-sm"
                    onClick={() => handleDelete(item)}
                  >
                    Delete?
                  </button>
                </div>

                <UpdateCategory item={item}></UpdateCategory>
              </div>
            );
          })}
      </section>
      <ImageModal></ImageModal>
    </div>
  );
};
