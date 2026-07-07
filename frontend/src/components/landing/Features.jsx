import {
  Brain,
  Mic,
  BarChart3,
  Sparkles,
  ShieldCheck,
  Clock3,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Interview Intelligence",
    description:
      "Advanced AI evaluates your technical depth, communication clarity, and confidence in real time.",
  },
  {
    icon: Mic,
    title: "Voice & Communication Analysis",
    description:
      "Analyze speaking pace, filler words, tone, and delivery with realtime voice intelligence.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Track progress with AI-generated insights, growth metrics, and detailed score breakdowns.",
  },
];

const smallFeatures = [
  {
    icon: Sparkles,
    title: "Realtime AI Feedback",
  },
  {
    icon: ShieldCheck,
    title: "Industry-Level Questions",
  },
  {
    icon: Clock3,
    title: "24/7 Practice Sessions",
  },
];

const Features = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-[#050816]">
      
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_30%)]" />

      {/* GRID */}

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}

        <div className="max-w-3xl mb-20">
          
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8">
            
            <Sparkles
              size={16}
              className="text-cyan-400"
            />

            <span className="text-sm text-cyan-300">
              Platform Features
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black leading-[1.05] mb-8 text-white">
            
            Designed for
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {" "}
              modern hiring.
            </span>
          </h2>

          <p className="text-xl text-gray-400 leading-relaxed">
            Everything you need to prepare smarter, improve
            communication, and perform confidently in interviews.
          </p>
        </div>

        {/* MAIN FEATURE GRID */}

        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="
                  group
                  relative
                  rounded-[32px]
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-10
                  hover:border-cyan-500/30
                  transition-all
                  duration-500
                  overflow-hidden
                "
              >
                
                {/* HOVER GLOW */}

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_35%)]" />

                {/* ICON */}

                <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                  
                  <Icon
                    size={30}
                    className="text-black"
                  />
                </div>

                {/* CONTENT */}

                <div className="relative z-10">
                  
                  <h3 className="text-3xl font-black text-white mb-5 leading-tight">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed text-lg mb-8">
                    {feature.description}
                  </p>

                  <div className="space-y-4">
                    
                    {[
                      "AI-powered evaluation",
                      "Realtime insights",
                      "Detailed improvement tracking",
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2
                          size={18}
                          className="text-emerald-400"
                        />

                        <span className="text-gray-300">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* BUTTON */}

                  <button className="mt-10 flex items-center gap-3 text-cyan-400 font-semibold group-hover:gap-4 transition-all">
                    
                    Explore Feature

                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* SMALL FEATURES */}

        <div className="grid md:grid-cols-3 gap-6">
          
          {smallFeatures.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  flex
                  items-center
                  gap-5
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-8
                  py-6
                  hover:border-cyan-500/20
                  transition-all
                  duration-300
                "
              >
                
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                  
                  <Icon
                    size={24}
                    className="text-cyan-400"
                  />
                </div>

                <div>
                  
                  <h4 className="text-xl font-bold text-white">
                    {item.title}
                  </h4>

                  <p className="text-gray-400 text-sm mt-1">
                    Premium AI-powered experience
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;