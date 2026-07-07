
import { useState } from "react";

import {
  FileText,
  Sparkles,
  ShieldCheck,
  BrainCircuit,
} from "lucide-react";

import ResumeUpload from "../components/resume/ResumeUpload";

import ResumeAnalysisCard from "../components/resume/ResumeAnalysisCard";

import { analyzeResume } from "../utils/analyzeResume";

const ResumeAnalyzer = () => {
  const [analysis, setAnalysis] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleUpload =
    async () => {
      setLoading(true);

      const result =
        await analyzeResume();

      setAnalysis(result);

      setLoading(false);
    };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 lg:px-10 py-10 relative overflow-hidden">

      {/* LIGHTS */}

      <div className="absolute top-[-120px] left-[5%] w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="absolute bottom-[-120px] right-[5%] w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* TOP */}

        <div className="mb-12">

          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-sm font-semibold mb-6">

            <Sparkles size={18} />

            AI Resume Intelligence
          </div>

          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-5">

            Resume
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {" "}
              Analyzer
            </span>
          </h1>

          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
            Upload your resume and receive
            AI-powered ATS scoring, technical
            analysis, improvement suggestions
            and recruiter readiness feedback.
          </p>
        </div>

        {/* FEATURES */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="premium-hover rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center mb-5">

              <FileText
                size={26}
                className="text-black"
              />
            </div>

            <h3 className="text-xl font-black mb-3">
              ATS Analysis
            </h3>

            <p className="text-gray-400">
              Get optimized ATS score and
              keyword analysis.
            </p>
          </div>

          <div className="premium-hover rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center mb-5">

              <BrainCircuit
                size={26}
                className="text-black"
              />
            </div>

            <h3 className="text-xl font-black mb-3">
              AI Suggestions
            </h3>

            <p className="text-gray-400">
              Improve projects, experience and
              technical sections instantly.
            </p>
          </div>

          <div className="premium-hover rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center mb-5">

              <ShieldCheck
                size={26}
                className="text-black"
              />
            </div>

            <h3 className="text-xl font-black mb-3">
              Recruiter Ready
            </h3>

            <p className="text-gray-400">
              Make your resume stand out in
              recruiter shortlisting systems.
            </p>
          </div>
        </div>

        {/* UPLOAD */}

        <ResumeUpload
          onUpload={handleUpload}
        />

        {/* LOADING */}

        {loading && (
          <div className="mt-8 inline-flex items-center gap-3 px-5 py-4 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-lg">

            <Sparkles size={20} />

            AI is analyzing your resume...
          </div>
        )}

        {/* RESULT */}

        <ResumeAnalysisCard
          analysis={analysis}
        />
      </div>
    </div>
  );
};

export default ResumeAnalyzer;

