
import { useState } from "react";
import { FileText, Sparkles, ShieldCheck, BrainCircuit, AlertCircle } from "lucide-react";
import ResumeUpload from "../components/resume/ResumeUpload";
import ResumeAnalysisCard from "../components/resume/ResumeAnalysisCard";
import { analyzeResumeFile } from "../services/resumeService";
import { useAuth } from "../context/AuthContext";

const ResumeAnalyzer = () => {
  const { user } = useAuth();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (file) => {
    setLoading(true);
    setError("");
    setAnalysis(null);
    try {
      const result = await analyzeResumeFile(file, user?.targetRole || user?.role || "");
      setAnalysis(result);
    } catch (err) {
      setError(err.response?.data?.message || "Resume analysis failed. Use PDF or DOCX and check GEMINI_API_KEY.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 lg:px-10 py-10 relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-sm font-semibold mb-6">
            <Sparkles size={18} />
            AI Resume Intelligence
          </div>
          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-5">
            Resume <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Analyzer</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl">
            Upload PDF or DOCX. Analysis runs securely on the backend with Gemini and is saved to your account.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { icon: FileText, title: "ATS analysis", desc: "Keyword and formatting scoring" },
            { icon: BrainCircuit, title: "AI suggestions", desc: "Actionable improvement tips" },
            { icon: ShieldCheck, title: "Recruiter ready", desc: "Skill gap highlights" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center mb-5">
                <Icon size={26} className="text-black" />
              </div>
              <h3 className="text-xl font-black mb-3">{title}</h3>
              <p className="text-gray-400">{desc}</p>
            </div>
          ))}
        </div>

        <ResumeUpload onUpload={handleUpload} />

        {error && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {loading && (
          <div className="mt-8 inline-flex items-center gap-3 px-5 py-4 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-300">
            <Sparkles size={20} className="animate-pulse" />
            AI is analyzing your resume on the server…
          </div>
        )}

        <ResumeAnalysisCard analysis={analysis} />
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
