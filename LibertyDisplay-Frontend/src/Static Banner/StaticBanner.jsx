import React from "react";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

const StaticBanner = ({ imageUrl }) => {
  // Fallback image if none provided - a high quality abstract 3D render
  //   const activeImage =
  //     imageUrl ||
  //     "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";

  return (
    <div className="w-full max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row w-full rounded-lg overflow-hidden shadow-xl h-auto min-h-[500px]">
        {/* Left Side: Content (Blue Background) */}
        <div className="w-full md:w-1/2 bg-[#32508E] p-8 md:p-16 flex flex-col justify-center text-white">
          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6">
            Words Which Don'tsl <br /> All the Lors
          </h2>

          {/* Description */}
          <p className="text-sm md:text-base text-gray-200 mb-8 leading-relaxed opacity-90">
            "On the other hand, we denounce with righ blanditiis praesentium
            voluptatum deleniti atque cor greater pleasures, or else he endures
            worse pains."
          </p>

          {/* Form Inputs */}
          <div className="space-y-4 w-full">
            {/* Input Field */}
            <input
              type="text"
              placeholder="psum used sinci"
              className="w-full bg-transparent border border-white/50 rounded-full px-6 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
            />

            {/* Button */}
            <button className="w-full bg-white text-[#32508E] font-bold rounded-full px-6 py-3 hover:bg-gray-100 transition-colors shadow-md uppercase tracking-wide text-sm">
              Use In Touch
            </button>
          </div>
        </div>

        {/* Right Side: Image or Gray Placeholder */}
        <div
          className={`w-full md:w-1/2 min-h-[300px] relative ${
            !imageUrl ? "bg-[#C4C4C4]" : ""
          }`}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Promo Banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            /* This is the empty gray state if no prop is passed */
            <div className="w-full h-full bg-[#C4C4C4]"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaticBanner;
