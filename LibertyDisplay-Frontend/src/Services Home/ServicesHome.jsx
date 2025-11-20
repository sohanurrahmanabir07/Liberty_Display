import {
  faArrowRight,
  faBolt,
  faGears,
  faHandshakeAngle,
  faIndustry,
  faMoneyCheckDollar,
  faPlus,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { AddService } from "./New Service Modal/AddService";
import { useLocation, useOutletContext } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import parse from "html-react-parser";
import { ServiceUpdate } from "../Dashboard/Update/ServiceUpdate";
import axios from "axios";
import Swal from "sweetalert2";

export const ServicesHome = () => {
  const location = useLocation();
  const { services, setServices } = useOutletContext();
  const [code, setCode] = useState(null);

  useEffect(() => {
    AOS.init();
  }, []);

  const svgConverter = (value) => {
    if (!value) return null;
    const cleanSvg = value.trim();
    return parse(cleanSvg, {
      replace: (domNode) => {
        // If this is the SVG tag
        if (domNode.type === "tag" && domNode.name === "svg") {
          // Remove width and height if they exist
          const { width, height, ...restAttribs } = domNode.attribs || {};
          domNode.attribs = {
            ...restAttribs,
            className: "w-12 text-gray-400 group-hover:text-[#2a337b]",
            fill: "currentColor",
          };
        }
        // Add fillRule and clipRule to each path if not present
        if (domNode.type === "tag" && domNode.name === "path") {
          domNode.attribs = {
            ...domNode.attribs,
            fillRule: domNode.attribs.fillRule || "evenodd",
            clipRule: domNode.attribs.clipRule || "evenodd",
          };
        }
      },
    });
  };

  const handleDelete = (item) => {
    if (item) {
      const formData = {
        id: item._id,
      };

      Swal.fire({
        title: `Do you want Delete ${item.name} Service?`,
        showDenyButton: true,
        confirmButtonText: "Save",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios
            .delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteService`, {
              data: { id: item._id },
            })
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: `${item.name} got deleted`,
                text: "Deletion successful!",
              });

              setServices(res.data.data);
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
    <div className="w-full">
      <AddService></AddService>
      <div
        className={`bg-gray-50 p-5 w-full  ${
          location.pathname.startsWith("/dashboard") ? `h-screen` : ``
        } `}
      >
        <div className="max-w-[1340px] mx-auto py-10">
          {code}
          <div className="text-center space-y-4 ">
            <p className="font-bold md:text-5xl text-3xl">
              {" "}
              <span className="text-[#2a337b]">____</span> Services{" "}
              <span className="text-[#2a337b]">____</span>
            </p>
            <p className="font-semibold ">
              Innovative Tools for Modern Construction Success
            </p>
          </div>
          <br />
          {location.pathname.startsWith("/dashboard") && (
            <>
              <label
                htmlFor="AddService"
                className="btn my-5 text-base font-semibold hover:bg-[#2a337b bg-[#2a337b] rounded-md text-white  "
              >
                Add New Services{" "}
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
              </label>

              <br />
            </>
          )}

          {!services.length && (
            <p className="font-bold text-center text-2xl mt-20">
              No Services Available 😞😞
            </p>
          )}

          <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* <div className="border-2 group shadow-lg shadow-gray-400 cursor-pointer  p-10 space-y-5 border-[#2a337b] rounded-lg overflow-hidden items-center ">
                            <div className='text-2xl group-hover:text-[#2a337b]  text-gray-500   transition-all duration-200'>
                                <FontAwesomeIcon icon={faMoneyCheckDollar} size='2xl' ></FontAwesomeIcon>

                            </div>
                            <div className="space-y-3 ">
                                <p className="font-semibold text-xl">Equipment Sales</p>
                                <p className="text-gray-500 text-base">We are Committed to provide solutions that meet he needs of professionals and business,ensuring quality and durability for every application</p>
                            </div>

                            <p className='text-lg hover:text-xl transition-all duration-300  cursor-pointer'>Read More <FontAwesomeIcon icon={faArrowRight} ></FontAwesomeIcon></p>
                        </div> */}
            {services &&
              services.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="border-2 relative shadow-lg shadow-gray-400 group cursor-pointer  p-10 space-y-5 border-[#2a337b] rounded-lg overflow-hidden items-center "
                  >
                    <div className="text-2xl  text-gray-500   transition-all duration-200 ">
                      {svgConverter(item?.svgCode)}
                    </div>
                    <div className="space-y-3 ">
                      <p className="font-semibold text-xl">
                        {item?.serviceName}
                      </p>
                      <p className="text-gray-500 text-base">
                        {item?.description}
                      </p>
                    </div>

                    {location.pathname.startsWith("/dashboard") && (
                      <div className="absolute md:group-hover:opacity-100 md:opacity-0 opacity-100 space-x-2 transition-all duration-150 ease-in-out right-2 top-2">
                        {!item ? (
                          <button
                            className="btn btn-primary btn-dash px-2 rounded-sm"
                            disabled={true}
                          >
                            Update
                          </button>
                        ) : (
                          <label
                            htmlFor={item._id}
                            className="btn btn-primary btn-dash px-2 rounded-sm"
                          >
                            Update
                          </label>
                        )}

                        <button
                          className="btn btn-error btn-dash px-2 rounded-sm"
                          onClick={() => handleDelete(item)}
                        >
                          Delete?
                        </button>
                      </div>
                    )}

                    <ServiceUpdate index={item._id} item={item}></ServiceUpdate>
                  </div>
                );
              })}
          </section>
        </div>
      </div>
    </div>
  );
};
