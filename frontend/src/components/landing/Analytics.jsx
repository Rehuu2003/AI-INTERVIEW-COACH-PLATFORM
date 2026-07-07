import { motion } from "framer-motion";

import {
  BarChart3,
  TrendingUp,
  Brain,
  Activity,
  Sparkles,
} from "lucide-react";

import {
  fadeUp,
  staggerContainer,
} from "../../utils/animations";

const Analytics = () => {
  return (
    <section
      id="analytics"
      className="relative py-32 px-6 overflow-hidden bg-[#050816]"
    >
      
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_30%)]" />

      {/* GRID */}

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10"
      >
        
        {/* HEADER */}

        <motion.div
          variants={fadeUp}
          className="text-center mb-24"
        >
          
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-xl mb-8">
            
            <Sparkles
              size={18}
              className="text-cyan-400"
            />

            <span className="text-sm text-cyan-300 font-medium">
              AI Performance Analytics
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
            
            Deep interview
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {" "}
              intelligence
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Advanced AI tracks communication clarity,
            confidence, technical depth, and realtime
            performance growth.
          </p>
        </motion.div>

        {/* GRID */}

        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8">
          
          {/* LEFT LARGE CARD */}

          <motion.div
            variants={fadeUp}
            className="relative rounded-[40px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-10 overflow-hidden"
          >
            
            {/* GLOW */}

            <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-[100px]" />

            {/* TOP */}

            <div className="flex items-center justify-between mb-14 relative z-10">
              
              <div>
                
                <div className="flex items-center gap-4 mb-4">
                  
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                    
                    <BarChart3
                      size={28}
                      className="text-black"
                    />
                  </div>

                  <div>
                    
                    <h3 className="text-3xl font-black text-white">
                      Live Analytics
                    </h3>

                    <p className="text-gray-400">
                      AI-powered performance tracking
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-sm">
                LIVE
              </div>
            </div>

            {/* CHART */}

            <div className="relative h-[320px] rounded-[30px] border border-white/5 bg-black/20 overflow-hidden mb-10">
              
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.15),transparent_30%)]" />

              {/* BARS */}

              <div className="absolute bottom-14 left-10 right-10 flex items-end gap-5 h-48">
                
                {[35, 58, 44, 78, 67, 52, 88].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-[20px] bg-gradient-to-t from-cyan-400 to-purple-500 relative shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                      style={{
                        height: `${height}%`,
                      }}
                    >
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
                    </div>
                  )
                )}
              </div>

              {/* LABELS */}

              <div className="absolute bottom-6 left-10 right-10 flex justify-between text-gray-500 text-sm">
                
                {[
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                  "Today",
                ].map((day) => (
                  <span key={day}>
                    {day}
                  </span>
                ))}
              </div>
            </div>

            {/* STATS */}

            <div className="grid md:grid-cols-3 gap-5 relative z-10">
              
              {[
                {
                  label: "Interviews",
                  value: "1,248",
                },

                {
                  label: "AI Sessions",
                  value: "50K+",
                },

                {
                  label: "Success Rate",
                  value: "95%",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/5 bg-white/[0.03] p-6"
                >
                  
                  <p className="text-gray-400 mb-3">
                    {item.label}
                  </p>

                  <h4 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {item.value}
                  </h4>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE */}

          <div className="flex flex-col gap-8">
            
            {/* SCORE CARD */}

            <motion.div
              variants={fadeUp}
              className="rounded-[35px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-8"
            >
              
              <div className="flex items-center gap-4 mb-8">
                
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  
                  <Brain
                    size={26}
                    className="text-white"
                  />
                </div>

                <div>
                  
                  <h3 className="text-2xl font-black text-white">
                    AI Score Analysis
                  </h3>

                  <p className="text-gray-400">
                    Deep interview evaluation
                  </p>
                </div>
              </div>

              <div className="space-y-7">
                
                {[
                  ["Communication", "94%"],
                  ["Technical Accuracy", "91%"],
                  ["Confidence", "89%"],
                  ["Problem Solving", "96%"],
                ].map(([label, value], index) => (
                  <div key={index}>
                    
                    <div className="flex justify-between mb-3">
                      
                      <span className="text-white font-semibold">
                        {label}
                      </span>

                      <span className="text-cyan-400 font-bold">
                        {value}
                      </span>
                    </div>

                    <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                      
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                        style={{
                          width: value,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* BOTTOM CARDS */}

            <div className="grid grid-cols-2 gap-6">
              
              <motion.div
                variants={fadeUp}
                className="rounded-[30px] border border-emerald-500/10 bg-gradient-to-br from-emerald-500/10 to-transparent p-6"
              >
                
                <Activity
                  size={28}
                  className="text-emerald-400 mb-6"
                />

                <h4 className="text-2xl font-black text-white mb-4">
                  AI Feedback
                </h4>

                <p className="text-gray-300 leading-relaxed">
                  Strong technical explanation with confident delivery detected.
                </p>

                <div className="mt-8 text-emerald-400 font-semibold">
                  Communication improved
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="rounded-[30px] border border-cyan-500/10 bg-gradient-to-br from-cyan-500/10 to-transparent p-6"
              >
                
                <TrendingUp
                  size={28}
                  className="text-cyan-400 mb-6"
                />

                <h4 className="text-2xl font-black text-white mb-4">
                  Growth
                </h4>

                <div className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
                  +18%
                </div>

                <p className="text-gray-400">
                  Communication clarity improved this week.
                </p>

                {/* MINI BARS */}

                <div className="flex items-end gap-2 h-20 mt-8">
                  
                  {[20, 28, 25, 35, 42, 50, 58].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-full bg-gradient-to-t from-cyan-400 to-purple-500"
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    )
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Analytics;