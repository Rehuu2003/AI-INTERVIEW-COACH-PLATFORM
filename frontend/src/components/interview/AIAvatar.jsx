import { motion } from "framer-motion";

import {
  BrainCircuit,
  Sparkles,
} from "lucide-react";

const AIAvatar = ({
  typing,
}) => {
  return (
    <div className="relative flex items-center justify-center">
      
      {/* OUTER GLOW */}

      <motion.div
        animate={{
          scale: typing
            ? [1, 1.15, 1]
            : 1,

          opacity: typing
            ? [0.4, 0.8, 0.4]
            : 0.4,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute w-44 h-44 rounded-full bg-cyan-500/20 blur-[60px]"
      />

      {/* RING */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-36 h-36 rounded-full border border-cyan-400/20 border-dashed"
      />

      {/* CORE */}

      <motion.div
        animate={{
          scale: typing
            ? [1, 1.05, 1]
            : [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="relative w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-[0_0_60px_rgba(34,211,238,0.4)]"
      >
        
        <BrainCircuit
          size={48}
          className="text-black"
        />

        {/* FLOATING PARTICLES */}

        <motion.div
          animate={{
            y: [-6, 6, -6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="absolute -top-2 -right-2"
        >
          
          <Sparkles
            size={20}
            className="text-cyan-300"
          />
        </motion.div>

        <motion.div
          animate={{
            y: [6, -6, 6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="absolute -bottom-2 -left-2"
        >
          
          <Sparkles
            size={18}
            className="text-purple-300"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AIAvatar;