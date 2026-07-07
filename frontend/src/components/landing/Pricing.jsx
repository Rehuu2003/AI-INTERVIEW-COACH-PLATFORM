import {
  Check,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description:
      "Perfect for trying AI-powered interview preparation.",
    features: [
      "5 mock interviews",
      "Basic AI feedback",
      "Voice analysis",
      "Performance tracking",
    ],
    button: "Get Started",
    highlighted: false,
  },

  {
    name: "Pro",
    price: "$19",
    description:
      "Advanced AI coaching for serious interview preparation.",
    features: [
      "Unlimited interviews",
      "Advanced AI feedback",
      "Realtime analytics",
      "Communication insights",
      "Industry-level questions",
      "Progress tracking",
    ],
    button: "Start Pro Plan",
    highlighted: true,
  },

  {
    name: "Enterprise",
    price: "Custom",
    description:
      "Designed for teams, institutions, and organizations.",
    features: [
      "Team dashboards",
      "Custom AI models",
      "Priority support",
      "Advanced reporting",
      "Recruitment analytics",
    ],
    button: "Contact Sales",
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-[#050816]">
      
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_30%)]" />

      {/* GRID */}

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}

        <div className="text-center max-w-4xl mx-auto mb-24">
          
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8">
            
            <Sparkles
              size={16}
              className="text-cyan-400"
            />

            <span className="text-sm text-cyan-300">
              Flexible Pricing
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black leading-[1.05] mb-8 text-white">
            
            Simple pricing for
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {" "}
              modern hiring.
            </span>
          </h2>

          <p className="text-xl text-gray-400 leading-relaxed">
            Start free and upgrade as your interview preparation grows.
          </p>
        </div>

        {/* PRICING GRID */}

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`
                relative
                rounded-[36px]
                border
                overflow-hidden
                transition-all
                duration-500
                group
                flex
                flex-col

                ${
                  plan.highlighted
                    ? `
                      border-cyan-500/30
                      bg-gradient-to-b
                      from-cyan-500/[0.08]
                      to-purple-500/[0.06]
                      scale-[1.03]
                      shadow-[0_0_60px_rgba(34,211,238,0.15)]
                    `
                    : `
                      border-white/10
                      bg-white/[0.03]
                      hover:border-cyan-500/20
                    `
                }
              `}
            >
              
              {/* MOST POPULAR */}

              {plan.highlighted && (
                <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-black text-sm font-black">
                  MOST POPULAR
                </div>
              )}

              {/* CONTENT */}

              <div className="p-10 flex flex-col flex-1">
                
                {/* TOP */}

                <div className="mb-10">
                  
                  <h3 className="text-3xl font-black text-white mb-4">
                    {plan.name}
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-8">
                    {plan.description}
                  </p>

                  {/* PRICE */}

                  <div className="flex items-end gap-2">
                    
                    <span className="text-7xl font-black text-white">
                      {plan.price}
                    </span>

                    {plan.price !== "Free" &&
                      plan.price !== "Custom" && (
                        <span className="text-gray-400 text-xl mb-3">
                          /month
                        </span>
                      )}
                  </div>
                </div>

                {/* FEATURES */}

                <div className="space-y-5 mb-12 flex-1">
                  
                  {plan.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4"
                    >
                      
                      <div className="mt-1">
                        
                        <Check
                          size={18}
                          className="text-cyan-400"
                        />
                      </div>

                      <span className="text-gray-300 text-lg leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* BUTTON */}

                <button
                  className={`
                    w-full
                    h-16
                    rounded-2xl
                    font-black
                    text-lg
                    transition-all
                    duration-300
                    flex
                    items-center
                    justify-center
                    gap-3

                    ${
                      plan.highlighted
                        ? `
                          bg-gradient-to-r
                          from-cyan-400
                          to-purple-500
                          text-black
                          hover:scale-[1.02]
                          shadow-[0_0_35px_rgba(34,211,238,0.25)]
                        `
                        : `
                          border
                          border-white/10
                          bg-white/[0.03]
                          text-white
                          hover:bg-white/[0.06]
                        `
                    }
                  `}
                >
                  
                  {plan.button}

                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM NOTE */}

        <div className="mt-16 text-center">
          
          <p className="text-gray-500 text-lg">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;