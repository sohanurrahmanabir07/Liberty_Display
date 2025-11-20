import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaWarehouse,
  FaBoxes,
  FaTruckLoading,
  FaTools,
  FaArrowRight,
} from "react-icons/fa";

export const Description = () => {
  // Data kept exactly as per your company description
  const warehouseFeatures = [
    {
      icon: <FaWarehouse />,
      title: "Smart Storage Solutions",
      desc: "Our warehouse is equipped to handle a wide range of products, including our innovative Air Wheel luggage and scooters. Every item is stored carefully.",
    },
    {
      icon: <FaBoxes />,
      title: "Diverse Product Range",
      desc: "From foldable Air Wheel luggage to high-performance electric scooters and two-wheeled standing machines, we offer a variety of solutions.",
    },
    {
      icon: <FaTruckLoading />,
      title: "Quick & Reliable Delivery",
      desc: "We understand the importance of timely delivery. Our efficient logistics system ensures that your products arrive safely and on time.",
    },
    {
      icon: <FaTools />,
      title: "Rigorous Quality Control",
      desc: "All products undergo thorough checks for quality, performance, and safety. We ensure you're receiving only the best for your daily travels.",
    },
  ];

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="w-full bg-gray-100 py-20 px-4 md:px-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Centered like the reference image */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-6">
            Our Product Warehouse
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our state-of-the-art warehouse is the heart of our operation,
            housing a vast selection of Air Wheel luggage, electric scooters,
            and two-wheeled standing machines. Discover how we bring efficiency
            and reliability to your daily travels.
          </p>
        </div>

        {/* Features Grid - Styled like the cards in the reference image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {warehouseFeatures.map((f, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-sm shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
              data-aos="fade-up"
              data-aos-delay={i * 100} // Staggered animation
            >
              {/* Icon Circle */}
              <div className="w-20 h-20 rounded-full bg-[#1E40AF] flex items-center justify-center text-white text-3xl mb-8 shadow-md">
                {f.icon}
              </div>

              {/* Card Title - Serif Font */}
              <h3 className="text-2xl font-bold font-serif text-gray-900 mb-4">
                {f.title}
              </h3>

              {/* Card Description */}
              <p className="text-gray-500 leading-relaxed mb-8 text-sm">
                {f.desc}
              </p>

              {/* Bottom Link/Action */}
              <a
                href="#"
                className="mt-auto text-[#D97706] font-medium hover:text-[#B45309] transition-colors flex items-center gap-2 group"
              >
                Learn more
                <FaArrowRight className="text-xs transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
