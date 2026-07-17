import { Brain, Mic, BarChart3, Sparkles, ShieldCheck, Clock3 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    label: "AI Intelligence",
    title: "Real-time interview analysis",
    description: "GPT-4 powered AI evaluates your technical depth, communication clarity, and confidence as you answer — giving you instant, actionable scores.",
  },
  {
    icon: Mic,
    label: "Voice Engine",
    title: "Speech & tone analysis",
    description: "Our voice engine analyses speaking pace, filler words, tone, and delivery. Understand how you sound — not just what you say.",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    title: "Progress tracking that matters",
    description: "Track every dimension of your performance across sessions. See exactly where you're improving and what still needs work.",
  },
];

const extras = [
  { icon: Sparkles, label: "Real-time AI feedback after every answer" },
  { icon: ShieldCheck, label: "Industry-level questions across 10+ roles" },
  { icon: Clock3, label: "Practice anytime — AI available 24/7" },
];

const Features = () => {
  return (
    <section id="features" className="bg-[#09090b] py-32 px-5">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="max-w-xl mb-16">
          <div className="ui-badge mb-6">Platform Features</div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-5">
            Built for the way modern hiring works.
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Everything you need to prepare smarter, communicate better, and walk into interviews with real confidence.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid lg:grid-cols-3 gap-5 mb-10">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-2xl bg-[#111113] border border-white/[0.07] p-7 hover:border-violet-500/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-violet-600/5 to-transparent rounded-2xl" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-violet-600/10 border border-violet-500/20 mb-6">
                    <Icon size={13} className="text-violet-400" />
                    <span className="text-xs text-violet-400 font-medium">{f.label}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{f.title}</h3>
                  <p className="text-zinc-400 text-[15px] leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Extra pills */}
        <div className="grid md:grid-cols-3 gap-4">
          {extras.map((e, i) => {
            const Icon = e.icon;
            return (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-[#111113] border border-white/[0.06] px-5 py-4">
                <div className="w-8 h-8 rounded-lg bg-violet-600/10 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-violet-400" />
                </div>
                <p className="text-sm text-zinc-300 font-medium">{e.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
