import React from "react";
import image1 from "../assets/image/Home Page Images/AboutPageImage.jpeg"; // Keep your local import

const StaticBanner = ({ imageUrl }) => {
  // Use the prop if passed, otherwise use local image, otherwise fallback to a relevant URL
  const activeImage =
    imageUrl ||
    image1 ||
    "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=2000";

  return (
    <div className="w-full md:w-[95%]    mx-auto  px-4">
      <div className="flex flex-col lg:flex-row w-full rounded-2xl overflow-hidden shadow-2xl h-auto min-h-[550px]">
        {/* Left Side: Content (Blue Background) */}
        <div className="w-full lg:w-1/2 bg-[#32508E] p-10 md:p-16 flex flex-col justify-center text-white relative">
          {/* Decorative Element */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative ">
            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6">
              The Ultimate <br /> Mobile Workstation
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-blue-100 mb-8 leading-relaxed max-w-xl">
              "In today's fast-paced professional landscape, maximizing
              productivity is paramount. Transform your laptop into a powerful
              triple-monitor setup with our 14-inch Portable Extender. One
              cable, zero drivers, infinite possibilities."
            </p>

            {/* Form Inputs */}
            <div className="w-full max-w-md space-y-5">
              {/* Input Field */}
              <div>
                <label className="text-xs font-semibold text-blue-200 uppercase tracking-wider ml-4 mb-1 block">
                  Get Full Specifications
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-white/10 border border-white/30 rounded-full px-8 py-4 text-white placeholder-blue-200/70 focus:outline-none focus:border-white focus:bg-white/20 focus:ring-2 focus:ring-white/50 transition-all backdrop-blur-sm"
                />
              </div>

              {/* Button */}
              <button className="w-full bg-white text-[#32508E] font-bold rounded-full px-8 py-4 hover:bg-gray-100 hover:scale-[1.02] transition-all duration-300 shadow-lg uppercase tracking-wide text-sm flex items-center justify-center gap-2">
                Upgrade Your Workflow
              </button>

              <p className="text-xs text-blue-300 text-center mt-4">
                Compatible with macOS & Windows • Instant Setup
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Image Area */}
        <div className="w-full lg:w-1/2 min-h-[350px] relative bg-gray-200">
          {activeImage ? (
            <>
              <img
                src={activeImage}
                alt="Triple Laptop Monitor Setup"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Gradient Overlay for text readability if mobile stacks */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#32508E]/50 to-transparent lg:hidden"></div>
            </>
          ) : (
            <div className="w-full h-full bg-[#C4C4C4] flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaticBanner;
