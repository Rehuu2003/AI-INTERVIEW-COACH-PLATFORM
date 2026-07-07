import { motion } from "framer-motion";

import {
  Star,
  Quote,
  Sparkles,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

import {
  fadeUp,
  staggerContainer,
} from "../../utils/animations";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    company: "Google",
    review:
      "The AI feedback completely transformed my interview confidence. I improved communication clarity within two weeks.",
  },

  {
    name: "Rahul Mehta",
    role: "Software Engineer",
    company: "Microsoft",
    review:
      "This platform feels like having a personal interview mentor available 24/7. The analytics are insanely accurate.",
  },

  {
    name: "Emily Carter",
    role: "Product Designer",
    company: "Amazon",
    review:
      "The realtime analysis helped me identify weaknesses I never noticed before. The UI experience is world-class.",
  },

  {
    name: "Aman Verma",
    role: "Backend Developer",
    company: "Meta",
    review:
      "The mock interview simulations feel incredibly realistic. My confidence improved dramatically after consistent practice.",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative py-32 px-6 overflow-hidden bg-[#050816]"
    >
      
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_30%)]" />

      {/* GRID */}

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10"
      >
        
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-20 items-center">
          
          {/* LEFT SIDE */}

          <motion.div variants={fadeUp}>
            
            {/* BADGE */}

            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-xl mb-10">
              
              <Sparkles
                size={18}
                className="text-cyan-400"
              />

              <span className="text-sm text-cyan-300 font-medium">
                Trusted by professionals worldwide
              </span>
            </div>

            {/* TITLE */}

            <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.95] mb-8">
              
              Real success
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {" "}
                stories
              </span>
            </h2>

            <p className="text-xl text-gray-400 leading-relaxed mb-12">
              Thousands of candidates improved their confidence,
              communication, and technical interview performance
              using our AI interview intelligence platform.
            </p>

            {/* BIG RATING */}

            <div className="rounded-[36px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-8 mb-10 relative overflow-hidden">
              
              {/* GLOW */}

              <div className="absolute top-0 right-0 w-52 h-52 bg-cyan-500/10 blur-[100px]" />

              <div className="relative z-10">
                
                <div className="flex items-center gap-2 mb-6">
                  
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={22}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <h3 className="text-7xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
                  4.9
                </h3>

                <p className="text-gray-300 text-lg mb-8">
                  Average rating from 50,000+ interview sessions
                </p>

                <div className="grid grid-cols-2 gap-5">
                  
                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                    
                    <TrendingUp
                      size={24}
                      className="text-cyan-400 mb-4"
                    />

                    <h4 className="text-3xl font-black text-white mb-2">
                      +95%
                    </h4>

                    <p className="text-gray-400">
                      Interview confidence growth
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                    
                    <ShieldCheck
                      size={24}
                      className="text-emerald-400 mb-4"
                    />

                    <h4 className="text-3xl font-black text-white mb-2">
                      98%
                    </h4>

                    <p className="text-gray-400">
                      AI feedback accuracy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}

          <motion.div
            variants={fadeUp}
            className="relative"
          >
            
            {/* FLOATING GLOWS */}

            <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-[120px]" />

            <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 blur-[120px]" />

            {/* TESTIMONIAL GRID */}

            <div className="grid md:grid-cols-2 gap-6 relative z-10">
              
              {testimonials.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -8,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className={`rounded-[32px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-7 backdrop-blur-xl relative overflow-hidden ${
                    index % 2 !== 0
                      ? "md:mt-12"
                      : ""
                  }`}
                >
                  
                  {/* GLOW */}

                  <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-[80px]" />

                  {/* QUOTE */}

                  <div className="relative z-10">
                    
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center mb-8">
                      
                      <Quote
                        size={24}
                        className="text-black"
                      />
                    </div>

                    {/* REVIEW */}

                    <p className="text-gray-300 leading-relaxed text-lg mb-10">
                      “{item.review}”
                    </p>

                    {/* USER */}

                    <div className="flex items-center justify-between">
                      
                      <div>
                        
                        <h4 className="text-xl font-bold text-white mb-1">
                          {item.name}
                        </h4>

                        <p className="text-gray-400">
                          {item.role}
                        </p>
                      </div>

                      <div className="px-4 py-2 rounded-full bg-white/[0.05] border border-white/5 text-cyan-300 text-sm font-semibold">
                        {item.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;