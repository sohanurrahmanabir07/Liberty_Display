import React, { useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { ProductCard } from "../Product Card/ProductCard";
import { useOutletContext } from "react-router-dom";

// Sample product data

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

const ProductSlider = () => {
  const settings = useMemo(
    () => ({
      infinite: true,
      speed: 700,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 3500,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        { breakpoint: 800, settings: { slidesToShow: 1 } },
        { breakpoint: 600, settings: { slidesToShow: 1 } },
      ],
      appendDots: (dots) => (
        <div>
          <ul style={{ margin: "0px" }}>{dots}</ul>
        </div>
      ),
      customPaging: () => (
        <span
          style={{
            display: "inline-block",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "#ffc107",
            margin: "0 4px",
          }}
        />
      ),
    }),
    []
  );
  const { products } = useOutletContext();
  console.log("Products", products);

  return (
    <section className="w-full py-14 max-w-[1340px] mx-auto flex flex-col items-center bg-white">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-700 flex items-center justify-center  space-x-2 md:space-x-5">
          <span className="text-[#2a337b]">Liberty</span>{" "}
          <span className="text-orange-500">Display </span>{" "}
          <span>PRODUCTS</span>
          {/* <CountUp enableScrollSpy={true} start={0} end={products &&  products.length} delay={10} >
                        {({ countUpRef }) =>
                            <div>
                                ( <span className="md:text-5xl text-2xl font-semibold text-[#2a337b]" ref={countUpRef} />+ )
                            </div>
                        }
                    </CountUp> */}
        </h2>
        <div className="w-16 h-1 bg-[#2a337b mx-auto mt-2 mb-1 rounded" />
      </div>

      <div className="w-full py-5">
        {products?.length ? (
          products?.length > 1 ? (
            <Slider {...settings}>
              {products &&
                products.slice(0, 6).map((item, idx) => {
                  const number = Math.floor(
                    Math.random() * products.length - 1
                  );

                  return (
                    <div key={idx} className="px-4">
                      <ProductCard item={products[number]}></ProductCard>
                    </div>
                  );
                })}
            </Slider>
          ) : (
            <div className="flex items-center justify-center">
              <ProductCard item={products[0]}></ProductCard>
            </div>
          )
        ) : (
          <Slider {...settings}>
            {[1, 2, 3, 4].map((item, idx) => (
              <div key={idx} className="px-10 md:px-4">
                <div className="skeleton h-[300px] max-sm:w-full  w-[270px]"></div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default ProductSlider;
