import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { UpdateLogoModal } from "../Logo/UpdateLogoModal";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="drawer drawer-end lg:drawer-open z-15 md:z-0 w-auto sticky">
      <div className="z-10">
        <UpdateLogoModal></UpdateLogoModal>
      </div>

      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-blue-50 space-y-5  text-center font-semibold text-gray-200 min-h-full md:text-lg p-4">
          {/* Sidebar content here */}

          <div className="flex flex-row-reverse  md:hidden">
            <div>
              <label
                htmlFor="dashboard-drawer"
                className="drawer-button text-red-600 "
              >
                <FontAwesomeIcon icon={faXmark} size="lg"></FontAwesomeIcon>
              </label>
            </div>
          </div>
          <NavLink
            className={
              location.pathname == "/dashboard"
                ? "btn btn-soft text-blue-700"
                : "hover:bg-blue-300 hover:rounded-md text-blue-700"
            }
            to={"/dashboard"}
          >
            <li>Home</li>
          </NavLink>

          <NavLink
            to={"/dashboard/categories"}
            className={
              location.pathname == "/dashboard/categories"
                ? "btn btn-soft text-blue-700"
                : "hover:bg-blue-300 hover:rounded-md text-blue-700"
            }
          >
            <li>Categories</li>
          </NavLink>

          <NavLink>
            <li className="text-blue-700">Admin's</li>
          </NavLink>

          <NavLink>
            <li className="text-blue-700">Requested</li>
          </NavLink>

          <NavLink
            className={
              location.pathname == "/dashboard/products"
                ? "btn btn-soft text-blue-700"
                : "hover:bg-blue-300 hover:rounded-md text-blue-700"
            }
            to={"/dashboard/products"}
          >
            <li>Products</li>
          </NavLink>

          <NavLink
            className={
              location.pathname == "/dashboard/queries"
                ? "btn btn-soft text-blue-700"
                : "hover:bg-blue-300 hover:rounded-md text-blue-700"
            }
            to={"/dashboard/queries"}
          >
            <li>Queries</li>
          </NavLink>

          <label
            htmlFor="uploadLogo"
            className="text-blue-700 hover:bg-blue-400 cursor-pointer px-3 py-2 font-semibold rounded-md"
          >
            {" "}
            Upload Logo{" "}
          </label>
          {/* <label htmlFor="uploadBanner" className='text-gray-100 hover:bg-blue-400 cursor-pointer px-3 py-2 font-semibold rounded-md'>  Add Banner </label> */}

          <NavLink
            className={
              location.pathname == "/dashboard/banners"
                ? "btn btn-soft text-blue-700"
                : "hover:bg-blue-300 hover:rounded-md text-blue-700"
            }
            to={"/dashboard/banners"}
          >
            <li>Banners</li>
          </NavLink>

          <NavLink
            className={
              location.pathname == "/dashboard/blog"
                ? "btn btn-soft text-blue-700"
                : "hover:bg-blue-500 hover:rounded-md text-blue-700"
            }
            to={"/dashboard/blog"}
          >
            <li>Blog</li>
          </NavLink>
          <NavLink
            className={
              location.pathname == "/dashboard/certificate"
                ? "btn btn-soft text-blue-700"
                : "hover:bg-blue-500 hover:rounded-md text-blue-700"
            }
            to={"/dashboard/certificate"}
          >
            <li>Certificate</li>
          </NavLink>

          <NavLink
            className={
              location.pathname == "/dashboard/catalogue"
                ? "btn btn-soft text-blue-700"
                : "hover:bg-blue-500 hover:rounded-md text-blue-700"
            }
            to={"/dashboard/catalogue"}
          >
            <li>Catalogues</li>
          </NavLink>

          <NavLink
            className={
              location.pathname == "/dashboard/country"
                ? "btn btn-soft text-blue-700"
                : "hover:bg-blue-500 hover:rounded-md text-blue-700"
            }
            to={"/dashboard/country"}
          >
            <li>Country</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};
