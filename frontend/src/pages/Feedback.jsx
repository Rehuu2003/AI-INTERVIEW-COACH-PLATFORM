import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import { getInterview } from "../services/interviewService";
import { areaLabel, scoreToGrade } from "../utils/formatters";

const Feedback = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [interview, setInterview] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!interviewId) return;
    getInterview(interviewId)
      .then(setInterview)
      .catch(() => setError("Could not load interview feedback."))
      .finally(() => setLoading(false));
  }, [interviewId]);

  if (loading) {
    return (
      <div className="p-10 flex justify-center">
        <Loader2 className="animate-spin text-cyan-400" size={36} />
      </div>
    );
  }

  if (error || !interview) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-400 mb-4">{error || "Interview not found"}</p>
        <button type="button" onClick={() => navigate("/dashboard")} className="text-cyan-400">
          Back to dashboard
        </button>
      </div>
    );
  }

  const breakdown = interview.scoreBreakdown || {};
  const feedback = interview.feedback || {};
  const overall = interview.overallScore ?? 0;

  const metrics = [
    { title: "Confidence", value: breakdown.confidence },
    { title: "Clarity", value: breakdown.clarity },
    { title: "Technical", value: breakdown.technicalKnowledge },
    { title: "Problem solving", value: breakdown.problemSolving },
  ].filter((m) => m.value != null);

  return (
    <div className="p-6 lg:p-10 text-white">
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8"
      >
        <ArrowLeft size={18} /> Dashboard
      </button>

      <p className="text-cyan-400 mb-2">AI interview results</p>
      <h1 className="text-4xl lg:text-5xl font-black mb-2">{interview.topic}</h1>
      <p className="text-gray-400 mb-10 capitalize">
        {interview.type} · {interview.difficulty}
      </p>

      <div className="grid xl:grid-cols-3 gap-8 mb-10">
        <div className="xl:col-span-2 rounded-[32px] border border-white/10 bg-white/[0.04] p-8">
          <p className="text-gray-400 mb-4">Overall performance</p>
          <div className="flex flex-wrap items-end gap-8">
            <h2 className="text-8xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {overall}%
            </h2>
            <div className="text-center">
              <p className="text-5xl font-black">{scoreToGrade(overall)}</p>
              <p className="text-gray-500">AI rating</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {metrics.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-gray-400 text-sm">{item.title}</p>
              <p className="text-3xl font-black">{item.value}%</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-8 mb-10">
        <div className="rounded-[32px] border border-white/10 p-8">
          <h2 className="text-2xl font-black mb-6">Strengths</h2>
          <ul className="space-y-3">
            {(feedback.strengths || []).map((s, i) => (
              <li key={i} className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-gray-300">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[32px] border border-white/10 p-8">
          <h2 className="text-2xl font-black mb-6">Improvements</h2>
          <ul className="space-y-3">
            {(feedback.improvements || feedback.weaknesses || []).map((s, i) => (
              <li key={i} className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-gray-300">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {feedback.summary && (
        <div className="rounded-[32px] border border-cyan-500/20 bg-cyan-500/10 p-8">
          <h2 className="text-2xl font-black mb-4">AI summary</h2>
          <p className="text-gray-300 leading-relaxed">{feedback.summary}</p>
          {feedback.detailedAnalysis && (
            <p className="text-gray-400 mt-4 leading-relaxed">{feedback.detailedAnalysis}</p>
          )}
        </div>
      )}

      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={() => navigate("/dashboard/interview")}
          className="h-12 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold"
        >
          Practice again
        </button>
        <button
          type="button"
          onClick={() => navigate("/dashboard/analytics")}
          className="h-12 px-6 rounded-xl border border-white/10"
        >
          View analytics
        </button>
      </div>
    </div>
  );
};

export default Feedback;
