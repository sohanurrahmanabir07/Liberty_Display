import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import image1 from "../../assets/image/Home Page Images/AboutPageImage2.jpeg";
import image2 from "../../assets/image/Home Page Images/AboutPageImage3.jpeg";
import {
  Monitor,
  Zap,
  Maximize2,
  Cable,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

// Placeholder images for the Triple Monitor context
// In a real app, these would be your imported assets
const IMAGE_1 =
  image1 ||
  "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=2542";
const IMAGE_2 =
  image2 ||
  "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=2370";

const featuresData = [
  {
    id: 1,
    title: "Maximize Productivity with Triple-Screen Power",
    heading: "Unparalleled Screen Real Estate",
    description:
      "In today's fast-paced professional landscape, maximizing productivity is paramount. The 14-inch Portable Triple Laptop Monitor is a revolutionary tool engineered to meet this demand. This innovative device instantly expands your workspace by offering two additional 14-inch IPS displays, transforming your standard laptop into a command center.",
    image: IMAGE_1,
    highlights: [
      "Dual 14-inch IPS Expansions",
      "Instant Workstation Setup",
      "Zero Driver Installation",
    ],
    cta: "View Specifications",
  },
  {
    id: 2,
    title: "Seamless Connectivity & Multitasking",
    heading: "One Cable. Infinite Possibilities.",
    description:
      "Imagine effortlessly cross-referencing documents, monitoring data streams, and engaging in video conferences simultaneously. The simplified one-cable connection for both Mac and Windows ensures a hassle-free setup, allowing you to establish your expanded workstation in seconds without the clutter.",
    image: IMAGE_2,
    highlights: [
      "Universal Mac & Windows Support",
      "Single Type-C Cable Solution",
      "Optimize Workflow Efficiency",
    ],
    cta: "Check Now",
  },
];

const StorySection = () => {
  useEffect(() => {
    AOS.init({
      once: true, // Animation happens only once for better performance
      offset: 100,
    });
  }, []);

  return (
    <section className="w-full py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {featuresData.map((feature, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={feature.id}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                !isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Section */}
              <div
                className="w-full lg:w-1/2 relative group"
                data-aos={isEven ? "fade-right" : "fade-left"}
                data-aos-duration="1000"
              >
                {/* Decorative blob/background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl opacity-20 blur-2xl group-hover:opacity-30 transition duration-500"></div>

                <img
                  src={feature.image}
                  alt={feature.title}
                  className="relative w-full h-[400px] object-cover rounded-2xl shadow-2xl border border-slate-200 z-10 transform transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 z-20 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden md:flex items-center gap-3">
                  <div className="bg-indigo-100 p-2 rounded-full text-[#2a337b]">
                    {isEven ? <Maximize2 size={20} /> : <Cable size={20} />}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase">
                      {isEven ? "Display" : "Input"}
                    </p>
                    <p className="text-sm font-bold text-slate-800">
                      {isEven ? "1080P IPS Panel" : "USB-C / HDMI"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div
                className="w-full lg:w-1/2"
                data-aos={isEven ? "fade-left" : "fade-right"}
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                <div className="flex items-center gap-2 text-[#2a337b] font-bold tracking-wide uppercase text-sm mb-3">
                  <Zap size={16} />
                  <span>{feature.title}</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">
                  {feature.heading}
                </h2>

                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {feature.description}
                </p>

                {/* Feature List */}
                <div className="space-y-4 mb-8">
                  {feature.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2
                        className="text-[#2a337b] shrink-0"
                        size={20}
                      />
                      <span className="text-slate-700 font-medium">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>

                <a href="/all-products">
                  <button className="group cursor-pointer flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-indigo-500/30">
                    {feature.cta}
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StorySection;
