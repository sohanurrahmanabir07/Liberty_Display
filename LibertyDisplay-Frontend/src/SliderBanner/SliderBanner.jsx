import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import banner from "../assets/image/Banner Image/Service page.png";
import { useOutletContext } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { memo, useEffect, useMemo } from "react";
export const SliderBanner = memo(() => {
  const { banners } = useOutletContext();

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute max-sm:hidden left-4 md:text-3xl text-2xl top-50/100 md:top-1/2 z-5 -translate-y-1/2  text-gray-400 cursor-pointer hover:text-gray-600"
    >
      <FontAwesomeIcon icon={faChevronLeft} size="2xl"></FontAwesomeIcon>
    </button>
  );
  useEffect(() => {
    AOS.init({
      offset: 50,
    });
  }, []);

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute max-sm:hidden right-4 md:text-3xl text-2xl top-50/100   md:top-1/2 z-5 -translate-y-1/2  text-gray-400 cursor-pointer hover:text-gray-600"
    >
      <FontAwesomeIcon icon={faChevronRight} size="2xl"></FontAwesomeIcon>
    </button>
  );
  const settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 700, // faster transitions reduce long paints
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      autoplay: true,
      autoplaySpeed: 3500,
      lazyLoad: "ondemand", // key perf win
      pauseOnHover: true,
      swipeToSlide: true,
      cssEase: "ease",
    }),
    []
  );

  return (
    <div className="relative md:-mt-[0px] max-sm:px-4 ">
      {banners.length == 0 ? (
        <div className="skeleton w-full max-sm:h-[250px] h-[650px] "></div>
      ) : (
        <Slider {...settings}>
          {banners.length > 1
            ? banners.map((item, index) => {
                return (
                  <div
                    className="w-full  skeleton   overflow-hidden "
                    key={index}
                  >
                    <img
                      src={item.imageUrl[0]}
                      className="w-full    "
                      loading="lazy"
                      decoding="async"
                      alt=""
                    />
                  </div>
                );
              })
            : [1, 2].map((item, index) => {
                return (
                  <div className="w-full overflow-hidden " key={index}>
                    <img
                      loading="lazy"
                      decoding="async"
                      src={
                        banners[0].imageUrl[0] ||
                        `https://elomus-theme.myshopify.com/cdn/shop/files/slider2-elomus1-1920x900.jpg?crop=center&format=pjpg&height=900&v=1613722537&width=1920`
                      }
                      className="w-full    "
                      alt=""
                    />
                  </div>
                );
              })}
        </Slider>
      )}

      <div className="text-left hidden w-3/4  md:w-[650px] md:space-y-5 absolute md:top-2/3 left-1/2 max-sm:bottom-0 md:left-1/3 transform -translate-x-1/2  -translate-y-1/2  bg-white/2 backdrop-blur-sm p-5 rounded-2xl overflow-hidden  ">
        <h1
          data-aos="fade-right"
          data-aos-duration="1000"
          className="md:text-4xl md:text-gray-100 text-white text-xl font-bold"
        >
          Words Which Don’t
          <br />
          <span className="block md:inline">Sell All the Lorem</span>
        </h1>

        {/* Sub text */}
        <p
          data-aos="fade-left"
          data-aos-duration="1000"
          className="md:font-medium text-gray-100 text-sm md:text-lg md:w-3/4"
        >
          There are many variations of passages of Lorem Ipsum and
          molecule-maker characterization. Let our team and software help solve
          your problems.
        </p>

        {/* Input + button row */}
        <div
          data-aos="fade-up"
          data-aos-duration="1400"
          className="mt-3 flex flex-col md:flex-row md:items-stretch max-w-md"
        >
          <input
            type="text"
            placeholder="psum used sinci"
            className="px-4 py-3 rounded-t-full md:rounded-l-full md:rounded-tr-none border border-gray-300 outline-none text-sm md:text-base"
          />
          <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-b-full md:rounded-r-full md:rounded-bl-none hover:bg-orange-600 transition-all duration-300">
            Use in touch
          </button>
        </div>

        {/* Small bottom text */}
        <p className="mt-2 text-xs md:text-sm text-gray-200">
          Comes froe &rarr;
        </p>
      </div>
    </div>
  );
});
