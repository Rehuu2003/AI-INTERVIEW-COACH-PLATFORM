import { motion } from "framer-motion";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden">

      {/* Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px]" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-[40px] border border-white/10 glass"
      >

        {/* LEFT */}
        <div className="relative hidden lg:flex flex-col justify-between p-14 overflow-hidden bg-gradient-to-br from-purple-600/20 via-pink-500/10 to-cyan-500/20">

          {/* Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-[120px]" />

          <div className="relative z-10">

            <div className="flex items-center gap-4 mb-16">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-2xl font-black shadow-glow">
                IQ
              </div>

              <div>
                <h1 className="text-4xl font-black">
                  Interview
                  <span className="gradient-text">
                    IQ
                  </span>
                </h1>

                <p className="text-gray-300">
                  AI Interview Platform
                </p>
              </div>
            </div>

            <h1 className="text-6xl font-black leading-tight mb-8">
              Prepare for
              <br />

              your dream
              <br />

              <span className="gradient-text">
                tech career.
              </span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
              Practice technical interviews with AI,
              realtime analytics and intelligent feedback.
            </p>
          </div>

          {/* Bottom Stats */}
          <div className="relative z-10 grid grid-cols-3 gap-6">

            <div className="glass rounded-3xl p-5">
              <h2 className="text-4xl font-black gradient-text">
                50K+
              </h2>

              <p className="text-sm text-gray-300 mt-2">
                Interviews
              </p>
            </div>

            <div className="glass rounded-3xl p-5">
              <h2 className="text-4xl font-black gradient-text">
                95%
              </h2>

              <p className="text-sm text-gray-300 mt-2">
                Success
              </p>
            </div>

            <div className="glass rounded-3xl p-5">
              <h2 className="text-4xl font-black gradient-text">
                A+
              </h2>

              <p className="text-sm text-gray-300 mt-2">
                AI Score
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT */}
        <div className="p-8 md:p-14 flex flex-col justify-center">
          
          <div className="mb-10">
            <h1 className="text-5xl font-black mb-4">
              {title}
            </h1>

            <p className="text-gray-400 text-lg">
              {subtitle}
            </p>
          </div>

          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;