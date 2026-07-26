import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Brain, TrendingUp, Mic, BarChart3, Clock3, Sparkles,
  ArrowUpRight, Activity, CheckCircle2, PlayCircle, Loader2,
} from "lucide-react";
import {
  fetchAnalyticsSummary,
  fetchProgress,
  fetchHistory,
  fetchWeaknesses,
} from "../services/analyticsService";
import { formatTimeAgo, calcWeeklyGrowth, areaLabel } from "../utils/formatters";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [trend, setTrend] = useState([]);
  const [history, setHistory] = useState([]);
  const [weaknesses, setWeaknesses] = useState(null);

  const displayName = user?.name || "Candidate";
  const avgScore = summary?.averageScores?.overall ?? user?.averageScore ?? 0;
  const totalCompleted = summary?.counts?.completed ?? user?.totalInterviews ?? 0;
  const growth = calcWeeklyGrowth(trend);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [sum, prog, hist, weak] = await Promise.all([
          fetchAnalyticsSummary(),
          fetchProgress(12),
          fetchHistory(5),
          fetchWeaknesses(),
        ]);
        if (!cancelled) {
          setSummary(sum);
          setTrend(prog);
          setHistory(hist);
          setWeaknesses(weak);
        }
      } catch {
        /* empty state */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const stats = [
    { title: "AI Score", value: totalCompleted ? `${avgScore}%` : "—", icon: Brain, color: "from-cyan-400 to-blue-500" },
    { title: "Interviews", value: String(totalCompleted), icon: Mic, color: "from-purple-500 to-pink-500" },
    { title: "Growth", value: trend.length >= 2 ? `${growth >= 0 ? "+" : ""}${growth}%` : "—", icon: TrendingUp, color: "from-emerald-400 to-green-500" },
    { title: "In progress", value: String(summary?.counts?.inProgress ?? 0), icon: BarChart3, color: "from-orange-400 to-red-500" },
  ];

  const trendHeights = trend.length
    ? trend.map((p) => Math.max(12, p.overallScore || 0))
    : [0];

  const insightItems = weaknesses?.commonWeaknesses?.length
    ? weaknesses.commonWeaknesses.slice(0, 3).map((w) => w.text)
    : weaknesses?.weakAreas?.length
      ? weaknesses.weakAreas.slice(0, 3).map((w) => `Improve ${areaLabel(w.area)} (avg ${w.averageScore}%)`)
      : [
          "Complete your first interview to unlock AI insights",
          "Practice regularly to track score trends",
          "Review feedback after each session",
        ];

  const activityItems = history.length
    ? history.map((iv) => ({
        text: `Completed ${iv.topic} — scored ${iv.overallScore}%`,
        time: formatTimeAgo(iv.completedAt),
      }))
    : [
        { text: "Account ready — start your first mock interview", time: "Now" },
        { text: "Upload a resume for ATS analysis", time: "Tip" },
      ];

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-cyan-400" size={36} />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#081120] via-[#0b1220] to-[#111827] p-8 lg:p-10"
      >
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 mb-6">
              <Sparkles size={14} className="text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium">Your workspace</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {displayName}
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl leading-relaxed mb-8">
              Stats below come from your completed interviews stored in MongoDB.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard/interview")}
                className="h-14 px-8 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold hover:scale-105 transition-all"
              >
                Start AI Interview
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard/analytics")}
                className="h-14 px-8 rounded-2xl border border-white/10 bg-white/[0.04] text-white font-medium hover:bg-white/[0.07] transition"
              >
                View Analytics
              </button>
            </div>
          </div>

          <div className="w-full max-w-[300px] rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 shrink-0">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-gray-400 text-sm mb-1">Average score</p>
                <h2 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {totalCompleted ? `${avgScore}%` : "—"}
                </h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                <Brain size={26} className="text-black" />
              </div>
            </div>
            <div className="flex items-end gap-2 h-20">
              {trendHeights.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-full bg-gradient-to-t from-cyan-400 to-purple-500"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="text-emerald-400 font-semibold">
                {trend.length >= 2 ? `${growth >= 0 ? "+" : ""}${growth}% recent trend` : "No trend yet"}
              </span>
              <span className="text-gray-500">Live from API</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
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

      <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-1">Performance trend</h3>
          <p className="text-gray-400 text-sm mb-8">Scores from completed sessions</p>
          {trend.length === 0 ? (
            <p className="text-gray-500 py-16 text-center">Complete an interview to see your trend.</p>
          ) : (
            <div className="space-y-3">
              {trend.map((point, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-gray-500 text-sm w-8">#{point.index}</span>
                  <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                      style={{ width: `${point.overallScore || 0}%` }}
                    />
                  </div>
                  <span className="text-white font-semibold w-12 text-right">{point.overallScore}%</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-7"
          >
            <h3 className="text-xl font-bold mb-4">AI insights</h3>
            <div className="space-y-4">
              {insightItems.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle2 size={18} className="text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-[32px] border border-cyan-500/15 bg-gradient-to-br from-cyan-500/8 to-purple-500/8 p-7"
          >
            <PlayCircle size={36} className="text-cyan-400 mb-5" />
            <h3 className="text-xl font-bold mb-3">Ready to practice?</h3>
            <button
              type="button"
              onClick={() => navigate("/dashboard/interview")}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold"
            >
              Start Now
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-8"
      >
        <div className="flex items-center justify-between mb-7">
          <div>
            <h3 className="text-2xl font-bold mb-1">Recent sessions</h3>
            <p className="text-gray-400 text-sm">From your interview history</p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/dashboard/analytics")}
            className="flex items-center gap-2 text-cyan-400 text-sm font-medium"
          >
            View All <ArrowUpRight size={16} />
          </button>
        </div>
        {history.length === 0 ? (
          <p className="text-gray-500">No completed interviews yet.</p>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item._id}
                className="rounded-[20px] border border-white/5 bg-white/[0.02] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shrink-0">
                    <Mic size={22} className="text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.topic}</h4>
                    <p className="text-gray-400 text-sm capitalize">{item.type} · {item.difficulty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    {item.overallScore}%
                  </span>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Clock3 size={15} /> {formatTimeAgo(item.completedAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-8"
      >
        <div className="flex items-center gap-4 mb-7">
          <Activity size={24} className="text-orange-400" />
          <h3 className="text-2xl font-bold">Activity</h3>
        </div>
        <div className="space-y-4">
          {activityItems.map((item, i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="w-3 h-3 rounded-full bg-cyan-400 shrink-0" />
              <p className="text-gray-300 text-sm flex-1">{item.text}</p>
              <span className="text-gray-500 text-xs shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
