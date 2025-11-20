import React from "react";
import { FiMonitor, FiColumns, FiZap } from "react-icons/fi";

export default function TripleMonitorFeatures() {
  const features = [
    {
      title: "Expanded Screen Space",
      desc: "Add two extra 14-inch IPS displays to your laptop and instantly create a powerful triple-monitor setup for deeper focus and better visibility.",
      icon: FiMonitor,
    },
    {
      title: "Seamless Multitasking",
      desc: "View documents, dashboards, and video calls side by side without constantly switching windows, keeping your workflow smooth and distraction-free.",
      icon: FiColumns,
    },
    {
      title: "One-Cable Simplicity",
      desc: "A single, streamlined connection works with both Mac and Windows, letting you set up your mobile workstation in seconds wherever you go.",
      icon: FiZap,
    },
  ];

  return (
    <section className="w-full bg-[#fafafa] py-12 flex justify-center">
      <div className="w-full max-w-[1200px] px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="tracking-widest text-gray-400 mb-1 text-xs uppercase">
            Productivity, Anywhere
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Core Benefits of the{" "}
            <span className="text-[#2a337b]">Triple Laptop Monitor</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={[
                  "flex flex-col items-center text-center px-8 py-10 rounded-2xl bg-white",
                  "transition-transform transition-shadow duration-300 ease-out",
                  "hover:shadow-xl hover:scale-[1.03]",
                  idx === 0 ? "shadow-md" : "shadow-sm",
                ].join(" ")}
              >
                {/* Icon circle */}
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-[#1f4c8f]">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[#3c4f88] mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* CTA */}
                <button className="mt-auto text-sm font-semibold text-[#d65a32] inline-flex items-center hover:underline">
                  Comes free <span className="ml-1">→</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
