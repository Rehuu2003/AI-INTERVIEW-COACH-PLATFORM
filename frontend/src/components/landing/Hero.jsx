import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, TrendingUp, MessageSquare, BarChart2 } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#09090b] overflow-hidden flex items-center pt-16">

      {/* Single centered glow — used once, not everywhere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-100 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            {/* Badge */}
            <div className="ui-badge mb-8">
              <Zap size={13} fill="currentColor" />
              AI-Powered Interview Intelligence
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-[64px] font-black text-white leading-[1.05] tracking-tight mb-6">
              Ace every{" "}
              <span className="text-violet-400">interview</span>
              <br />
              with AI coaching.
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed max-w-lg mb-10">
              Practice with an AI interviewer, receive coaching after each submitted answer, and track scores from completed sessions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-14">
              <Link to="/signup">
                <button className="btn-primary h-11 px-6 text-sm">
                  Start for free <ArrowRight size={15} />
                </button>
              </Link>
              <Link to="/login">
                <button className="btn-ghost h-11 px-6 text-sm">
                  Sign in
                </button>
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-white/[0.06]">
              {[
                { value: "Text", label: "Answer input" },
                { value: "Voice", label: "Supported browsers" },
                { value: "Private", label: "Local camera preview" },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-sm text-zinc-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Product preview card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="relative"
          >
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-violet-500/20 to-transparent pointer-events-none" />

            <div className="rounded-2xl bg-[#111113] border border-white/[0.08] overflow-hidden shadow-2xl">
              {/* Window bar */}
              <div className="flex items-center gap-2 px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-zinc-500 font-mono">interviewiq — session #24</span>
                <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-emerald-400 font-medium">Live</span>
                </div>
              </div>

              <div className="p-6">
                {/* Score header */}
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <p className="text-xs text-zinc-500 mb-1 font-medium uppercase tracking-wider">Answer coaching</p>
                    <p className="text-3xl font-black text-white leading-none">Scores after each answer</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end text-emerald-400 text-sm font-semibold mb-1">
                      <TrendingUp size={14} /> Saved progress
                    </div>
                    <p className="text-xs text-zinc-500">after you complete a session</p>
                  </div>
                </div>

                {/* Waveform */}
                <div className="relative h-28 rounded-xl bg-[#0d0d0f] border border-white/[0.04] mb-5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end gap-2 h-16">
                    {[30, 55, 42, 75, 60, 48, 82, 50, 65, 40, 72, 55, 48, 68].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${h}%`,
                          background: i >= 10
                            ? `rgba(124,58,237,${0.3 + (h / 100) * 0.5})`
                            : `rgba(124,58,237,${0.15 + (h / 100) * 0.25})`,
                        }}
                      />
                    ))}
                  </div>
                  <svg viewBox="0 0 500 80" className="absolute bottom-0 left-0 w-full h-16 opacity-60">
                    <defs>
                      <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                    <path d="M0 60 C60 25 120 70 180 45 C240 20 300 65 360 35 C420 10 460 50 500 25"
                      stroke="url(#lg)" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Communication", val: "AI scored", icon: MessageSquare },
                    { label: "Technical", val: "AI scored", icon: Zap },
                    { label: "Confidence", val: "AI scored", icon: BarChart2 },
                  ].map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <div key={i} className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-3">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Icon size={12} className="text-violet-400" />
                          <p className="text-[11px] text-zinc-500 font-medium">{m.label}</p>
                        </div>
                        <p className="text-lg font-bold text-white">{m.val}</p>
                      </div>
                    );
                  })}
                </div>

                {/* AI message */}
                <div className="rounded-xl bg-violet-600/10 border border-violet-500/20 px-4 py-3">
                  <p className="text-xs text-zinc-400 mb-1 font-medium">AI Feedback</p>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Feedback is generated from the answer you submit, with an actionable improvement for your next response.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
