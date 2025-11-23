import React, { useEffect } from "react";
import Slider from "react-slick";
import { FaQuoteLeft } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AOS from "aos";
import "aos/dist/aos.css";

// Updated Data with REAL image links
const testimonials = [
  {
    name: "Sarah Jenkins",
    title: "Senior Software Engineer",
    tool: "Triple Monitor Workstation",
    text: "The 14-inch IPS displays are stunning. I can finally have my code, documentation, and live preview open simultaneously without Alt-Tab fatigue. It’s doubled my coding efficiency.",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Marcus Chen",
    title: "Financial Analyst",
    tool: "Portable Triple Monitor",
    text: "Cross-referencing complex spreadsheets while on video calls used to be a nightmare. This device transformed my laptop into a command center. The one-cable setup is pure magic.",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Elena Rodriguez",
    title: "Digital Nomad",
    tool: "Dual Screen Extender",
    text: "I was worried about the setup, but the plug-and-play connection for my Mac was seamless. Now I have a full desktop experience whether I'm in a coffee shop or a hotel room.",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "David Okafor",
    title: "Project Manager",
    tool: "14-inch Triple Setup",
    text: "Eliminating the constraints of a single screen has been a game-changer for my workflow. I can monitor data streams and manage projects instantly. An essential investment for professionals.",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Jessica Lee",
    title: "Marketing Specialist",
    tool: "Extended Mobile Workspace",
    text: "Managing campaigns across multiple platforms requires constant window switching. This triple monitor setup is a revelation for real-time analytics and content creation.",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Omar Sharif",
    title: "UX Designer",
    tool: "Portable Design Studio",
    text: "Designing on the go has never been easier. I can have my main design software, reference images, and client feedback all visible without compromise. Absolutely brilliant.",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -left-6 md:-left-10 top-1/2 -translate-y-1/2 z-5 flex items-center justify-center w-10 h-10 rounded-full bg-white text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300 shadow-lg border border-slate-100"
    aria-label="Previous"
  >
    <FontAwesomeIcon icon={faChevronLeft} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-6 md:-right-10 top-1/2 -translate-y-1/2 z-5 flex items-center justify-center w-10 h-10 rounded-full bg-white text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300 shadow-lg border border-slate-100"
    aria-label="Next"
  >
    <FontAwesomeIcon icon={faChevronRight} />
  </button>
);

const settings = {
  infinite: true,
  speed: 600,
  slidesToShow: 2,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 5000,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
  dots: true,
  appendDots: (dots) => (
    <div style={{ bottom: "-40px" }}>
      <ul className="m-0 p-0"> {dots} </ul>
    </div>
  ),
};

const TestimonialsSlider = () => {
  useEffect(() => {
    AOS.init({ once: true, offset: 50, duration: 800 });
  }, []);

  return (
    <section className="w-full bg-slate-50 py-24 flex justify-center overflow-hidden">
      <div className="w-full max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20" data-aos="fade-down">
          <h2 className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-3">
            Testimonials
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Trusted by Professionals
          </h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            See how our Triple Monitor Setup is helping experts across
            industries achieve their peak productivity.
          </p>
        </div>

        {/* Slider */}
        <div className="relative md:px-4 px-2 ">
          <Slider {...settings}>
            {testimonials.map((item, idx) => (
              <div key={idx} className="px-4 py-4">
                <div
                  // CHANGED: Removed min-h-[320px] and h-full
                  // ADDED: h-[450px] to enforce strict equal height
                  // ADDED: flex flex-col justify-between to space content evenly
                  className="bg-white rounded-2xl p-8 md:p-10 h-[450px] flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 border border-slate-100"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  {/* Top Content Group (Quote + Text) */}
                  <div>
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <FaQuoteLeft className="text-indigo-200 text-4xl" />
                    </div>

                    {/* Review Text */}
                    {/* Added overflow-hidden line-clamp to prevent spillover if text is REALLY long */}
                    <p className="text-slate-600 text-lg leading-relaxed mb-8 italic line-clamp-6">
                      "{item.text}"
                    </p>
                  </div>

                  {/* User Info Group (Sticks to bottom) */}
                  <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                    <img
                      src={item.avatarUrl}
                      alt={item.name}
                      className="w-14 h-14 rounded-full object-cover ring-4 ring-indigo-50"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">
                        {item.name}
                      </h4>
                      <p className="text-indigo-600 text-sm font-medium">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
