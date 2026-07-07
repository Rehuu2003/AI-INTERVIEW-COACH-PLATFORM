import { motion } from "framer-motion";

import { defaultUser } from "../data/defaultUser";

import {
  Brain,
  TrendingUp,
  Mic,
  BarChart3,
  Clock3,
  Sparkles,
  ArrowUpRight,
  Activity,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";

const stats = [
  {
    title: "AI Score",
    value: "94%",
    icon: Brain,
    color: "from-cyan-400 to-blue-500",
  },

  {
    title: "Interviews",
    value: "128",
    icon: Mic,
    color: "from-purple-500 to-pink-500",
  },

  {
    title: "Growth",
    value: "+18%",
    icon: TrendingUp,
    color: "from-emerald-400 to-green-500",
  },

  {
    title: "Analytics",
    value: "Live",
    icon: BarChart3,
    color: "from-orange-400 to-red-500",
  },
];

const interviews = [
  {
    role: "Frontend Developer",
    company: "Google",
    score: "95%",
    time: "2h ago",
  },

  {
    role: "Backend Engineer",
    company: "Amazon",
    score: "91%",
    time: "Yesterday",
  },

  {
    role: "Full Stack Developer",
    company: "Microsoft",
    score: "93%",
    time: "2 days ago",
  },
];

const Dashboard = () => {
  const storedUser =
    typeof window !== "undefined"
      ? localStorage.getItem("aiUser")
      : null;

  const user = storedUser
    ? JSON.parse(storedUser)
    : defaultUser;

  return (
    <div className="space-y-8">
      
      {/* HERO CARD */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#081120] via-[#0b1220] to-[#111827] p-10"
      >
        
        {/* GLOW */}

        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px]" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          
          {/* LEFT */}

          <div>
            
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 mb-8">
              
              <Sparkles
                size={16}
                className="text-cyan-400"
              />

              <span className="text-cyan-300 text-sm font-medium">
                AI Workspace Active
              </span>
            </div>

            <h1 className="text-5xl font-black text-white leading-tight mb-6">
              
              Welcome back,
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {" "}
                {user.name || "Candidate"}
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed mb-10">
              Your interview intelligence system is tracking
              performance, confidence, and realtime AI insights.
            </p>

            <div className="flex flex-wrap gap-5">
              
              <button className="h-16 px-8 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-black hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(34,211,238,0.25)]">
                Start AI Interview
              </button>

              <button className="h-16 px-8 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl text-white font-semibold hover:bg-white/[0.06] transition">
                View Analytics
              </button>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative w-full max-w-[340px]">
            
            <div className="rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8">
              
              <div className="flex items-center justify-between mb-10">
                
                <div>
                  
                  <p className="text-gray-400 mb-2">
                    Current AI Score
                  </p>

                  <h2 className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    94%
                  </h2>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                  
                  <Brain
                    size={30}
                    className="text-black"
                  />
                </div>
              </div>

              {/* MINI GRAPH */}

              <div className="flex items-end gap-3 h-28">
                
                {[35, 50, 42, 68, 58, 80, 72].map(
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

              <div className="mt-8 flex items-center justify-between text-sm">
                
                <span className="text-emerald-400 font-semibold">
                  +18% this week
                </span>

                <span className="text-gray-500">
                  Updated live
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              className="rounded-[30px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-7 relative overflow-hidden"
            >
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[80px]" />

              <div className="relative z-10">
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-8`}>
                  
                  <Icon
                    size={30}
                    className="text-black"
                  />
                </div>

                <p className="text-gray-400 mb-3">
                  {item.title}
                </p>

                <h3 className="text-5xl font-black text-white">
                  {item.value}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* MAIN GRID */}

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
        
        {/* PERFORMANCE */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-[36px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-8"
        >
          
          <div className="flex items-center justify-between mb-12">
            
            <div>
              
              <h3 className="text-3xl font-black text-white mb-2">
                Performance Analytics
              </h3>

              <p className="text-gray-400">
                Realtime AI performance tracking
              </p>
            </div>

            <div className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold">
              LIVE
            </div>
          </div>

          {/* CHART */}

          <div className="relative h-[320px] rounded-[28px] border border-white/5 bg-black/20 overflow-hidden">
            
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_30%)]" />

            {/* LINE */}

            <svg
              viewBox="0 0 600 300"
              className="absolute inset-0 w-full h-full"
            >
              <path
                d="M0 220 C80 160 140 250 220 180 C300 110 360 230 430 140 C500 60 560 170 600 100"
                stroke="url(#lineGradient)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />

              <defs>
                <linearGradient
                  id="lineGradient"
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

            {/* FLOATING DOTS */}

            {[
              "top-[58%] left-[12%]",
              "top-[48%] left-[28%]",
              "top-[38%] left-[44%]",
              "top-[28%] left-[60%]",
              "top-[20%] left-[78%]",
            ].map((position, index) => (
              <div
                key={index}
                className={`absolute ${position} w-5 h-5 rounded-full bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.8)]`}
              />
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE */}

        <div className="space-y-8">
          
          {/* AI INSIGHTS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-[36px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-8"
          >
            
            <div className="flex items-center gap-4 mb-10">
              
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                
                <Brain
                  size={28}
                  className="text-white"
                />
              </div>

              <div>
                
                <h3 className="text-2xl font-black text-white">
                  AI Insights
                </h3>

                <p className="text-gray-400">
                  Smart interview recommendations
                </p>
              </div>
            </div>

            <div className="space-y-6">
              
              {[
                "Communication clarity improved by 18%",
                "Technical explanations are more structured",
                "Confidence score increased in mock interviews",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4"
                >
                  
                  <CheckCircle2
                    size={22}
                    className="text-emerald-400 mt-1"
                  />

                  <p className="text-gray-300 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* QUICK ACTION */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-[36px] border border-cyan-500/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-8 relative overflow-hidden"
          >
            
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-[80px]" />

            <div className="relative z-10">
              
              <PlayCircle
                size={42}
                className="text-cyan-400 mb-8"
              />

              <h3 className="text-3xl font-black text-white mb-5">
                Resume Practice
              </h3>

              <p className="text-gray-300 leading-relaxed mb-8">
                Continue your latest AI mock interview session
                and improve communication confidence.
              </p>

              <button className="w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-black hover:scale-[1.02] transition">
                Continue Session
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* RECENT INTERVIEWS */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="rounded-[36px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-8"
      >
        
        <div className="flex items-center justify-between mb-10">
          
          <div>
            
            <h3 className="text-3xl font-black text-white mb-2">
              Recent Interviews
            </h3>

            <p className="text-gray-400">
              Your latest AI interview sessions
            </p>
          </div>

          <button className="flex items-center gap-2 text-cyan-400 font-semibold hover:gap-3 transition-all">
            
            View All

            <ArrowUpRight size={18} />
          </button>
        </div>

        <div className="space-y-5">
          
          {interviews.map((item, index) => (
            <div
              key={index}
              className="rounded-[24px] border border-white/5 bg-white/[0.03] p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5 hover:bg-white/[0.05] transition"
            >
              
              <div className="flex items-center gap-5">
                
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                  
                  <Mic
                    size={28}
                    className="text-black"
                  />
                </div>

                <div>
                  
                  <h4 className="text-2xl font-bold text-white mb-1">
                    {item.role}
                  </h4>

                  <p className="text-gray-400">
                    {item.company}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-10">
                
                <div>
                  
                  <p className="text-gray-500 text-sm mb-1">
                    AI Score
                  </p>

                  <h4 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {item.score}
                  </h4>
                </div>

                <div className="flex items-center gap-3 text-gray-400">
                  
                  <Clock3 size={18} />

                  {item.time}
                </div>

                <button className="h-12 px-6 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition font-semibold">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ACTIVITY */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="rounded-[36px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-8"
      >
        
        <div className="flex items-center gap-4 mb-10">
          
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
            
            <Activity
              size={28}
              className="text-black"
            />
          </div>

          <div>
            
            <h3 className="text-3xl font-black text-white">
              Live Activity
            </h3>

            <p className="text-gray-400">
              Realtime AI workspace updates
            </p>
          </div>
        </div>

        <div className="space-y-6">
          
          {[
            "AI completed communication analysis",
            "New mock interview generated successfully",
            "Confidence score improved by 6%",
            "Technical evaluation updated in analytics",
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-5 rounded-2xl border border-white/5 bg-white/[0.03] p-5"
            >
              
              <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />

              <p className="text-gray-300 flex-1">
                {item}
              </p>

              <span className="text-gray-500 text-sm">
                Just now
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;