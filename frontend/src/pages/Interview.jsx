import { useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  Mic,
  Send,
  Sparkles,
  BrainCircuit,
  Volume2,
  Loader2,
  CheckCircle2,
  Clock3,
  ShieldCheck,
} from "lucide-react";

import AIFeedbackCard from "../components/interview/AIFeedbackCard";

import { generateQuestion } from "../utils/generateQuestion";

import { generateFeedback } from "../utils/generateFeedback";

import VideoPanel from "../components/interview/VideoPanel";


const Interview = () => {

  const [voiceMode, setVoiceMode] =
  useState(false);

  const [feedback, setFeedback] =
  useState(null);

  const user =
    JSON.parse(
      localStorage.getItem("aiUser")
    ) || JSON.parse(
      localStorage.getItem("user")
    ) || {};

  const role =
    user.role || "frontend";

  const messagesEndRef = useRef(null);

  const recognitionRef = useRef(null);

  const [messages, setMessages] =
    useState([]);

  const [input, setInput] =
    useState("");

  const [typing, setTyping] =
    useState(false);

  const [isListening, setIsListening] =
    useState(false);

  const [currentQuestion, setCurrentQuestion] =
    useState("");

  const [difficulty, setDifficulty] =
    useState("medium");

  const [aiSpeaking, setAiSpeaking] =
    useState(false);

  const [interviewStarted, setInterviewStarted] =
    useState(false);

  const [sessionStats] = useState({
    completed: 12,
    score: 91,
    streak: 14,
  });

  const speakText = (text) => {
    if (
      !window.speechSynthesis
    )
      return;

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        text
      );

    utterance.rate = 1;

    utterance.pitch = 1;

    utterance.volume = 1;

    utterance.onstart = () =>
      setAiSpeaking(true);

    utterance.onend = () => {
  setAiSpeaking(false);

  if (voiceMode) {
    startListening();
  }
};

    speechSynthesis.speak(
      utterance
    );
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView(
      {
        behavior: "smooth",
      }
    );
  }, [messages]);

  useEffect(() => {
    const startInterview =
      async () => {
        setTyping(true);

        const firstQuestion =
          await generateQuestion({
            role,
            difficulty,
          });

        setCurrentQuestion(
          firstQuestion
        );

        const welcomeMessage = `Welcome ${
          user.name ||
          "Candidate"
        }.

I’ll be conducting your AI-powered ${role} interview today.

${firstQuestion}`;

        setMessages([
          {
            sender: "ai",
            text: welcomeMessage,
          },
        ]);

        speakText(firstQuestion);

        setTyping(false);

        setInterviewStarted(true);
      };

    startInterview();
  }, [difficulty, role, user.name]);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech Recognition not supported in this browser."
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.continuous =
      false;

    recognition.interimResults =
      false;

    recognition.onstart = () =>
      setIsListening(true);

    recognition.onend = () =>
      setIsListening(false);

    recognition.onresult = (
      event
    ) => {
      const transcript =
        event.results[0][0]
          .transcript;

      setInput(transcript);

if (voiceMode) {
  setTimeout(() => {
    handleVoiceSend(
      transcript
    );
  }, 1000);
}
    };

    recognitionRef.current =
      recognition;

    recognition.start();
  };

  const handleSend =
  
    async () => {
      if (!input.trim()) return;

      const userMessage = {
        sender: "user",
        text: input,
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
      ]);

      const userAnswer = input;
      const currentQuestionAsked = currentQuestion;
      

      setInput("");
      const aiFeedback =
      await generateFeedback({
       role,
      question:
      currentQuestionAsked,
      answer: userAnswer,
     });

