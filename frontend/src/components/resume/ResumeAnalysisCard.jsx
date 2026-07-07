import {
  BrainCircuit,
  ShieldCheck,
  TrendingUp,
  Target,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

const ResumeAnalysisCard = ({
  analysis,
}) => {
  if (!analysis) return null;

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
      className="rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 mt-8"
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

            AI Resume Evaluation
          </div>

          <h2 className="text-3xl font-black">
            Resume Analysis
          </h2>
        </div>
      </div>

      {/* SCORE */}

      <div className="grid md:grid-cols-3 gap-5 mb-8">
        
        {[
          {
            label:
              "ATS Score",
            value:
              analysis.atsScore,
          },

          {
            label:
              "Technical Score",
            value:
              analysis.technicalScore,
          },

          {
            label:
              "Hiring Score",
            value:
              analysis.hiringScore,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center"
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
        
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          
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
            {analysis.strengths}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          
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
              analysis.improvements
            }
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          
          <div className="flex items-center gap-3 mb-4">
            
            <Target
              size={22}
              className="text-cyan-400"
            />

            <h3 className="text-2xl font-bold">
              Missing Skills
            </h3>
          </div>

          <p className="text-gray-300 leading-relaxed">
            {
              analysis.missingSkills
            }
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeAnalysisCard;