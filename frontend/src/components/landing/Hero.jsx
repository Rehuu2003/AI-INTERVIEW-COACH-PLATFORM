import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Brain,
  Sparkles,
  ArrowRight,
  Play,
} from "lucide-react";

import {
  fadeLeft,
  fadeRight,
  staggerContainer,
} from "../../utils/animations";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] px-6 pt-32 pb-24 flex items-center">
      
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_30%)]" />

      {/* GRID */}

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* GLOWS */}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-cyan-500/10 blur-[180px]" />

      <div className="absolute top-40 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[120px]" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />

      {/* MAIN */}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto relative z-10 w-full"
      >
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-20 items-center">
          
          {/* LEFT SIDE */}

          <motion.div variants={fadeLeft}>
            
            {/* BADGE */}

            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-xl mb-10">
              
              <Sparkles
                size={18}
                className="text-cyan-400"
              />

              <span className="text-sm text-cyan-300 font-medium">
                AI-Powered Interview Intelligence
              </span>
            </div>

            {/* TITLE */}

            <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight text-white mb-8">
              
              Crack your
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                {" "}
                dream job
              </span>
              <br />
              with AI coaching.
            </h1>

            {/* DESCRIPTION */}

            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-2xl mb-12">
              Practice smarter using advanced AI simulations,
              realtime feedback, communication analysis,
              and intelligent performance tracking.
            </p>

            {/* BUTTONS */}

            <div className="flex flex-col sm:flex-row gap-5 mb-14">
              
              <Link to="/signup">
                <button className="group h-16 px-9 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-black text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_50px_rgba(34,211,238,0.25)] flex items-center gap-3">
                  
                  Start Free

                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition"
                  />
                </button>
              </Link>

              <button className="h-16 px-8 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl text-white font-semibold text-lg hover:bg-white/[0.07] transition-all duration-300 flex items-center gap-3">
                
                <Play size={18} />

                Watch Demo
              </button>
            </div>

            {/* STATS */}

            <div className="flex flex-wrap gap-10">
              
              {[
                {
                  value: "50K+",
                  label: "AI Interviews",
                },

                {
                  value: "95%",
                  label: "Success Rate",
                },

                {
                  value: "24/7",
                  label: "Realtime Feedback",
                },
              ].map((item, index) => (
                <div key={index}>
                  
                  <h3 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
                    {item.value}
                  </h3>

                  <p className="text-gray-400 text-lg">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE */}

          <motion.div
            variants={fadeRight}
            className="relative flex justify-center"
          >
            
            {/* BACK GLOW */}

            <div className="absolute inset-0 bg-cyan-500/10 blur-[120px]" />

            {/* FLOATING ORB */}

            <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-purple-500/20 blur-[80px]" />

            {/* MAIN PANEL */}

            <div className="relative w-full max-w-[700px] rounded-[42px] border border-white/10 bg-gradient-to-br from-[#081120] via-[#0b1220] to-[#111827] backdrop-blur-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.45)]">
              
              {/* TOP BAR */}

              <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
                
                <div className="flex items-center gap-4">
                  
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shadow-[0_0_35px_rgba(34,211,238,0.35)]">
                    
                    <Brain
                      size={28}
                      className="text-black"
                    />
                  </div>

                  <div>
                    
                    <h3 className="text-2xl font-black text-white">
                      AI Interview Intelligence
                    </h3>

                    <p className="text-gray-400">
                      Realtime analysis engine
                    </p>
                  </div>
                </div>

                <div className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold">
                  LIVE
                </div>
              </div>

              {/* MAIN CONTENT */}

              <div className="p-8">
                
                {/* TOP SCORE */}

                <div className="flex items-end justify-between mb-10">
                  
                  <div>
                    
                    <p className="text-gray-400 mb-3">
                      Overall Interview Score
                    </p>

                    <h1 className="text-7xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent leading-none">
                      94%
                    </h1>
                  </div>

                  <div className="text-right">
                    
                    <p className="text-emerald-400 text-lg font-bold mb-2">
                      +28% Improvement
                    </p>

                    <p className="text-gray-500">
                      Compared to last session
                    </p>
                  </div>
                </div>

                {/* WAVEFORM */}

                <div className="relative h-[220px] rounded-[30px] border border-white/5 bg-black/20 overflow-hidden mb-8">
                  
                  {/* INNER GLOW */}

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_30%)]" />

                  {/* BARS */}

                  <div className="absolute bottom-10 left-8 right-8 flex items-end gap-3 h-32">
                    
                    {[30, 55, 42, 75, 60, 48, 82, 50, 65, 40, 72, 55].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-full bg-gradient-to-t from-cyan-400 to-purple-500 shadow-[0_0_20px_rgba(34,211,238,0.35)]"
                          style={{
                            height: `${height}%`,
                          }}
                        />
                      )
                    )}
                  </div>

                  {/* LINE */}

                  <svg
                    viewBox="0 0 500 120"
                    className="absolute bottom-0 left-0 w-full h-32"
                  >
                    <path
                      d="M0 90 C60 40 120 110 180 70 C240 30 300 100 360 55 C420 20 460 80 500 35"
                      stroke="url(#gradient)"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />

                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#22d3ee"
                        />

                        <stop
                          offset="100%"
                          stopColor="#a855f7"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* METRICS */}

                <div className="grid grid-cols-3 gap-4">
                  
                  {[
                    {
                      title: "Communication",
                      value: "94%",
                    },

                    {
                      title: "Technical",
                      value: "91%",
                    },

                    {
                      title: "Confidence",
                      value: "89%",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-white/5 bg-white/[0.03] p-5"
                    >
                      
                      <p className="text-gray-400 text-sm mb-3">
                        {item.title}
                      </p>

                      <h3 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                        {item.value}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;