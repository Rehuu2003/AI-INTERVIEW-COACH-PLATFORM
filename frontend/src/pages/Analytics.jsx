import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  AreaChart, Area, XAxis, Tooltip,
} from "recharts";
import {
  BrainCircuit, Trophy, Activity, Sparkles, TrendingUp, ShieldCheck,
  Target, Loader2,
} from "lucide-react";
import InterviewReport from "../analytics/InterviewReport";
import { useAuth } from "../context/AuthContext";
import {
  fetchAnalyticsSummary,
  fetchProgress,
  fetchWeaknesses,
  fetchHistory,
} from "../services/analyticsService";
import { areaLabel, calcStreak, scoreToGrade } from "../utils/formatters";

const Analytics = () => {
  const { user } = useAuth();
  const role = user?.role || user?.targetRole || "frontend";
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [trend, setTrend] = useState([]);
  const [weaknesses, setWeaknesses] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [sum, prog, weak, hist] = await Promise.all([
          fetchAnalyticsSummary(),
          fetchProgress(30),
          fetchWeaknesses(),
          fetchHistory(20),
        ]);
        setSummary(sum);
        setTrend(prog);
        setWeaknesses(weak);
        setHistory(hist);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const scores = summary?.averageScores || {};
  const averageScore = scores.overall ?? 0;
  const radarData = (weaknesses?.allAreaScores || []).map((a) => ({
    subject: areaLabel(a.area),
    score: a.averageScore,
  }));

  const performanceData = trend.map((p, i) => ({
    label: `#${i + 1}`,
    score: p.overallScore,
  }));

  const streak = calcStreak(history.map((h) => h.completedAt));

  const latestFeedback = history[0]?.feedback || {};
  const strengthsText = latestFeedback.strengths?.join(". ") || "Complete more interviews to see strengths.";
  const improvementsText = latestFeedback.improvements?.join(". ") || weaknesses?.commonWeaknesses?.[0]?.text || "Keep practicing to unlock recommendations.";

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-cyan-400" size={40} />
      </div>
    );
  }

  const statCards = [
    { title: "Communication", value: scores.communication ? `${scores.communication}%` : "—", icon: Activity },
    { title: "Confidence", value: scores.confidence ? `${scores.confidence}%` : "—", icon: ShieldCheck },
    { title: "Problem solving", value: scores.problemSolving ? `${scores.problemSolving}%` : "—", icon: TrendingUp },
    { title: "AI rating", value: averageScore ? scoreToGrade(averageScore) : "—", icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden p-6 lg:p-10">
      <div className="relative z-10 max-w-[1700px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[40px] border border-white/10 bg-white/[0.04] p-8 lg:p-10 mb-8"
        >
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-sm font-semibold mb-6">
                <Sparkles size={15} />
                Performance analytics
              </div>
              <h1 className="text-4xl lg:text-6xl font-black leading-tight mb-4">
                Your <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">progress</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl">
                Aggregated from {summary?.counts?.completed ?? 0} completed interviews for {role}.
              </p>
            </div>
            <div className="w-[280px] h-[280px] rounded-full border border-white/10 bg-white/[0.05] flex flex-col items-center justify-center">
              <p className="text-gray-400 mb-2">Average score</p>
              <h2 className="text-7xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {averageScore || "—"}
              </h2>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {statCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[32px] border border-white/10 bg-white/[0.04] p-7"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                    <Icon size={26} className="text-black" />
                  </div>
                  <span className="text-3xl font-black">{item.value}</span>
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
              </motion.div>
            );
          })}
        </div>

        <div className="grid xl:grid-cols-[1fr_380px] gap-8 mb-8">
          <motion.div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <BrainCircuit className="text-cyan-400" /> Skill breakdown
            </h2>
            {radarData.length === 0 ? (
              <p className="text-gray-500 py-20 text-center">No scored interviews yet.</p>
            ) : (
              <div className="h-[420px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#d1d5db", fontSize: 12 }} />
                    <Radar dataKey="score" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.35} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            )}
          </motion.div>

          <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-8">
            <h3 className="text-2xl font-black mb-2">Practice streak</h3>
            <p className="text-5xl font-black text-orange-400 mb-4">{streak}</p>
            <p className="text-gray-400 text-sm">Consecutive days with completed interviews</p>
          </div>
        </div>

        <div className="grid xl:grid-cols-2 gap-8">
          <motion.div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-2xl font-black mb-6">Score progression</h2>
            {performanceData.length === 0 ? (
              <p className="text-gray-500">No data yet.</p>
            ) : (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.7} />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="label" stroke="#9ca3af" />
                    <Tooltip />
                    <Area type="monotone" dataKey="score" stroke="#22d3ee" fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </motion.div>

          <motion.div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-8">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <Target size={24} /> AI recommendations
            </h2>
            <div className="space-y-4 text-gray-300">
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                <h4 className="font-bold text-white mb-2">Strengths (latest session)</h4>
                <p>{strengthsText}</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                <h4 className="font-bold text-white mb-2">Improvements</h4>
                <p>{improvementsText}</p>
              </div>
            </div>
            <div className="mt-8">
              <InterviewReport averageScore={averageScore} scores={scores} feedback={latestFeedback} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
