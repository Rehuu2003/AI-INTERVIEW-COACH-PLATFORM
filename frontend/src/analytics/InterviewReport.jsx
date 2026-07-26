import { Download, BrainCircuit, Sparkles } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { areaLabel } from "../utils/formatters";

const InterviewReport = ({ averageScore, scores = {}, feedback = {} }) => {
  const downloadReport = async () => {
    const element = document.getElementById("report-card");
    if (!element) return;
    const canvas = await html2canvas(element, { backgroundColor: "#050816", scale: 2 });
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, width, height);
    pdf.save("interview-progress-report.pdf");
  };

  const dimensions = Object.entries(scores)
    .filter(([key, value]) => key !== "overall" && Number.isFinite(value))
    .map(([key, value]) => ({ label: areaLabel(key), value }));

  return (
    <section id="report-card" className="rounded-[36px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-8">
      <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-sm font-semibold mb-4">
            <Sparkles size={14} /> Account progress report
          </div>
          <h2 className="text-3xl font-black mb-2">Interview Evaluation</h2>
          <p className="text-gray-300">Generated from your completed interview history.</p>
        </div>
        <BrainCircuit size={42} className="text-cyan-300" />
      </div>

      {dimensions.length ? (
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {dimensions.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-gray-400 text-sm">{item.label}</p>
              <p className="text-4xl font-black mt-2">{item.value}%</p>
            </div>
          ))}
        </div>
      ) : <p className="text-gray-400 mb-8">Complete an interview to add scored dimensions to this report.</p>}

      {feedback.summary && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 mb-8">
          <h3 className="font-bold mb-2">Latest AI summary</h3>
          <p className="text-gray-300 leading-relaxed">{feedback.summary}</p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-5">
        <div>
          <p className="text-gray-400 text-sm">Overall average</p>
          <p className="text-6xl font-black">{averageScore || "—"}{averageScore ? "%" : ""}</p>
        </div>
        <button type="button" onClick={downloadReport} className="h-12 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold flex items-center gap-2">
          <Download size={18} /> Download PDF
        </button>
      </div>
    </section>
  );
};

export default InterviewReport;
