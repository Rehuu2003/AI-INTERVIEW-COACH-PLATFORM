import { motion } from "framer-motion";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

import {
  BrainCircuit,
  Trophy,
  Activity,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Flame,
  Award,
  Clock3,
  Target,
} from "lucide-react";

import { generateAnalytics } from "../utils/generateAnalytics";

import InterviewReport from "../analytics/InterviewReport";

const Analytics = () => {
  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  const role =
    user.role || "frontend";

  const analytics =
    generateAnalytics(role);

  const averageScore = Math.floor(
    analytics.skills.reduce(
      (acc, item) =>
        acc + item.score,
      0
    ) / analytics.skills.length
  );

  const performanceData = [
    {
      day: "Mon",
      score: 68,
    },

    {
      day: "Tue",
      score: 74,
    },

    {
      day: "Wed",
      score: 81,
    },

    {
      day: "Thu",
      score: 79,
    },

    {
      day: "Fri",
      score: 88,
    },

    {
      day: "Sat",
      score: 91,
    },

    {
      day: "Sun",
      score: 95,
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden p-6 lg:p-10">
      
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_30%)]" />

      {/* GRID */}

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 max-w-[1700px] mx-auto">
        
        {/* HERO */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-[40px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 lg:p-10 mb-8 overflow-hidden relative"
        >
          
          {/* GLOW */}

          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px]" />

          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">
            
            {/* LEFT */}

            <div>
              
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-sm font-semibold mb-6">
                
                <Sparkles size={15} />

                AI Performance Analytics
              </div>

              <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-6">
                
                Enterprise
                <br />

                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Analytics
                </span>
              </h1>

              <p className="text-gray-400 text-xl max-w-3xl leading-relaxed">
                AI-powered analytics dashboard
                personalized for your{" "}
                {role === "aiml"
                  ? "AI / ML"
                  : role}{" "}
                interview preparation journey.
              </p>
            </div>

            {/* SCORE */}

            <div className="relative">
              
              <div className="absolute inset-0 bg-cyan-500/20 blur-[80px]" />

              <div className="relative w-[320px] h-[320px] rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-2xl flex flex-col items-center justify-center">
                
                <p className="text-gray-400 mb-4">
                  AI Readiness Score
                </p>

                <h2 className="text-8xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {averageScore}
                </h2>

                <p className="text-cyan-400 font-semibold mt-4">
                  Excellent Performance
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* STATS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          
          {[
            {
              title: "Communication",
              value: "94%",
              icon: Activity,
            },

            {
              title: "Confidence",
              value: "91%",
              icon: ShieldCheck,
            },

            {
              title: "Consistency",
              value: "89%",
              icon: TrendingUp,
            },

            {
              title: "AI Rating",
              value: "A+",
              icon: Trophy,
            },
          ].map((item, index) => {
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
                className="rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-7"
              >
                
                <div className="flex items-center justify-between mb-6">
                  
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                    
                    <Icon
                      size={28}
                      className="text-black"
                    />
                  </div>

                  <span className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {item.value}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-400">
                  AI evaluated performance metrics.
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* MAIN GRID */}

        <div className="grid xl:grid-cols-[1fr_420px] gap-8 mb-8">
          
          {/* RADAR */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8"
          >
            
            <div className="flex items-center gap-4 mb-10">
              
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                
                <BrainCircuit
                  size={30}
                  className="text-black"
                />
              </div>

              <div>
                
                <h2 className="text-3xl font-black">
                  Skill Intelligence
                </h2>

                <p className="text-gray-400">
                  AI breakdown of technical
                  capabilities.
                </p>
              </div>
            </div>

            <div className="h-[520px]">
              
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                
                <RadarChart
                  data={analytics.skills}
                >
                  
                  <PolarGrid
                    stroke="rgba(255,255,255,0.1)"
                  />

                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{
                      fill: "#d1d5db",
                      fontSize: 14,
                    }}
                  />

                  <Radar
                    dataKey="score"
                    stroke="#22d3ee"
                    fill="#22d3ee"
                    fillOpacity={0.35}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* SIDE */}

          <div className="space-y-8">
            
            {/* STREAK */}

            <div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-2xl p-8">
              
              <div className="flex items-center justify-between mb-8">
                
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
                  
                  <Flame
                    size={30}
                    className="text-black"
                  />
                </div>

                <span className="text-5xl font-black text-orange-400">
                  14
                </span>
              </div>

              <h3 className="text-3xl font-black mb-3">
                Day Streak
              </h3>

              <p className="text-gray-300 leading-relaxed">
                You're consistently improving
                every day with AI-powered mock
                interviews.
              </p>
            </div>

            {/* ACHIEVEMENTS */}

            <div className="rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8">
              
              <div className="flex items-center gap-4 mb-8">
                
                <Award
                  size={32}
                  className="text-cyan-400"
                />

                <h3 className="text-3xl font-black">
                  Achievements
                </h3>
              </div>

              <div className="space-y-4">
                
                {[
                  "Top 5% Performer",
                  "AI Excellence Badge",
                  "Communication Master",
                  "Technical Expert",
                ].map((badge, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/5 bg-white/[0.03] px-5 py-4 flex items-center justify-between"
                  >
                    
                    <span>{badge}</span>

                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                      
                      <Trophy
                        size={18}
                        className="text-black"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM GRID */}

        <div className="grid xl:grid-cols-2 gap-8">
          
          {/* PERFORMANCE GRAPH */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-[36px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8"
          >
            
            <div className="flex items-center gap-4 mb-10">
              
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                
                <TrendingUp
                  size={30}
                  className="text-black"
                />
              </div>

              <div>
                
                <h2 className="text-3xl font-black">
                  Weekly Growth
                </h2>

                <p className="text-gray-400">
                  Performance progression over
                  time.
                </p>
              </div>
            </div>

            <div className="h-[320px]">
              
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                
                <AreaChart
                  data={performanceData}
                >
                  
                  <defs>
                    
                    <linearGradient
                      id="colorScore"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      
                      <stop
                        offset="0%"
                        stopColor="#22d3ee"
                        stopOpacity={0.7}
                      />

                      <stop
                        offset="100%"
                        stopColor="#22d3ee"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <XAxis
                    dataKey="day"
                    stroke="#9ca3af"
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#22d3ee"
                    fillOpacity={1}
                    fill="url(#colorScore)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* AI FEEDBACK */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-[36px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-2xl p-8"
          >
            
            <div className="flex items-center gap-4 mb-10">
              
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                
                <Target
                  size={30}
                  className="text-black"
                />
              </div>

              <div>
                
                <h2 className="text-3xl font-black">
                  AI Recommendations
                </h2>

                <p className="text-gray-300">
                  Personalized improvement roadmap.
                </p>
              </div>
            </div>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                
                <h4 className="text-xl font-bold text-white mb-2">
                  Strengths
                </h4>

                <p>
                  Excellent communication and
                  technical confidence during
                  interviews.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                
                <h4 className="text-xl font-bold text-white mb-2">
                  Improvements
                </h4>

                <p>
                  Focus more on advanced
                  optimization strategies and
                  architecture-level concepts.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                
                <h4 className="text-xl font-bold text-white mb-2">
                  AI Suggestion
                </h4>

                <p>
                  Continue practicing advanced
                  scenario-based questions to
                  improve problem-solving speed.
                </p>
              </div>

              <div className="flex items-center gap-3 text-cyan-400 font-semibold pt-2">
                
                <Clock3 size={18} />

                Updated 2 minutes ago by AI
                engine
              </div>
            </div>
            <div className="mt-8">
  
             <InterviewReport
               role={role}
              averageScore={averageScore}
           />
          </div>
          </motion.div>
        </div>
      </div>
    </div>
    
  );
};

export default Analytics;