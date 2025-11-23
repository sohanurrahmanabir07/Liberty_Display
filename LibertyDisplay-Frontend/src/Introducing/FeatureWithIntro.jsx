import React, { useMemo } from "react";
import monitor from "../assets/image/Home Page Images/14 Portable Monitor (1).jpg";

// Replace this with your product image import or url later if you want

export default function FeatureWithIntro() {
  //     {
  //       icon: (
  //         <span className="flex items-center justify-center rounded-full w-20 h-20 mx-auto mb-4">
  //           <div>
  //             <img
  //               src="https://motorisedsuitcase.com/cdn/shop/files/230721-AWS-SE3MiniT-GIF.gif?v=1698195720&width=800"
  //               alt=""
  //             />
  //           </div>
  //         </span>
  //       ),
  //       title: "Expanded Workspace",
  //       desc: "Instantly turn your laptop into a triple-screen workstation with two extra 14-inch IPS displays, giving you more space to create, analyse, and manage tasks side by side.",
  //     },
  //     {
  //       icon: (
  //         <span className="flex items-center justify-center rounded-full w-20 h-20 mx-auto mb-4">
  //           <div>
  //             <img
  //               src="https://airwheelfactory.com/cdn/shop/files/airwheel-se3t-electric-luggage-gif_1_b8900484-6c76-4ca5-a623-1f42c5bdf038.webp?v=1685500706&width=1500"
  //               alt=""
  //             />
  //           </div>
  //         </span>
  //       ),
  //       title: "Effortless Multitasking",
  //       desc: "Work smarter by running documents, data dashboards, video calls, and creative tools all at once—without constantly switching between overlapping windows.",
  //     },
  //     {
  //       icon: (
  //         <span className="flex items-center justify-center w-20 h-20 mx-auto mb-4">
  //           <div>
  //             <img src={airWheelerImg} alt="" />
  //           </div>
  //         </span>
  //       ),
  //       title: "One-Cable Simplicity",
  //       desc: "Enjoy a clean, hassle-free setup with a simplified one-cable connection that works with both Mac and Windows, so your mobile workstation is ready in seconds wherever you are.",
  //     },
  //   ],
  //   []
  // );

  return (
    <div className="w-full flex flex-col items-center justify-center md:py-5 py-2">
      {/* Features Section */}

      {/* Main Intro Section */}
      <div className="w-full max-w-[1340px] max-sm:px-4 mx-auto flex flex-col md:flex-row items-stretch gap-8 md:gap-12">
        {/* TEXT BLOCK (LEFT) */}
        <div className="md:w-1/2 w-full  py-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            14&quot; Portable Triple Laptop Monitor
          </h2>

          {/* small underline */}
          <div className="w-20 h-[3px] bg-blue-500 mb-6" />

          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
            In today&apos;s fast-paced professional landscape, maximizing
            productivity is essential. This 14-inch Portable Triple Laptop
            Monitor is engineered to meet that demand, instantly expanding your
            screen real estate with two additional 14-inch IPS displays and
            transforming your laptop into a powerful triple-monitor setup.
          </p>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
            The multi-screen configuration lets you effortlessly cross-reference
            documents, monitor live data, and join video conferences at the same
            time—without constantly switching between windows. A simplified
            one-cable connection for both Mac and Windows ensures a quick,
            hassle-free setup, empowering you to work smarter, reduce friction,
            and achieve a higher level of productivity wherever you go.
          </p>

          {/* link at bottom */}
          <button className="text-sm md:text-base text-blue-600 font-semibold inline-flex items-center hover:underline">
            Discover how it boosts your workflow
            <span className="ml-1">→</span>
          </button>
        </div>

        {/* GRAY IMAGE PLACEHOLDER (RIGHT) */}
        <div className="md:w-1/2 w-full bg-gray-200 min-h-[220px] rounded-2xl overflow-hidden shadow-2xl md:min-h-[360px] flex items-center justify-center">
          {/* Replace this later with your actual product image if you want */}
          <img
            src={monitor}
            alt="Triple Monitor"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
