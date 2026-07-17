import { motion } from "framer-motion";
import { Star, TrendingUp, ShieldCheck } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    company: "Google",
    review: "The AI feedback completely transformed my interview confidence. I improved communication clarity within two weeks.",
    avatar: "SJ",
  },
  {
    name: "Rahul Mehta",
    role: "Software Engineer",
    company: "Microsoft",
    review: "This platform feels like having a personal interview mentor available 24/7. The analytics are incredibly accurate.",
    avatar: "RM",
  },
  {
    name: "Emily Carter",
    role: "Product Designer",
    company: "Amazon",
    review: "The realtime analysis helped me identify weaknesses I never noticed. Clean interface, powerful insights.",
    avatar: "EC",
  },
  {
    name: "Aman Verma",
    role: "Backend Developer",
    company: "Meta",
    review: "The mock interviews feel incredibly realistic. My confidence improved dramatically after consistent practice.",
    avatar: "AV",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-[#09090b] py-32 px-5">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <div className="ui-badge mb-6">Trusted worldwide</div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-5">
              Real stories from real candidates.
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Thousands of engineers improved their interview performance using InterviewIQ's AI coaching.
            </p>
          </div>

          {/* Rating card */}
          <div className="rounded-2xl bg-[#111113] border border-white/[0.07] p-6 lg:ml-auto lg:w-72">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-5xl font-black text-white mb-1">4.9</p>
            <p className="text-zinc-500 text-sm mb-6">Average from 50,000+ sessions</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-3">
                <TrendingUp size={16} className="text-emerald-400 mb-2" />
                <p className="text-xl font-bold text-white">+95%</p>
                <p className="text-xs text-zinc-500">Confidence growth</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-3">
                <ShieldCheck size={16} className="text-violet-400 mb-2" />
                <p className="text-xl font-bold text-white">98%</p>
                <p className="text-xs text-zinc-500">Feedback accuracy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl bg-[#111113] border border-white/[0.07] p-5 flex flex-col hover:border-violet-500/25 transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={12} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6 flex-1">"{t.review}"</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.05]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-violet-600/20 border border-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-300">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">{t.name}</p>
                    <p className="text-zinc-500 text-[11px]">{t.role}</p>
                  </div>
                </div>
                <span className="text-[11px] text-zinc-500 font-medium">{t.company}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
