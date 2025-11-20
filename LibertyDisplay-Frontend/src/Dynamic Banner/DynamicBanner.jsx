import { useEffect } from "react";
import { capitalizeWords } from "../Functions/functions";
import AOS from "aos";
import "aos/dist/aos.css";

export const DynamicBanner = ({ item }) => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      {!item ? (
        <div className="skeleton min-h-[400px] w-full "></div>
      ) : (
        <div className="relative overflow-hidden rounded-lg max-sm:h-[200px] max-sm:rounded-none shadow-sm shadow-gray-400 md:-mt-20">
          <img
            data-aos="fade-up"
            data-aos-duration="2000"
            loading="lazy"
            src={` ${
              item?.bannerImgUrl[0] ||
              `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png?20210219185637`
            } `}
            className="h-full w-full"
            alt=""
          />
          <div className="absolute  bottom-5 left-5">
            <p className="font-semibold text-3xl text-white text-shadow-xl text-shadow-yellow-600">
              {capitalizeWords(item?.name)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
