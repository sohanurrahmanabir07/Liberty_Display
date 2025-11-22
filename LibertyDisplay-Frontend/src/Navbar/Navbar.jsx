import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { capitalizeWords, urlConverter } from "../Functions/functions";
import { useDispatch, useSelector } from "react-redux";
import { SideNavbar } from "./SideNav/SideNavbar";
import logoo from "../assets/image/logo/Liberty Air Wheel Logo.png";
export const Navbar = ({ categories, country }) => {
  const [showMegaBar, setShowMegaBar] = useState(false);
  const [showMegaBar2, setShowMegaBar2] = useState(false);
  const productsBtnRef = useRef(null);
  const countryBtnRef = useRef(null);
  const megaBarRef = useRef(null);
  const megaBarRef2 = useRef(null);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const logo = useSelector((state) => state.AirWheel.logo);
  const admin = useSelector((state) => state.AirWheel.users);
  const isDashboard = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40 || location.pathname.startsWith("/dashboard")) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const { america, asia, africa, europe, rest } = useMemo(() => {
    const buckets = { america: [], asia: [], africa: [], europe: [], rest: [] };
    (country ?? []).forEach((c) => {
      const r = (c.region || "").toLowerCase();
      if (buckets[r]) buckets[r].push(c);
      else buckets.rest.push(c);
    });
    return buckets;
  }, [country]);

  useEffect(() => {
    function handleClickOutside(e) {
      const clickOutsideProducts =
        showMegaBar &&
        megaBarRef.current &&
        !megaBarRef.current.contains(e.target) &&
        productsBtnRef.current &&
        !productsBtnRef.current.contains(e.target);

      const clickOutsideCountry =
        showMegaBar2 &&
        megaBarRef2.current &&
        !megaBarRef2.current.contains(e.target) &&
        countryBtnRef.current &&
        !countryBtnRef.current.contains(e.target);

      if (clickOutsideProducts) setShowMegaBar(false);
      if (clickOutsideCountry) setShowMegaBar2(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMegaBar, showMegaBar2]);

  // Classes for navbar background and shadow
  let navbarClasses = `
        transition-all duration-500 backdrop-blur-xs bg-white/20
        ${
          scrolled || isDashboard
            ? "fixed w-full    top-0 z-50 bg-white  text-[#2a337b] shadow-lg"
            : "bg-white  max-w-[1340px] rounded-lg"
        }
    `;

  const activeBorder = "border-b-2 border-[#2a337b] ";
  const linkText = `${scrolled ? `text-black` : `text-black`}`;

  return (
    <div className="relative z-10  ">
      <nav
        className={` mx-auto md:h-[50px] max-sm:py-2  px-5 fixed w-full  backdrop-blur-xs  bg-[#2a337b/10`}
      >
        <div className="flex justify-between mx-auto items-center max-w-[1340px]">
          {/* Logo & Drawer */}
          <div className="flex items-center justify-center space-x-4">
            <div className="space-x-5 md:hidden">
              {admin && isDashboard && (
                <label
                  htmlFor="dashboard-drawer"
                  className="drawer-button text-[#2a337b] text-3xl lg:hidden"
                >
                  ☰
                </label>
              )}
            </div>

            <div className="cursor-pointer block" onClick={() => navigate("/")}>
              {logo ? (
                // ?
                // <p className='text-3xl text-[#2a337b] font-semibold'>Air <span className='text-orange-500'>Wheeler</span></p>

                <div className="w-[100px]">
                  <img src={logo} alt="" />
                </div>
              ) : (
                <div className="skeleton rounded-sm h-10 w-[100px]"></div>
              )}
            </div>
          </div>
          {/* End (Menu) */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-md font-semibold">
              <li
                className={`${linkText} ${
                  location.pathname === "/" ? activeBorder : ""
                }`}
              >
                <Link className={linkText} to="/">
                  Home
                </Link>
              </li>
              <li>
                <button
                  ref={productsBtnRef}
                  className={`relative cursor-pointer flex items-center gap-1 ${linkText}`}
                  onClick={() => {
                    setShowMegaBar2(false);
                    setShowMegaBar((o) => !o);
                  }}
                >
                  Products
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`transition-transform duration-300 ${
                      showMegaBar ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </li>
              <li
                className={`${linkText} ${
                  location.pathname === "/about" ? activeBorder : ""
                }`}
              >
                <Link className={linkText} to="/about">
                  About
                </Link>
              </li>
              {/* <li
                className={`${linkText} ${
                  location.pathname === "/services" ? activeBorder : ""
                }`}
              >
                <Link className={linkText} to="/services">
                  Services
                </Link>
              </li> */}
              <li
                className={`${linkText} ${
                  location.pathname === "/blog" ? activeBorder : ""
                }`}
              >
                <Link className={linkText} to="/blog">
                  Blog
                </Link>
              </li>
              <li
                className={`${linkText} ${
                  location.pathname === "/contact" ? activeBorder : ""
                }`}
              >
                <Link className={linkText} to="/contact">
                  Contact
                </Link>
              </li>

              {/* <li>
                <button
                  ref={countryBtnRef}
                  className={`relative cursor-pointer flex items-center gap-1 ${linkText}`}
                  onClick={() => {
                    setShowMegaBar(false);
                    setShowMegaBar2((o) => !o);
                  }}
                >
                  Country
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`transition-transform duration-300 ${
                      showMegaBar2 ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </li> */}
              {admin && (
                <li
                  className={`${linkText} ${
                    location.pathname.startsWith("/dashboard")
                      ? activeBorder
                      : ""
                  }`}
                >
                  <Link className={linkText} to="/dashboard">
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="space-x-5 md:hidden">
            <label
              htmlFor="navbar-drawer"
              className="drawer-button lg:hidden text-[#2a337b] text-3xl cursor-pointer"
            >
              ☰
            </label>
          </div>
        </div>
        {/* MegaBar SideNavbar */}
        <SideNavbar categories={categories} />
      </nav>
      {showMegaBar && (
        <div
          ref={megaBarRef}
          className="bg-white/0   backdrop-blur-lg w-full transition-all duration-300 hidden md:block max-w-[1340px] mx-auto left-1/2 transform -translate-x-1/2 fixed top-[55px] shadow-2xl shadow-blue-300 rounded-xl z-50"
        >
          <div className="flex justify-end p-2">
            <div
              className="cursor-pointer font-semibold hover:scale-105 text-blue-500 duration-300"
              onClick={() => {
                setShowMegaBar(false);
                navigate("/all-products");
              }}
            >
              All Products
            </div>
          </div>
          <section className="flex flex-wrap gap-5 py-10 px-5  ">
            {categories &&
              categories.map((item, index) => (
                <section key={index}>
                  <div className=" relative group  cursor-pointer flex flex-col items-center">
                    <div
                      className="  duration-300 transition-all"
                      onClick={() => {
                        setShowMegaBar(false);
                        navigate(`/category/${urlConverter(item?.name)}`);
                      }}
                    >
                      <img
                        loading="lazy"
                        src={
                          item?.imageUrl ||
                          `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png`
                        }
                        className="w-[150px] group-hover:rotate-6 duration-200 transition-all rounded-md  object-cover mb-2"
                        alt={item?.name}
                      />
                    </div>
                    <Link
                      className="text-center text-cyan-950 font-semibold hover:underline w-full"
                      to={`/category/${urlConverter(item?.name)}`}
                    >
                      {capitalizeWords(item?.name)}
                    </Link>

                    {item?.subCategories?.length > 0 && (
                      <ul
                        className=" absolute  top-full ml-2 z-20
      w-48 bg-white/10 backdrop-blur-xl shadow-2xl shadow-blue-500 rounded-md
      font-semibold overflow-hidden
      transform origin-top scale-x-0 opacity-0 pointer-events-none
      transition-all duration-300 ease-out
      group-hover:scale-x-100 group-hover:opacity-100 text-center group-hover:pointer-events-auto p-2 ring-2 ring-white
    "
                      >
                        {item?.subCategories?.map((v, index) => {
                          return (
                            <li
                              key={index}
                              onClick={() => {
                                setShowMegaBar(false);
                                navigate(
                                  `/category/${urlConverter(item?.name)}`,
                                  { state: { subCategory: v } }
                                );
                              }}
                              className={`hover:scale-105 p-1 hover:bg-gray-200 ${
                                index != 0 && `border-t-2 border-gray-700`
                              }  duration-300 transition-all`}
                            >
                              {capitalizeWords(v)}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </section>
              ))}
          </section>
        </div>
      )}

      {/* ----------------------------------------Country Showing Megabar------------------------------------ */}

      {showMegaBar2 && (
        <div
          ref={megaBarRef2}
          className="bg-white/10 backdrop-blur-xs w-full transition-all duration-300 hidden md:block max-w-[1340px] mx-auto left-1/2 transform -translate-x-1/2  max-h-[550px] scroll-auto fixed top-[55px] shadow-2xl shadow-blue-300 rounded-lg z-50 p-4 "
        >
          <div className="flex justify-end p-2">
            <div
              className="cursor-pointer hover:scale-105 text-blue-500 duration-300"
              onClick={() => {
                setShowMegaBar(false);
                window.location.href = "https://libertyairwheel.com";
              }}
            >
              {location.pathname.startsWith("www.libertyairwheel.com") ||
              location.pathname.startsWith("libertyairwheel.com") ? (
                <FontAwesomeIcon icon={faGlobe} size="md">
                  {" "}
                </FontAwesomeIcon>
              ) : (
                ""
              )}
            </div>
          </div>
          {america.length > 0 && (
            <div>
              <p className="font-semibold text-xl text-gray-700">America</p>
              <hr className="border-1 text-gray-400" />

              <div>
                <section className="flex flex-wrap gap-5 p-5">
                  {america &&
                    america.map((item, index) => (
                      <div
                        key={index}
                        className=" group cursor-pointer flex flex-col items-center"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            item?.subDomain,
                            "_blank",
                            "noopener,noreferrer"
                          );
                          setShowMegaBar2(false);
                        }}
                      >
                        <img
                          loading="lazy"
                          src={
                            item?.imageUrl[0] ||
                            `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png`
                          }
                          className="w-[50px] group-hover:rotate-6 duration-200 transition-all rounded-md  object-cover mb-2"
                          alt={item?.name}
                        />
                        <Link
                          className="text-center text-xs text-cyan-950 font-semibold hover:underline w-full"
                          to={`/category/${urlConverter(item?.name)}`}
                        >
                          {capitalizeWords(item?.name)}
                        </Link>
                      </div>
                    ))}
                </section>
              </div>
            </div>
          )}

          {asia.length > 0 && (
            <div>
              <p className="font-semibold text-xl text-gray-700">Asia</p>
              <hr className="border-1 text-gray-400" />

              <section className="flex flex-wrap gap-5 p-5">
                {asia &&
                  asia.map((item, index) => (
                    <div
                      key={index}
                      className=" group cursor-pointer flex flex-col items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(
                          item?.subDomain,
                          "_blank",
                          "noopener,noreferrer"
                        );
                        setShowMegaBar2(false);
                      }}
                    >
                      <img
                        loading="lazy"
                        src={
                          item?.imageUrl[0] ||
                          `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png`
                        }
                        className="w-[50px] group-hover:rotate-6 duration-200 transition-all rounded-md  object-cover mb-2"
                        alt={item?.name}
                      />
                      <Link
                        className="text-center text-xs text-cyan-950 font-semibold hover:underline w-full"
                        to={`/category/${urlConverter(item?.name)}`}
                      >
                        {capitalizeWords(item?.name)}
                      </Link>
                    </div>
                  ))}
              </section>
            </div>
          )}

          {europe.length > 0 && (
            <div>
              <p className="font-semibold text-xl text-gray-700">Europe</p>
              <hr className="border-1 text-gray-400" />
              <section className="flex flex-wrap gap-5 p-5">
                {europe &&
                  europe.map((item, index) => (
                    <div
                      key={index}
                      className=" group cursor-pointer flex flex-col items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(
                          item?.subDomain,
                          "_blank",
                          "noopener,noreferrer"
                        );
                        setShowMegaBar2(false);
                      }}
                    >
                      <img
                        loading="lazy"
                        src={
                          item?.imageUrl[0] ||
                          `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png`
                        }
                        className="w-[50px] group-hover:rotate-6 duration-200 transition-all rounded-md  object-cover mb-2"
                        alt={item?.name}
                      />
                      <Link
                        className="text-center text-xs text-cyan-950 font-semibold hover:underline w-full"
                        to={`/category/${urlConverter(item?.name)}`}
                      >
                        {capitalizeWords(item?.name)}
                      </Link>
                    </div>
                  ))}
              </section>
            </div>
          )}

          {africa.length > 0 && (
            <div>
              <p className="font-semibold text-xl text-gray-700">Africa</p>
              <hr className="border-1 text-gray-400" />
              <section className="flex flex-wrap gap-5 p-5">
                {africa &&
                  africa.map((item, index) => (
                    <div
                      key={index}
                      className=" group cursor-pointer flex flex-col items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(
                          item?.subDomain,
                          "_blank",
                          "noopener,noreferrer"
                        );
                        setShowMegaBar2(false);
                      }}
                    >
                      <img
                        loading="lazy"
                        src={
                          item?.imageUrl[0] ||
                          `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png`
                        }
                        className="w-[50px] group-hover:rotate-6 duration-200 transition-all rounded-md  object-cover mb-2"
                        alt={item?.name}
                      />
                      <Link
                        className="text-center text-xs text-cyan-950 font-semibold hover:underline w-full"
                        to={`/category/${urlConverter(item?.name)}`}
                      >
                        {capitalizeWords(item?.name)}
                      </Link>
                    </div>
                  ))}
              </section>
            </div>
          )}

          {/* <section className="flex flex-wrap gap-5 p-5">
                        {country && country.map((item, index) => (
                            <div
                                key={index}
                                className='overflow-hidden group cursor-pointer flex flex-col items-center'
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open('https://www.google.com', '_blank', 'noopener,noreferrer');
                                    setShowMegaBar2(false)
                                }}
                            >
                                <img
                                    loading="lazy"
                                    src={item?.imageUrl[0] || `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png`}
                                    className='w-[150px] group-hover:rotate-6 duration-200 transition-all rounded-md  object-cover mb-2'
                                    alt={item?.name}
                                />
                                <Link className="text-center text-cyan-950 font-semibold hover:underline w-full" to={`/category/${urlConverter(item?.name)}`}>
                                    {capitalizeWords(item?.name)}
                                </Link>
                            </div>
                        ))}
                    </section> */}
        </div>
      )}

      {/* Spacer so content below doesn't hide behind navbar */}
      <div className="h-[50px] z-0"></div>
    </div>
  );
};
