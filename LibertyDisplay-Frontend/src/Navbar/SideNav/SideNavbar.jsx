import { faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { capitalizeWords, urlConverter } from "../../Functions/functions";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../Redux/airwheel";

export const SideNavbar = ({ categories }) => {
  const [isCategoriesOpen, setCategoriesOpen] = useState(false);
  const [isAboutOpen, setAboutOpen] = useState(false);
  const navigate = useNavigate();
  const admin = useSelector((state) => state.AirWheel.users);
  const dispatch = useDispatch();
  return (
    <div className="drawer   z-20 sticky">
      <input id="navbar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side ">
        <label
          htmlFor="navbar-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu relative bg-white backdrop-blur-lg w-2/3 space-y-5 text-center font-semibold text-gray-200 h-screen md:text-lg p-4">
          {/* Close Button for Mobile */}
          <div className="flex flex-row-reverse md:hidden">
            <div>
              <label htmlFor="navbar-drawer" className="drawer-button">
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-red-500"
                  size="lg"
                />
              </label>
            </div>
          </div>

          {/* FAQ-Style Categories Section */}
          <div className="cursor-pointer  ">
            <div
              className="flex space-x-2  items-center px-3 py-2 font-bold rounded-md btn btn-soft text-[#2a337b]"
              onClick={() => setCategoriesOpen(!isCategoriesOpen)}
            >
              <span>Products</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-300 ${
                  isCategoriesOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            <div
              className={`w-full flex-col bg-blue-50 rounded-lg  p-3 shadow-lg text-[#2a337b] mt-3  ${
                isCategoriesOpen ? `block` : `hidden`
              }  top-full`}
            >
              <div className="flex flex-row-reverse">
                <div
                  className="text-xs  text-[#2a337b] underline"
                  onClick={() => {
                    navigate("/all-products");
                    document.getElementById("navbar-drawer").checked = false;
                  }}
                >
                  View All Products
                </div>
              </div>

              <div className="w-full space-y-2 p-2">
                {categories &&
                  categories.map((item, index) => {
                    return (
                      <p
                        onClick={() => {
                          navigate(`/category/${urlConverter(item?.name)}`);
                          document.getElementById(
                            "navbar-drawer"
                          ).checked = false;
                        }}
                        key={index}
                        className="text-md cursor-pointer hover:underline "
                      >
                        {capitalizeWords(item?.name)}
                      </p>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* FAQ-Style About Section */}
          <li className="cursor-pointer">
            <div
              className="flex space-x-2  items-center px-3 py-2 font-bold rounded-md btn btn-soft text-[#2a337b]"
              onClick={() => {
                navigate("/about");
                document.getElementById("navbar-drawer").checked = false;
              }}
            >
              <span>About</span>
            </div>
          </li>

          {/* Clickable Items */}
          {/* <li className="cursor-pointer px-3 py-2 font-bold rounded-md btn btn-soft text-[#2a337b] hover:bg-blue-600" onClick={() => { navigate('/services'); document.getElementById("navbar-drawer").checked = false; }} >
                        Services
                    </li> */}

          <li
            className="cursor-pointer px-3 py-2 font-bold rounded-md btn btn-soft text-[#2a337b] hover:bg-blue-600"
            onClick={() => {
              navigate("/blog");
              document.getElementById("navbar-drawer").checked = false;
            }}
          >
            Blog
          </li>

          <li
            onClick={() => {
              navigate("/contact");
              document.getElementById("navbar-drawer").checked = false;
            }}
            className="cursor-pointer px-3 py-2 font-bold rounded-md btn btn-soft text-[#2a337b] hover:bg-blue-600"
          >
            Contact
          </li>

          {admin && (
            <li
              onClick={() => {
                navigate("/dashboard");
                document.getElementById("navbar-drawer").checked = false;
              }}
              className="cursor-pointer px-3 py-2 font-bold rounded-md btn btn-soft text-[#2a337b] hover:bg-blue-600"
            >
              Dashboard
            </li>
          )}

          {admin && (
            <div className="absolute bottom-5 px-4 w-full right-0">
              <li
                onClick={() => {
                  dispatch(removeUser());
                  document.getElementById("navbar-drawer").checked = false;
                }}
                className="cursor-pointer px-3 py-2 font-bold rounded-md w-full btn btn-soft text-red-700 hover:bg-blue-600"
              >
                Logout
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};
