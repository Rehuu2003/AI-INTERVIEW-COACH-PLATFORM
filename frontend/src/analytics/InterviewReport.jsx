import {
  Download,
  Trophy,
  BrainCircuit,
  Sparkles,
} from "lucide-react";

import jsPDF from "jspdf";

import html2canvas from "html2canvas";

const InterviewReport = ({
  role,
  averageScore,
}) => {
  const downloadReport =
    async () => {
      const element =
        document.getElementById(
          "report-card"
        );

      const canvas =
        await html2canvas(element);

      const imgData =
        canvas.toDataURL("image/png");

      const pdf = new jsPDF(
        "p",
        "mm",
        "a4"
      );

      const width =
        pdf.internal.pageSize.getWidth();

      const height =
        (canvas.height * width) /
        canvas.width;

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        width,
        height
      );

      pdf.save(
        "AI-Interview-Report.pdf"
      );
    };

  return (
    <div
      id="report-card"
      className="rounded-[36px] border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-2xl p-8"
    >
      
      <div className="flex items-center justify-between mb-10">
        
        <div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-sm font-semibold mb-5">
            
            <Sparkles size={14} />

            AI Generated Report
          </div>

          <h2 className="text-4xl font-black mb-3">
            Interview Evaluation
          </h2>

          <p className="text-gray-300">
            Personalized AI-generated hiring
            analysis report.
          </p>
        </div>

        <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
          
          <BrainCircuit
            size={45}
            className="text-black"
          />
        </div>
      </div>

      {/* SCORE */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        
        {[
          {
            label: "Technical",
            value: "91%",
          },

          {
            label: "Communication",
            value: "94%",
          },

          {
            label: "Confidence",
            value: "89%",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center"
          >
            
            <h3 className="text-gray-400 mb-3">
              {item.label}
            </h3>

            <p className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* SUMMARY */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 mb-8">
        
        <div className="flex items-center gap-3 mb-5">
          
          <Trophy
            size={24}
            className="text-cyan-400"
          />

          <h3 className="text-2xl font-black">
            AI Hiring Recommendation
          </h3>
        </div>

        <div className="space-y-4 text-gray-300 leading-relaxed">
          
          <p>
            Candidate demonstrated strong
            understanding of{" "}
            {role === "aiml"
              ? "AI / ML"
              : role}{" "}
            concepts with excellent
            communication abilities.
          </p>

          <p>
            Problem-solving approach was
            structured and technically sound.
          </p>

          <p>
            Recommended for advanced interview
            rounds.
          </p>

          <div className="pt-3">
            
            <span className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-black">
              
              Strong Hire
            </span>
          </div>
        </div>
      </div>

      {/* OVERALL */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        
        <div>
          
          <p className="text-gray-400 mb-2">
            Overall AI Score
          </p>

          <h2 className="text-7xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            {averageScore}%
          </h2>
        </div>

        <button
          onClick={downloadReport}
          className="h-16 px-8 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold flex items-center gap-3 hover:scale-105 transition-all"
        >
          
          <Download size={22} />

          Download PDF Report
        </button>
      </div>
    </div>
  );
};

export default InterviewReport;