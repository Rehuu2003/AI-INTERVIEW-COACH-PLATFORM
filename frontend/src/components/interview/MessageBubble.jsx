import { motion } from "framer-motion";

const MessageBubble = ({
  message,
}) => {
  const isAI = message.sender === "ai";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className={`flex ${
        isAI
          ? "justify-start"
          : "justify-end"
      }`}
    >
      
      <div
        className={`max-w-[75%] rounded-[28px] px-6 py-5 border ${
          isAI
            ? "bg-white/[0.04] border-white/10 text-white"
            : "bg-gradient-to-r from-cyan-400 to-purple-500 border-transparent text-black font-semibold"
        }`}
      >
        {message.text}
      </div>
    </motion.div>
  );
};

export default MessageBubble;