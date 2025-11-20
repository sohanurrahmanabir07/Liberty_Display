import { FaFolder, FaUser } from "react-icons/fa6";
import { DescriptionModal } from "../Blog Description Modal/DescriptionModal";
import { formatDateToDayMonth } from "../../Functions/functions";
import { useNavigate, useOutletContext } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
export const BlogCard = ({ post }) => {
  const navigate = useNavigate();
  const { setBlogs } = useOutletContext();
  const handleDelete = () => {
    if (post) {
      const formData = {
        id: post._id,
      };

      Swal.fire({
        title: `Do you want Delete ${post.title}?`,
        showDenyButton: true,
        confirmButtonText: "Save",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios
            .delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteBlog`, {
              data: { id: post._id },
            })
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: `${post.title} got deleted`,
                text: "Deletion successful!",
              });

              setBlogs(res.data.data);
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
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div
      className=" relative group  "
      data-aos="fade-up"
      data-aos-duration="1500"
    >
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col h-full">
        <div className="relative">
          <img
            src={post?.imageUrl[0]}
            alt={post?.title}
            className="w-full h-56 object-cover"
          />
          <span className="absolute bottom-3 right-3 bg-[#2a337b] text-white px-4 py-1 rounded font-semibold text-xs">
            {post?.date}
          </span>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {post?.title}
          </h3>
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
            <FaUser className="mr-1" /> {post?.author}
            <span className="mx-2">/</span>
            <FaFolder className="mr-1" /> {post?.category}
          </div>
          <div className="mt-auto">
            {post?.description.slice(0, 30)}
            ...
            <div
              onClick={() => {
                navigate(`/blog/${post._id}`, { state: { blogID: post._id } });
              }}
              className="text-gray-700 hover:text-[#2a337b] cursor-pointer font-medium flex items-center gap-1"
            >
              Read More <span className="text-xl">→</span>
            </div>
          </div>
        </div>
      </div>
      {location.pathname.startsWith("/dashboard") && (
        <div className="absolute md:group-hover:opacity-100 md:opacity-0 opacity-100 space-x-2 transition-all duration-150 ease-in-out right-2 top-2">
          {!post ? (
            <button
              className="btn btn-primary btn-dash px-2 rounded-sm"
              disabled={true}
            >
              Update
            </button>
          ) : (
            ""
          )}

          <button
            className="btn btn-error btn-dash px-2 rounded-sm"
            onClick={handleDelete}
          >
            Delete?
          </button>
        </div>
      )}
      {/* <DescriptionModal index={post._id} description={post?.description} location={location} ></DescriptionModal> */}
    </div>
  );
};
