import { motion } from "framer-motion";

import {
  Sparkles,
} from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-[#050816] flex items-center justify-center overflow-hidden z-[999]">
      
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_30%)]" />

      {/* GRID */}

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* CENTER */}

      <div className="relative z-10 flex flex-col items-center">
        
        {/* ICON */}

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 6, -6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="w-28 h-28 rounded-[32px] bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shadow-[0_0_60px_rgba(34,211,238,0.35)] mb-10"
        >
          
          <Sparkles
            size={48}
            className="text-black"
          />
        </motion.div>

        {/* TITLE */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="text-5xl font-black text-white mb-4"
        >
          AI Interview
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.3,
          }}
          className="text-gray-400 text-xl mb-10"
        >
          Preparing your premium workspace...
        </motion.p>

        {/* LOADER */}

        <div className="w-[320px] h-3 rounded-full bg-white/5 overflow-hidden">
          
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-1/2 h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;