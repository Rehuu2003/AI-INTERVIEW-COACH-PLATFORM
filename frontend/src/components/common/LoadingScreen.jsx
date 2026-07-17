import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-[#09090b] flex items-center justify-center z-[999]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(124,58,237,0.4)]"
        >
          <Zap size={26} className="text-white" fill="white" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-bold text-white mb-2"
        >
          InterviewIQ
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-sm text-zinc-500 mb-10"
        >
          Loading your workspace...
        </motion.p>

        <div className="w-48 h-1 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-1/2 h-full rounded-full bg-violet-500"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