setFeedback(aiFeedback);

      setTyping(true);

      const aiQuestion =
        await generateQuestion({
          role,
          difficulty,
          previousAnswer:
            userAnswer,
        });

      setCurrentQuestion(
        aiQuestion
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiQuestion,
        },
      ]);

      speakText(aiQuestion);

      setTyping(false);
    };

    const handleVoiceSend =
  async (
    voiceText
  ) => {
    if (!voiceText.trim())
      return;

    const userMessage = {
      sender: "user",
      text: voiceText,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentQuestionAsked =
      currentQuestion;

    setTyping(true);

    const aiFeedback =
      await generateFeedback({
        role,
        question:
          currentQuestionAsked,
        answer:
          voiceText,
      });

    setFeedback(aiFeedback);

    const aiQuestion =
      await generateQuestion({
        role,
        difficulty,
        previousAnswer:
          voiceText,
      });

    setCurrentQuestion(
      aiQuestion
    );

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        text: aiQuestion,
      },
    ]);

    speakText(aiQuestion);

    setTyping(false);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden">
      
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_30%)]" />

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 flex flex-col h-screen">
        
        {/* TOPBAR */}

        <div className="border-b border-white/10 backdrop-blur-xl bg-white/[0.03] px-6 lg:px-10 py-5">
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* LEFT */}

            <div>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-sm font-semibold mb-4">
                
                <Sparkles size={14} />

                AI Mock Interview
              </div>

              <h1 className="text-2xl lg:text-5xl font-black">
                AI Interview Session
              </h1>

              <p className="text-gray-400 mt-3">
                Personalized interview for{" "}
                <span className="text-cyan-400 capitalize">
                  {role}
                </span>{" "}
                role.
              </p>
            </div>

            {/* RIGHT */}

            <div className="grid grid-cols-3 gap-3 mt-4">
              
              {[
                {
                  label:
                    "Sessions",
                  value:
                    sessionStats.completed,
                  icon:
                    CheckCircle2,
                },

                {
                  label:
                    "AI Score",
                  value: `${sessionStats.score}%`,
                  icon:
                    ShieldCheck,
                },

                {
                  label:
                    "Streak",
                  value:
                    sessionStats.streak,
                  icon:
                    Clock3,
                },
              ].map(
                (
                  item,
                  index
                ) => {
                  const Icon =
                    item.icon;

                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 min-w-[120px]"
                    >
                      
                      <div className="flex items-center justify-between mb-3">
                        
                        <Icon
                          size={
                            18
                          }
                          className="text-cyan-400"
                        />

                        <span className="text-2xl font-black">
                          {
                            item.value
                          }
                        </span>
                      </div>

                      <p className="text-sm text-gray-400">
                        {
                          item.label
                        }
                      </p>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* MAIN */}

        <div className="flex-1 overflow-hidden flex flex-col">
          
          {/* INTERVIEW STATUS BAR */}

<div className="px-6 lg:px-10 pt-6">
  
  <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl px-6 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
    
    <div className="flex items-center gap-4">
      
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
        
        <BrainCircuit
          size={28}
          className="text-black"
        />
      </div>

      <div>
        
        <div className="flex items-center gap-3 flex-wrap">
          
          <h2 className="text-2xl font-black">
            AI Interview Active
          </h2>

          <div className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold">
            LIVE
          </div>
        </div>

        <p className="text-gray-400 mt-1">
          Role:
          <span className="text-cyan-400 capitalize ml-2">
            {role}
          </span>

          <span className="mx-2">
            •
          </span>

          Difficulty:
          <span className="text-white capitalize ml-2">
            {difficulty}
          </span>
        </p>
      </div>
    </div>

    <div className="flex items-center gap-6 flex-wrap">

      <button
  onClick={() =>
    setVoiceMode(
      !voiceMode
    )
  }
  className={`px-5 py-3 rounded-2xl font-semibold transition-all ${
    voiceMode
      ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-black"
      : "bg-white/[0.05] border border-white/10 text-white"
  }`}
>
  
  {voiceMode
    ? "Voice Mode ON"
    : "Enable Voice Mode"}
</button>
      
      <div>
        
        <p className="text-sm text-gray-500">
          AI Status
        </p>

        <p className="text-cyan-400 font-semibold">
          Adaptive Questioning
        </p>
      </div>

      <div>
        
        <p className="text-sm text-gray-500">
          Voice Engine
        </p>

        <p className="text-purple-400 font-semibold">
          Active
        </p>
      </div>

      <div>
        
        <p className="text-sm text-gray-500">
          Session
        </p>

        <p className="text-white font-semibold">
          Live
        </p>
      </div>
    </div>
  </div>
</div>

               
{/* CHAT AREA */}

<div className="flex-1 px-6 lg:px-10 py-8 overflow-hidden">
  
  <div className="grid xl:grid-cols-[minmax(0,1fr)_380px] gap-6 items-start h-full">

    {/* LEFT SIDE */}

    <div className="space-y-6 overflow-y-auto pr-2 h-[calc(100vh-320px)]">

      <AnimatePresence>
        
        {messages.map(
          (
            message,
            index
          ) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              className={`flex ${
                message.sender ===
                "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              
              <div
                className={`max-w-[90%] lg:max-w-[75%] rounded-[28px] px-6 py-5 border ${
                  message.sender ===
                  "user"
                    ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-black border-transparent"
                    : "bg-white/[0.04] border-white/10 text-white backdrop-blur-xl"
                }`}
              >
                
                <div className="flex items-start gap-4">
                  
                  {message.sender ===
                    "ai" && (
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shrink-0">
                      
                      <BrainCircuit
                        size={22}
                        className="text-black"
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    
                    <div className="flex items-center gap-3 mb-3">
                      
                      <p className="font-bold">
                        {message.sender ===
                        "user"
                          ? "You"
                          : "AI Interviewer"}
                      </p>

                      {message.sender ===
                        "ai" && (
                        <Volume2
                          size={16}
                          className="text-cyan-400"
                        />
                      )}
                    </div>

                    <p className="whitespace-pre-line leading-relaxed text-[15px]">
                      {
                        message.text
                      }
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>

      {/* TYPING */}

      {typing && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="flex justify-start"
        >
          
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl px-6 py-5 flex items-center gap-4">
            
            <Loader2
              className="animate-spin text-cyan-400"
              size={22}
            />

            <span className="text-gray-300">
              AI is generating the next interview question...
            </span>
          </div>
        </motion.div>
      )}

      {/* FEEDBACK */}

      {feedback && (
        <AIFeedbackCard
          feedback={feedback}
        />
      )}

      <div ref={messagesEndRef} />
    </div>

    {/* RIGHT SIDE */}

    <div className="sticky top-6">
      <VideoPanel />
    </div>
  </div>
</div>

          {/* INPUT */}

          <div className="border-t border-white/10 backdrop-blur-xl bg-white/[0.03] px-6 lg:px-10 py-6">
            
            <div className="max-w-5xl mx-auto">

              {voiceMode && (
  <div className="mb-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-4 flex items-center justify-between">
    
    <div className="flex items-center gap-3">
      
      <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />

      <p className="text-cyan-300 font-semibold">
        AI Voice Interview Active
      </p>
    </div>

    <p className="text-gray-300 text-sm">
      Speak naturally with the AI interviewer
    </p>
  </div>
)}
              
              <div className="rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-4 flex items-center gap-4">
                
                {/* INPUT */}

                <input
                  type="text"
                  value={input}
                  onChange={(e) =>
                    setInput(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key ===
                      "Enter"
                    ) {
                      handleSend();
                    }
                  }}
                  placeholder="Answer the AI interviewer..."
                  className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-500 px-3 text-lg"
                />

                {/* MIC */}

                <button
                  onClick={
                    startListening
                  }
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                    isListening
                      ? "bg-red-500 text-white animate-pulse"
                      : "bg-white/[0.06] hover:bg-white/[0.1]"
                  }`}
                >
                  
                  <Mic size={22} />
                </button>

                {/* SEND */}

                <button
                  onClick={
                    handleSend
                  }
                  className="h-14 px-7 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold flex items-center gap-3 hover:scale-105 transition-all"
                >
                  
                  <Send size={20} />

                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;