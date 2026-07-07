import {
  BrainCircuit,
  ShieldCheck,
  TrendingUp,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

const AIFeedbackCard = ({
  feedback,
}) => {
  if (!feedback) return null;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-[32px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-2xl p-8 mt-8"
    >
      
      {/* HEADER */}

      <div className="flex items-center gap-4 mb-8">
        
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
          
          <BrainCircuit
            size={30}
            className="text-black"
          />
        </div>

        <div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-xs font-semibold mb-2">
            
            <Sparkles size={12} />

            AI Evaluation
          </div>

          <h2 className="text-3xl font-black">
            Real-Time Feedback
          </h2>
        </div>
      </div>

      {/* SCORES */}

      <div className="grid md:grid-cols-4 gap-5 mb-8">
        
        {[
          {
            label:
              "Technical",
            value:
              feedback.technicalScore,
          },

          {
            label:
              "Communication",
            value:
              feedback.communicationScore,
          },

          {
            label:
              "Confidence",
            value:
              feedback.confidenceScore,
          },

          {
            label:
              "Overall",
            value:
              feedback.overallScore,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center"
          >
            
            <p className="text-gray-400 mb-3">
              {item.label}
            </p>

            <h3 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {item.value}
            </h3>
          </div>
        ))}
      </div>

      {/* ANALYSIS */}

      <div className="space-y-5">
        
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          
          <div className="flex items-center gap-3 mb-4">
            
            <ShieldCheck
              size={22}
              className="text-cyan-400"
            />

            <h3 className="text-2xl font-bold">
              Strengths
            </h3>
          </div>

          <p className="text-gray-300 leading-relaxed">
            {feedback.strengths}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          
          <div className="flex items-center gap-3 mb-4">
            
            <TrendingUp
              size={22}
              className="text-purple-400"
            />

            <h3 className="text-2xl font-bold">
              Improvements
            </h3>
          </div>

          <p className="text-gray-300 leading-relaxed">
            {
              feedback.improvements
            }
          </p>
        </div>

        {/* RECOMMENDATION */}

        <div className="flex items-center justify-between flex-wrap gap-4 pt-3">
          
          <p className="text-gray-400">
            AI Hiring Recommendation
          </p>

          <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-black">
            
            {
              feedback.recommendation
            }
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIFeedbackCard;