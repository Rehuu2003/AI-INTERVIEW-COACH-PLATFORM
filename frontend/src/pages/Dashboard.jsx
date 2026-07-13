import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Brain, TrendingUp, Mic, BarChart3, Clock3, Sparkles,
  ArrowUpRight, Activity, CheckCircle2, PlayCircle,
} from "lucide-react";

const recentInterviews = [
  { role: "Frontend Developer", company: "Practice Session", score: "95%", time: "2h ago" },
  { role: "Backend Engineer", company: "Practice Session", score: "91%", time: "Yesterday" },
  { role: "Full Stack Developer", company: "Practice Session", score: "93%", time: "2 days ago" },
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const displayName = user?.name || "Candidate";
  const initial = displayName.charAt(0).toUpperCase();

  const stats = [
    { title: "AI Score", value: "94%", icon: Brain, color: "from-cyan-400 to-blue-500" },
    { title: "Interviews", value: "0", icon: Mic, color: "from-purple-500 to-pink-500" },
    { title: "Growth", value: "+0%", icon: TrendingUp, color: "from-emerald-400 to-green-500" },
    { title: "Analytics", value: "Live", icon: BarChart3, color: "from-orange-400 to-red-500" },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-8">

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#081120] via-[#0b1220] to-[#111827] p-8 lg:p-10"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/8 blur-[120px] pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 mb-6">
              <Sparkles size={14} className="text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium">AI Workspace Active</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {displayName}
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl leading-relaxed mb-8">
              Your AI interview coach is ready. Practice, get scored, and track your growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/dashboard/interview")}
                className="h-14 px-8 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold hover:scale-105 transition-all"
              >
                Start AI Interview
              </button>
              <button
                onClick={() => navigate("/dashboard/analytics")}
                className="h-14 px-8 rounded-2xl border border-white/10 bg-white/[0.04] text-white font-medium hover:bg-white/[0.07] transition"
              >
                View Analytics
              </button>
            </div>
          </div>

          {/* Score card */}
          <div className="w-full max-w-[300px] rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 shrink-0">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-gray-400 text-sm mb-1">Current Score</p>
                <h2 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">94%</h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                <Brain size={26} className="text-black" />
              </div>
            </div>
            <div className="flex items-end gap-2 h-20">
              {[35, 50, 42, 68, 58, 80, 72].map((h, i) => (
                <div key={i} className="flex-1 rounded-full bg-gradient-to-t from-cyan-400 to-purple-500" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="text-emerald-400 font-semibold">+18% this week</span>
              <span className="text-gray-500">Updated live</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* STATS */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-[26px] border border-white/10 bg-white/[0.03] p-6"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-6`}>
                <Icon size={26} className="text-black" />
              </div>
              <p className="text-gray-400 text-sm mb-2">{item.title}</p>
              <h3 className="text-4xl font-black text-white">{item.value}</h3>
            </motion.div>
          );
        })}
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8">

        {/* Performance chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Performance Trend</h3>
              <p className="text-gray-400 text-sm">AI interview scoring over time</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">LIVE</span>
          </div>
          <div className="relative h-[260px] rounded-[22px] border border-white/5 bg-black/20 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.10),transparent_30%)]" />
            <svg viewBox="0 0 600 260" className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <path d="M0 200 C80 150 140 220 220 160 C300 100 360 210 430 130 C500 55 560 155 600 90"
                stroke="url(#lg1)" strokeWidth="5" fill="none" strokeLinecap="round" />
            </svg>
            {["top-[60%] left-[10%]", "top-[47%] left-[27%]", "top-[37%] left-[44%]", "top-[28%] left-[62%]", "top-[20%] left-[80%]"].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]`} />
            ))}
          </div>
        </motion.div>

        {/* Right column */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-7"
          >
            <div className="flex items-center gap-4 mb-7">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Brain size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AI Insights</h3>
                <p className="text-gray-400 text-sm">Smart recommendations</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                "Complete your first interview to get insights",
                "Practice daily to build confidence",
                "Review feedback after each session",
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-[32px] border border-cyan-500/15 bg-gradient-to-br from-cyan-500/8 to-purple-500/8 p-7 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[60px]" />
            <div className="relative z-10">
              <PlayCircle size={36} className="text-cyan-400 mb-5" />
              <h3 className="text-xl font-bold mb-3">Ready to practice?</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">Start a mock interview session and get real-time AI feedback.</p>
              <button
                onClick={() => navigate("/dashboard/interview")}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold hover:scale-[1.02] transition"
              >
                Start Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recent Interviews */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-8"
      >
        <div className="flex items-center justify-between mb-7">
          <div>
            <h3 className="text-2xl font-bold mb-1">Recent Sessions</h3>
            <p className="text-gray-400 text-sm">Your latest AI interview sessions</p>
          </div>
          <button className="flex items-center gap-2 text-cyan-400 text-sm font-medium hover:gap-3 transition-all">
            View All <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="space-y-4">
          {recentInterviews.map((item, i) => (
            <div key={i} className="rounded-[20px] border border-white/5 bg-white/[0.02] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-white/[0.04] transition">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shrink-0">
                  <Mic size={22} className="text-black" />
                </div>
                <div>
                  <h4 className="font-semibold">{item.role}</h4>
                  <p className="text-gray-400 text-sm">{item.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-gray-500 text-xs mb-1">Score</p>
                  <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">{item.score}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Clock3 size={15} /> {item.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Activity feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-8"
      >
        <div className="flex items-center gap-4 mb-7">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
            <Activity size={24} className="text-black" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Activity</h3>
            <p className="text-gray-400 text-sm">Your workspace updates</p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            "Account created successfully — welcome to InterviewIQ",
            "AI interviewer is ready for your first session",
            "Complete an interview to unlock analytics",
            "Explore resume analysis in the Resume tab",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)] shrink-0" />
              <p className="text-gray-300 text-sm flex-1">{item}</p>
              <span className="text-gray-500 text-xs shrink-0">Now</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
