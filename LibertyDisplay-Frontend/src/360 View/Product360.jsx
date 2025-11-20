import React from "react";
import React360Viewer from "react-360-view";

const Product360 = () => (
  <div className="max-w-[1340px] space-y-5 mt-10 mx-auto max-sm:px-5">
    <div>
      <p className="text-3xl font-semibold text-center">
        {" "}
        <span className="text-[#2a337b]">Our</span>{" "}
        <span className="text-orange-500">Products</span>
        <span className="text-[#2a337b]"> View </span>{" "}
      </p>
    </div>

    <section className="w-full md:h-[550px] h-[300px]">
      <iframe
        className=" w-full h-full rounded-xl bg-base-100"
        height="315"
        src="https://www.youtube.com/embed/iQv7zL91JgY?si=Q7q2yHd1IVc2-AvN"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </section>

    {/* <React360Viewer
      amount={36} // number of images
      imagePath="/360/"
      fileName="p_({index}).png"


    /> */}
  </div>
);

export default Product360;
