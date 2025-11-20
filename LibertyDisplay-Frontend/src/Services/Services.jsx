import { Description } from "../About/About Descrption/Description";

// import banner from "../assets/img/page-title-bg.jpg"
import { ServicesHome } from "../Services Home/ServicesHome";
import TestimonialsSlider from "../Testimonials/Testimonials";
import Banner from "../assets/image/Banner Image/Service page.png";
export const Services = () => {
  return (
    <div>
      <div className="bg-base-200 flex justify-end md:-mt-[60px] -mt-[40px] ">
        <section className=" relative w-[1340px] mx-auto ">
          <img
            src={Banner} // Replace with your truck image link
            alt="Affordable Truck Service"
            className=" w-full   object-cover  rounded-lg"
          />

          <div className=" hidden md:block absolute top-1/2  md:left-10   w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="md:text-4xl text-2xl  font-bold text-gray-800 mb-4">
              Airwheel Service Hub
            </h1>
            <p className="md:text-lg text-base md:w-1/2 text-gray-600 mb-6">
              From intelligent scooters to smart luggage, we provide
              comprehensive service and support to keep your personal mobility
              devices rolling smooth and smart. Trust us for quality repairs,
              upgrades, diagnostics, and more.
            </p>
            <button className="px-8 py-3  bg-[#2a337b text-white text-lg rounded-md hover:bg-[#2a337b cursor-pointer transition duration-300">
              Get Service
            </button>
          </div>
        </section>
      </div>

      <ServicesHome></ServicesHome>
      <Description></Description>
      <TestimonialsSlider></TestimonialsSlider>
    </div>
  );
};
