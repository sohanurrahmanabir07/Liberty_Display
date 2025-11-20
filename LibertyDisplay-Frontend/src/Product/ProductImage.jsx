import React, { useState, useRef, useEffect } from 'react';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
// Custom Next Arrow
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        right: '10px',

        zIndex: 2,
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: 'cyan'
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faCircleArrowRight} size="2x" />
    </div>
  );
};

// Custom Prev Arrow
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div

      style={{
        position: 'absolute',
        top: '50%',
        left: '10px',
        zIndex: 2,
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: 'cyan',
        opacity: '50'
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faCircleArrowLeft} size="2x" />
    </div>
  );
};

export const ProductImage = ({ item }) => {
  const imageArr = item.imageUrl.map((img) => img);
  const [nav1, setNav1] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    setNav1(sliderRef.current);
    AOS.init();
  }, []);

  const settings = {
    asNavFor: nav1,
    infinite: imageArr.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (



    <section  className="px-4 py-6 bg-gray-100 rounded-lg w-full md:w-1/2 mx-auto overflow-hidden">
      {
        imageArr.length == 0 ?
          (
            <div className="skeleton h-[300px] w-[600px] "></div>
          )
          :
          (
            <div className="flex flex-col w-full md:flex-row gap-4 max-h-[500px] justify-center items-center">

              {/* Main Image Slider */}
              <div className="w-full  md:max-w-xl overflow-hidden">
                {


                  imageArr.length == 1 ?
                    (
                      <div className="flex justify-center items-center h-[300px]">
                        <img loading="lazy" src={imageArr[0]} className="max-h-full object-contain w-full rounded-lg" />
                      </div>
                    )
                    :
                    (
                      <Slider {...settings} ref={sliderRef}>
                        {imageArr.map((img, index) => (
                          <div key={index} className="flex justify-center items-center h-[300px]">
                            <img loading="lazy" src={img} alt={`slide-${index}`} className="max-h-full object-contain w-full rounded-lg" />
                          </div>
                        ))}
                      </Slider>
                    )
                }


              </div>

              {/* Thumbnails */}

              <div className="flex flex-row md:flex-col gap-2 overflow-x-auto max-w-[90vw] md:max-w-xs">
                {imageArr.map((img, index) => (
                  <div key={index} onClick={() => sliderRef.current.slickGoTo(index)}
                    className="cursor-pointer border-2 border-gray-300 rounded-lg overflow-hidden hover:border-blue-500 transition-all duration-200">
                    <img loading="lazy" src={img} alt={`thumb-${index}`} className="w-20 h-20 object-cover" />
                  </div>
                ))}
              </div>

            </div>
          )
      }

    </section>

  );
};;
