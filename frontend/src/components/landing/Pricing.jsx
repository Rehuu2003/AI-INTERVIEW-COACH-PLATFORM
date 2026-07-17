import { Check, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "Free",
    sub: "Get started at no cost",
    features: ["5 mock interviews/mo", "Basic AI feedback", "Voice analysis", "Performance tracking"],
    cta: "Get started",
    href: "/signup",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/mo",
    sub: "For serious candidates",
    features: ["Unlimited interviews", "Advanced AI feedback", "Real-time analytics", "Communication insights", "Industry-level questions", "Progress history"],
    cta: "Start Pro",
    href: "/signup",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    sub: "For teams & institutions",
    features: ["Team dashboards", "Custom AI models", "Priority support", "Advanced reporting", "Recruitment analytics"],
    cta: "Contact sales",
    href: "/signup",
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="bg-[#0a0a0c] py-32 px-5">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="ui-badge mb-6 mx-auto inline-flex">Pricing</div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-5">
            Simple, transparent pricing.
          </h2>
          <p className="text-zinc-400 text-lg">Start free, upgrade when you need more.</p>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-3 gap-5">
          {plans.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative rounded-2xl border flex flex-col overflow-hidden transition-all duration-300 ${
                p.highlight
                  ? "bg-violet-600 border-violet-500 shadow-[0_0_60px_rgba(124,58,237,0.25)]"
                  : "bg-[#111113] border-white/[0.07] hover:border-white/[0.12]"
              }`}
            >
              {p.highlight && (
                <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
                  <Zap size={11} fill="white" /> Most popular
                </div>
              )}

              <div className="p-7 flex-1 flex flex-col">
                <p className={`text-sm font-semibold mb-1 ${p.highlight ? "text-violet-200" : "text-zinc-400"}`}>{p.name}</p>
                <p className={`text-xs mb-6 ${p.highlight ? "text-violet-300" : "text-zinc-500"}`}>{p.sub}</p>

                <div className="flex items-end gap-1 mb-8">
                  <span className={`text-5xl font-black ${p.highlight ? "text-white" : "text-white"}`}>{p.price}</span>
                  {p.period && <span className={`text-base mb-2 ${p.highlight ? "text-violet-200" : "text-zinc-500"}`}>{p.period}</span>}
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  {p.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${p.highlight ? "bg-white/20" : "bg-violet-600/15"}`}>
                        <Check size={10} className={p.highlight ? "text-white" : "text-violet-400"} />
                      </div>
                      <span className={`text-sm ${p.highlight ? "text-violet-100" : "text-zinc-300"}`}>{f}</span>
                    </div>
                  ))}
                </div>

                <Link to={p.href}>
                  <button className={`w-full h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                    p.highlight
                      ? "bg-white text-violet-700 hover:bg-violet-50"
                      : "bg-white/[0.05] border border-white/[0.08] text-white hover:bg-white/[0.08]"
                  }`}>
                    {p.cta} <ArrowRight size={14} />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-zinc-600 text-sm mt-10">No credit card required. Cancel anytime.</p>
      </div>
    </section>
  );
};

export default Pricing;
