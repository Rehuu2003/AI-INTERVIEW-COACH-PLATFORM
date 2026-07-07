import DashboardLayout from "../layouts/DashboardLayout";

const strengths = [
  "Strong React fundamentals",
  "Clear communication",
  "Good problem-solving approach",
  "Confident speaking tone",
];

const improvements = [
  "Reduce filler words",
  "Explain optimization deeper",
  "Improve system design explanations",
  "Structure answers more concisely",
];

const Feedback = () => {
  return (
    <DashboardLayout>

      {/* Header */}
      <div className="mb-14">

        <p className="text-cyan-400 text-lg mb-4">
          AI Interview Results
        </p>

        <h1 className="text-6xl font-black mb-6">
          Interview Feedback
        </h1>

        <p className="text-xl text-gray-400">
          Detailed AI-generated performance analysis.
        </p>
      </div>

      {/* Top Grid */}
      <div className="grid xl:grid-cols-3 gap-8 mb-10">

        {/* Score */}
        <div className="xl:col-span-2 glass rounded-[40px] p-10 border border-white/10 relative overflow-hidden">

          {/* Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 blur-[140px]" />

          <div className="relative z-10">

            <p className="text-gray-400 text-xl mb-6">
              Overall Performance
            </p>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

              <div>
                <h1 className="text-[140px] leading-none font-black gradient-text">
                  92%
                </h1>

                <p className="text-2xl text-gray-300 mt-4">
                  Excellent Performance
                </p>
              </div>

              {/* Circle */}
              <div className="flex justify-center">
                <div className="w-72 h-72 rounded-full border-[14px] border-cyan-400 flex items-center justify-center shadow-glow">

                  <div className="text-center">
                    <h2 className="text-7xl font-black">
                      A+
                    </h2>

                    <p className="text-gray-400 mt-3">
                      AI Rating
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-6">

          {[
            {
              title: "Confidence",
              value: "89%",
            },

            {
              title: "Clarity",
              value: "91%",
            },

            {
              title: "Technical Accuracy",
              value: "95%",
            },

            {
              title: "Problem Solving",
              value: "93%",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="glass rounded-[32px] p-8 border border-white/10"
            >

              <p className="text-gray-400 mb-4">
                {item.title}
              </p>

              <h2 className="text-5xl font-black gradient-text">
                {item.value}
              </h2>

            </div>
          ))}

        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid xl:grid-cols-2 gap-8">

        {/* Strengths */}
        <div className="glass rounded-[40px] p-10 border border-white/10">

          <h2 className="text-4xl font-black mb-10">
            Strengths
          </h2>

          <div className="space-y-5">

            {strengths.map((item, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-5 border border-emerald-500/20 bg-emerald-500/5"
              >

                <div className="flex items-center gap-4">

                  <div className="w-4 h-4 rounded-full bg-emerald-400" />

                  <p className="text-lg text-gray-300">
                    {item}
                  </p>

                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Improvements */}
        <div className="glass rounded-[40px] p-10 border border-white/10">

          <h2 className="text-4xl font-black mb-10">
            Improvements
          </h2>

          <div className="space-y-5">

            {improvements.map((item, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-5 border border-red-500/20 bg-red-500/5"
              >

                <div className="flex items-center gap-4">

                  <div className="w-4 h-4 rounded-full bg-red-400" />

                  <p className="text-lg text-gray-300">
                    {item}
                  </p>

                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* AI Summary */}
      <div className="mt-10 rounded-[40px] p-10 border border-cyan-500/20 bg-cyan-500/10">

        <h2 className="text-4xl font-black mb-8">
          AI Summary
        </h2>

        <p className="text-xl text-gray-300 leading-relaxed">
          You performed exceptionally well in technical
          problem solving and React fundamentals.
          Communication clarity was strong and your
          confidence remained consistent throughout the interview.
          Focus on deeper optimization explanations and
          structured answers to achieve even higher scores.
        </p>

      </div>
    </DashboardLayout>
  );
};

export default Feedback;