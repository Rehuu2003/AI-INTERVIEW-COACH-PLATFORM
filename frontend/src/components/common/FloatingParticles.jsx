import { motion } from "framer-motion";

const particles = Array.from(
  { length: 18 },
  (_, i) => i
);

const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[0]">
      
      {particles.map((item) => (
        <motion.div
          key={item}
          initial={{
            opacity: 0,
            y: "100vh",
            x: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            y: "-10vh",
          }}
          transition={{
            duration:
              10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
          className="absolute w-2 h-2 rounded-full bg-cyan-400/40 blur-[2px]"
        />
      ))}
    </div>
  );
};

export default FloatingParticles;