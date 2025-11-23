import React from "react";
import { Monitor, Zap, TrendingUp, Cable } from "lucide-react";

// Ideally, pass the image as a prop, but defaulting here for the demo
import monitorImage from "../assets/image/Home Page Images/image-1.png";

export default function TripleMonitorFeature() {
  return (
    <section className="py-20 bg-slate-50 overflow-hidden relative">
      {/* Decorative Background Blob */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#2a337b] font-semibold tracking-wide uppercase text-sm mb-2">
            Next-Gen Workspace
          </h2>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
            Unleash Your <span className=" text-[#2a337b]">Full Potential</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            The ultimate upgrade for the modern professional.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Visuals */}
          <div className="relative order-2 lg:order-1">
            {/* Main Image Container with Depth */}
            <div className="relative rounded-2xl bg-white p-2 shadow-2xl border border-slate-200 transform transition-transform duration-500 hover:scale-[1.01]">
              <div className="aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden relative flex items-center justify-center">
                <img
                  src={
                    monitorImage ||
                    "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=2000"
                  }
                  alt="Triple Monitor Setup"
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </div>

              {/* Floating "Tech Spec" Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden md:flex items-center gap-4 animate-fade-in-up">
                <div className="bg-indigo-50 p-3 rounded-full text-[#2a337b]">
                  <Monitor size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">
                    Display
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    Dual 14" IPS Panels
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Block 1: Introduction */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Zap className="text-amber-500" size={24} />
                Maximize Productivity
              </h3>
              <p className="text-slate-600 leading-relaxed">
                In today's fast-paced professional landscape, maximizing
                productivity is paramount. The{" "}
                <strong className="text-slate-900">
                  14-inch Portable Triple Laptop Monitor
                </strong>{" "}
                is a revolutionary tool engineered to meet this demand. This
                innovative device instantly expands your screen real estate by
                providing two additional 14-inch IPS displays, effectively
                transforming your laptop into a powerful triple-monitor setup.
              </p>
            </div>

            {/* Block 2: Multitasking & Connection */}
            <div className="pl-4 border-l-4 border-indigo-100 hover:border-indigo-500 transition-colors duration-300 space-y-3">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Cable className="text-[#2a337b]" size={22} />
                Seamless Connectivity
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Imagine effortlessly cross-referencing documents, monitoring
                data streams, and engaging in video conferences simultaneously.
                The simplified{" "}
                <span className="bg-indigo-50 text-indigo-700 px-1 rounded font-medium">
                  one-cable connection
                </span>{" "}
                for both Mac and Windows operating systems ensures a hassle-free
                setup, allowing you to establish your expanded workstation in
                seconds.
              </p>
            </div>

            {/* Block 3: Conclusion */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="text-emerald-500" size={22} />
                Competitive Edge
              </h3>
              <p className="text-slate-600 leading-relaxed">
                By eliminating the constraints of a single screen, this portable
                triple monitor empowers you to optimize your workflow, reduce
                inefficiencies, and ultimately, achieve a higher level of
                productivity. It is an essential investment for any professional
                looking to gain a competitive edge.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-8 rounded-lg shadow-lg shadow-slate-900/20 transition-all duration-300 transform hover:-translate-y-1">
                Upgrade Your Workflow
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
