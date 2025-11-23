import React from "react";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const logo = useSelector((state) => state.AirWheel.logo);
  const navigate = useNavigate();
  return (
    <footer className="relative w-full bg-[#2a337b] mt-12 overflow-hidden">
      {/* Blurred cyan background */}
      <div
        className="absolute inset-0 z-0 bg-white/20 backdrop-blur-lg"
        aria-hidden="true"
      />
      {/* Overlay for content */}
      <div className="relative z-0 max-w-[1340px]  container mx-auto px-6 py-12 lg:py-10 flex  flex-col   lg:flex-row items-center  gap-10 text-white">
        {/* Logo and Contact */}
        <div className="  space-y-5  md:w-1/2">
          <div className="cursor-pointer block" onClick={() => navigate("/")}>
            {logo ? (
              <div className="w-[100px]">
                <img src={logo} alt="" />
              </div>
            ) : (
              <div className="skeleton rounded-sm h-10 w-[100px]"></div>
            )}
          </div>
          <div className="mb-1">
            Address: 418 BROADWAY STE R ALBANY NEW YORK 122072
          </div>
          <div className="mb-1">Wyoming, United States</div>
          <div className="mb-1">
            <span className="font-semibold">Phone:</span> +13322522817
          </div>
          <div className="mb-4">
            <span className="font-semibold">Email:</span>{" "}
            <a className="underline font-bold text-white">
              info@libertydisplay.us
            </a>
          </div>
          {/* Social icons */}
          <div className="flex gap-3 mt-2">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-gray-800/70 rounded hover:bg-[#2a337b transition"
            >
              <FaXTwitter />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-gray-800/70 rounded hover:bg-[#2a337b transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-gray-800/70 rounded hover:bg-[#2a337b transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-gray-800/70 rounded hover:bg-[#2a337b transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        {/* Useful Links */}

        <section className="flex justify-between w-full md:w-1/2 ">
          <div className=" md:text-center">
            <h3 className="font-semibold mb-4 text-lg">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-orange-500">
                  Home
                </a>
              </li>
              <li>
                <a href="/all-products" className="hover:text-orange-500">
                  Products
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-orange-500">
                  About us
                </a>
              </li>

              <li>
                <a href="/blog" className="hover:text-orange-500">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-orange-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="  md:text-right">
            <h3 className="font-semibold mb-4 text-lg">Our Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://libertytools.us/"
                  className="hover:text-orange-500"
                >
                  Liberty Equipment
                </a>
              </li>
              <li>
                <a
                  href="https://libertyforklift.com/"
                  className="hover:text-orange-500"
                ></a>
                Liberty Forklift
              </li>
              <li>
                <a
                  href="https://libertytools.us/"
                  className="hover:text-orange-500"
                >
                  Liberty Power Tools
                </a>
              </li>
              <li>
                <a
                  href="https://libertypump.us/"
                  className="hover:text-orange-500"
                >
                  Liberty Pump
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
      {/* Bottom bar */}
      <div className="relative border-t border-white/20 text-center text-gray-200 py-5 bg-black/30">
        <div>
          © Copyright{" "}
          <span
            className="font-bold text-blue-500 cursor-pointer"
            onClick={() => (window.location.href = "https://www.nordictech.ee")}
          >
            Nordic Tech
          </span>{" "}
          All Rights Reserved
        </div>
        <div className="text-sm mt-1">
          Designed by Advancesafety engineering
        </div>
      </div>
    </footer>
  );
};

export default Footer;
