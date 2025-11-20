import React, { useState, useRef } from "react";
import "./ProductImages.css"; // Custom styles for zoom effect
import { useOutletContext } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
// Example image URLs, replace with your actual product images
const IMAGES = [
  "https://res.cloudinary.com/des05ruq7/video/upload/v1756637744/zvdavfluq9u8dsnc6yc7.mp4",
];

// Utility for detecting mobile devices
function isMobileDevice() {
  if (typeof window === "undefined") return false;
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent
    ) || window.innerWidth <= 640
  );
}

export default function ProductImages({ item }) {
  const [current, setCurrent] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomStyles, setZoomStyles] = useState({});
  const zoomRef = useRef(null);

  const goPrev = () =>
    setCurrent((prev) => (prev === 0 ? item?.imageUrl?.length - 1 : prev - 1));
  const goNext = () =>
    setCurrent((prev) => (prev === item?.imageUrl?.length - 1 ? 0 : prev + 1));
  const setImage = (idx) => setCurrent(idx);

  // Only enable zoom on desktop
  const mobile = isMobileDevice();

  const handleMouseMove = (e) => {
    if (mobile) return; // Prevent zoom on mobile
    const rect = zoomRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomStyles({
      transform: "scale(2)",
      transformOrigin: `${x}% ${y}%`,
      cursor: "zoom-out",
    });
  };

  const handleMouseEnter = () => {
    if (mobile) return;
    setIsZoomed(true);
    setZoomStyles({
      transform: "scale(2)",
      transformOrigin: "center center",
      cursor: "zoom-out",
    });
  };

  const handleMouseLeave = () => {
    if (mobile) return;
    setIsZoomed(false);
    setZoomStyles({
      transform: "scale(1)",
      transformOrigin: "center center",
      cursor: "zoom-in",
    });
  };

  // Thumbnail highlight style
  const thumbHighlight = "ring-2 ring-cyan-500";

  // Responsive container width
  const containerWidth = mobile ? "100vw" : "400px";
  const containerHeight = mobile ? "55vw" : "400px";

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-0 md:text-lg top-50/100 md:top-1/2 z-5 -translate-y-1/2  text-gray-400 cursor-pointer hover:text-gray-600"
    >
      <FontAwesomeIcon icon={faChevronLeft} size="2xl" />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-0 md:text-lg top-50/100 md:top-1/2 z-5 -translate-y-1/2  text-gray-400 cursor-pointer hover:text-gray-600"
    >
      <FontAwesomeIcon icon={faChevronRight} size="2xl" />
    </button>
  );

  const thumbSettings = {
    infinite: true,
    slidesToShow: 5, // Number of thumbnails visible at once
    slidesToScroll: 1,
    arrows: true,
    speed: 300,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480, // extra small
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="flex w-full flex-col items-center">
      {/* Main image area */}
      <div className="relative w-full flex flex-col items-center mb-2">
        {/* Left arrow */}
        <button
          onClick={goPrev}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#2a337b]  bg-opacity-70 hover:bg-opacity-100 shadow rounded-full p-2 z-5"
        >
          <svg
            width={24}
            height={24}
            fill="none"
            stroke="white"
            strokeWidth={2}
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        {/* Main image with zoom effect on hover (no zoom on mobile) */}
        <div className="rounded-lg w-[90/100] overflow-hidden bg-white/1 backdrop-blur-sm shadow-xs product-zoom-container">
          <img
            ref={zoomRef}
            src={item.imageUrl[current]}
            alt={`Product image ${current + 1}`}
            className="w-full h-full transition-transform duration-300 product-zoom-img"
            style={
              !mobile && isZoomed
                ? zoomStyles
                : {
                    cursor: !mobile ? "zoom-in" : "pointer",
                    transform: "scale(1)",
                  }
            }
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            draggable={false}
          />
        </div>
        {/* Right arrow */}
        <button
          onClick={goNext}
          aria-label="Next image"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2a337b] text-whi bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 z-5"
        >
          <svg
            width={24}
            height={24}
            fill="none"
            stroke="white"
            strokeWidth={2}
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      {/* Thumbnails */}
      {/* <div className="flex gap-2 xs:gap-3 sm:gap-4 items-center mt-2 overflow-x-auto px-2">

                <button
                    onClick={goPrev}
                    aria-label="Previous image"
                    className="bg-white bg-opacity-60 hover:bg-opacity-100 shadow rounded-full p-1"
                >
                    <svg
                        width={18}
                        height={18}
                        fill="none"
                        stroke="black"
                        strokeWidth={2}
                    >
                        <path d="M12 15l-6-6 6-6" />
                    </svg>
                </button>

                {item && item.imageUrl.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className={`w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-md object-contain cursor-pointer transition-all duration-200 shadow ${current === idx
                            ? thumbHighlight
                            : "opacity-70 hover:opacity-100"
                            }`}
                        onClick={() => setImage(idx)}
                        draggable={false}
                    />
                ))}

                <button
                    onClick={goNext}
                    aria-label="Next image"
                    className="bg-white bg-opacity-60 hover:bg-opacity-100 shadow rounded-full p-1"
                >
                    <svg
                        width={18}
                        height={18}
                        fill="none"
                        stroke="black"
                        strokeWidth={2}
                    >
                        <path d="M6 3l6 6-6 6" />
                    </svg>
                </button>
            </div> */}

      <div className="w-full mt-2 ">
        {item?.imageUrl.length > 1 ? (
          <div className="px-1">
            <Slider {...thumbSettings}>
              {/* {IMAGES.map((video, idx) => (
                <video
                  key={idx}
                  src={video}
                  className=" w-25 h-25 rounded-lg"
                  controls
                  autoPlay
                />
              ))} */}
              {item?.imageUrl.map((img, idx) => (
                <div key={idx} className="">
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className={`w-25 h-25 rounded-md object-contain cursor-pointer transition-all duration-200 shadow ${
                      current === idx
                        ? "ring-3 ring-cyan-500"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => setImage(idx)}
                    draggable={false}
                  />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <img
              src={item?.imageUrl[0]}
              className={`w-25 h-25 rounded-md object-contain cursor-pointer ring-3 ring-cyan-500 transition-all duration-200 shadow `}
              onClick={() => setImage(idx)}
              draggable={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
