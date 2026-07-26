import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Brain, Activity } from "lucide-react";

const Analytics = () => {
  const bars = [35, 58, 44, 78, 67, 52, 88];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"];

  const skills = [
    { label: "Communication", val: 94 },
    { label: "Technical Accuracy", val: 91 },
    { label: "Confidence", val: 89 },
    { label: "Problem Solving", val: 96 },
  ];

  return (
    <section id="analytics" className="bg-[#0a0a0c] py-32 px-5">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="ui-badge mb-6 mx-auto inline-flex">AI Performance Analytics</div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-5">
            Deep interview intelligence.
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Track communication, confidence, technical depth, and growth across every session.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">

          {/* Left — chart card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-[#111113] border border-white/[0.07] p-7"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-violet-600/10 flex items-center justify-center">
                  <BarChart3 size={17} className="text-violet-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Performance Trend</p>
                  <p className="text-zinc-500 text-xs">AI-tracked weekly sessions</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400 font-medium">Live</span>
              </div>
            </div>

            {/* Bar chart */}
            <div className="relative h-52 rounded-xl bg-[#0d0d0f] border border-white/[0.04] overflow-hidden mb-6">
              <div className="absolute bottom-8 left-6 right-6 flex items-end gap-3 h-36">
                {bars.map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-lg transition-all duration-500"
                      style={{
                        height: `${h}%`,
                        background: i === 6
                          ? "linear-gradient(to top, #7c3aed, #a78bfa)"
                          : "rgba(124,58,237,0.25)",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="absolute bottom-2 left-6 right-6 flex justify-between">
                {days.map((d, i) => (
                  <span key={i} className={`text-[11px] ${i === 6 ? "text-violet-400 font-medium" : "text-zinc-600"}`}>{d}</span>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[{ label: "Total Sessions", val: "1,248" }, { label: "AI Interviews", val: "50K+" }, { label: "Success Rate", val: "95%" }].map((s, i) => (
                <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4">
                  <p className="text-xs text-zinc-500 mb-1">{s.label}</p>
                  <p className="text-xl font-bold text-white">{s.val}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — skill breakdown */}
          <div className="flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-[#111113] border border-white/[0.07] p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-violet-600/10 flex items-center justify-center">
                  <Brain size={17} className="text-violet-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Score Breakdown</p>
                  <p className="text-zinc-500 text-xs">Across dimensions</p>
                </div>
              </div>
              <div className="space-y-4">
                {skills.map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm text-zinc-300">{s.label}</span>
                      <span className="text-sm font-semibold text-violet-400">{s.val}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.val}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.1 }}
                        className="h-full rounded-full bg-violet-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
                className="rounded-2xl bg-emerald-500/5 border border-emerald-500/15 p-5"
              >
                <Activity size={18} className="text-emerald-400 mb-4" />
                <p className="text-white font-semibold text-sm mb-2">AI Feedback</p>
                <p className="text-zinc-400 text-xs leading-relaxed">Strong delivery with clear technical structure.</p>
                <p className="text-emerald-400 text-xs font-medium mt-3">↑ Communication +12%</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="rounded-2xl bg-violet-500/5 border border-violet-500/15 p-5"
              >
                <TrendingUp size={18} className="text-violet-400 mb-4" />
                <p className="text-white font-semibold text-sm mb-1">Growth</p>
                <p className="text-3xl font-black text-violet-400">+18%</p>
                <p className="text-zinc-500 text-xs mt-1">this week</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
