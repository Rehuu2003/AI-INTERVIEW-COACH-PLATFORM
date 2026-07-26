import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Square,
} from "lucide-react";
import VideoPanel from "../components/interview/VideoPanel";
import AIFeedbackCard from "../components/interview/AIFeedbackCard";
import { useAuth } from "../context/AuthContext";
import { roleConfig } from "../config/roleConfig";
import {
  startInterview,
  sendMessage,
  completeInterview,
  abandonInterview,
} from "../services/interviewService";
import { fetchProfileStats } from "../services/analyticsService";

const TYPE_OPTIONS = [
  { value: "technical", label: "Technical" },
  { value: "behavioral", label: "HR / Behavioral" },
  { value: "mixed", label: "Mixed" },
  { value: "system-design", label: "System Design" },
];

const Interview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role || user?.targetRole || "frontend";
  const roleMeta = roleConfig.find((r) => r.id === role) || roleConfig[0];

  const [phase, setPhase] = useState("setup");
  const [interviewId, setInterviewId] = useState(null);
  const [topic, setTopic] = useState(roleMeta.title);
  const [difficulty, setDifficulty] = useState("medium");
  const [interviewType, setInterviewType] = useState("mixed");
  const [voiceMode, setVoiceMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [error, setError] = useState("");
  const [completing, setCompleting] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [sessionStats, setSessionStats] = useState({
    completed: 0,
    score: 0,
    streak: 0,
  });

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const interviewIdRef = useRef(null);

  useEffect(() => {
    interviewIdRef.current = interviewId;
  }, [interviewId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    fetchProfileStats()
      .then((data) => {
        const completed = data.profile?.totalInterviews ?? 0;
        const score = data.profile?.averageScore ?? 0;
        setSessionStats({ completed, score, streak: completed > 0 ? 1 : 0 });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    return () => {
      if (interviewIdRef.current && phase === "active") {
        abandonInterview(interviewIdRef.current).catch(() => {});
      }
      window.speechSynthesis?.cancel();
    };
  }, [phase]);

  const speakText = (text) => {
    if (!window.speechSynthesis || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setAiSpeaking(true);
    utterance.onend = () => {
      setAiSpeaking(false);
      if (voiceMode) startListening();
    };
    window.speechSynthesis.speak(utterance);
  };

  const handleStart = async () => {
    setError("");
    setTyping(true);
    try {
      const data = await startInterview({
        topic: topic.trim(),
        difficulty,
        type: interviewType,
      });
      setInterviewId(data.interviewId);
      setMessages([{ sender: "ai", text: data.message }]);
      setPhase("active");
      speakText(data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Could not start interview. Check backend and GEMINI_API_KEY.");
    } finally {
      setTyping(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      if (voiceMode) {
        setTimeout(() => submitAnswer(transcript), 800);
      }
    };
    recognitionRef.current = recognition;
    recognition.start();
  };

  const submitAnswer = async (text) => {
    if (!text.trim() || !interviewId || typing) return;

    setMessages((prev) => [...prev, { sender: "user", text: text.trim() }]);
    setInput("");
    setTyping(true);
    setError("");

    try {
      const data = await sendMessage(interviewId, text.trim());
      setMessages((prev) => [...prev, { sender: "ai", text: data.message }]);
      setAnswerFeedback(data.answerFeedback || null);
      speakText(data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message.");
    } finally {
      setTyping(false);
    }
  };

  const handleEndInterview = async () => {
    if (!interviewId) return;
    setCompleting(true);
    setError("");
    try {
      const result = await completeInterview(interviewId);
      navigate(`/dashboard/feedback/${result._id || interviewId}`);
    } catch (err) {
      setError(err.response?.data?.message || "Complete at least 2 answers before ending.");
    } finally {
      setCompleting(false);
    }
  };

  if (phase === "setup") {
    return (
      <div className="min-h-screen bg-[#050816] text-white p-6 lg:p-10">
        <div className="max-w-2xl mx-auto rounded-[32px] border border-white/10 bg-white/[0.04] p-8 lg:p-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-sm font-semibold mb-6">
            <Sparkles size={14} />
            Configure session
          </div>
          <h1 className="text-3xl font-black mb-2">Start AI Mock Interview</h1>
          <p className="text-gray-400 mb-8">
            Questions and scoring run on the server using your profile and session settings.
          </p>

          {error && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Topic / role focus</label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full h-14 rounded-xl border border-white/10 bg-white/[0.04] px-5 outline-none focus:border-cyan-400/40"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full h-14 rounded-xl border border-white/10 bg-[#0b1220] px-5 outline-none"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Interview type</label>
              <select
                value={interviewType}
                onChange={(e) => setInterviewType(e.target.value)}
                className="w-full h-14 rounded-xl border border-white/10 bg-[#0b1220] px-5 outline-none"
              >
                {TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStart}
            disabled={typing || !topic.trim()}
            className="mt-8 w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {typing ? <Loader2 className="animate-spin" size={20} /> : null}
            {typing ? "Starting…" : "Begin interview"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_30%)]" />

      <div className="relative z-10 flex flex-col h-screen">
        <div className="border-b border-white/10 backdrop-blur-xl bg-white/[0.03] px-6 lg:px-10 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-sm font-semibold mb-4">
                <Sparkles size={14} />
                AI Mock Interview
              </div>
              <h1 className="text-2xl lg:text-4xl font-black">Live session</h1>
              <p className="text-gray-400 mt-2 capitalize">
                {topic} · {difficulty} · {interviewType.replace("-", " ")}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Completed", value: sessionStats.completed, icon: CheckCircle2 },
                { label: "Avg score", value: `${sessionStats.score}%`, icon: ShieldCheck },
                { label: "Questions", value: messages.filter((m) => m.sender === "ai").length, icon: Clock3 },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 min-w-[100px]">
                    <div className="flex items-center justify-between mb-2">
                      <Icon size={18} className="text-cyan-400" />
                      <span className="text-xl font-black">{item.value}</span>
                    </div>
                    <p className="text-sm text-gray-400">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="px-6 lg:px-10 pt-4 flex flex-wrap gap-3 items-center justify-between">
            <button
              type="button"
              onClick={() => setVoiceMode(!voiceMode)}
              className={`px-5 py-3 rounded-2xl font-semibold transition-all ${
                voiceMode
                  ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-black"
                  : "bg-white/[0.05] border border-white/10"
              }`}
            >
              {voiceMode ? "Voice mode on" : "Enable voice mode"}
            </button>
            <button
              type="button"
              onClick={handleEndInterview}
              disabled={completing}
              className="px-5 py-3 rounded-2xl border border-orange-500/30 bg-orange-500/10 text-orange-300 font-semibold flex items-center gap-2 disabled:opacity-50"
            >
              {completing ? <Loader2 size={18} className="animate-spin" /> : <Square size={18} />}
              End & get feedback
            </button>
          </div>

          {error && (
            <div className="mx-6 lg:mx-10 mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          <div className="flex-1 px-6 lg:px-10 py-6 overflow-hidden">
            <div className="grid xl:grid-cols-[minmax(0,1fr)_340px] gap-6 h-full">
              <div className="space-y-4 overflow-y-auto pr-2 h-[calc(100vh-280px)]">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-[24px] px-5 py-4 border ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-black border-transparent"
                            : "bg-white/[0.04] border-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                          {message.sender === "ai" ? (
                            <>
                              <BrainCircuit size={16} /> AI Interviewer
                              {aiSpeaking && index === messages.length - 1 ? (
                                <Volume2 size={14} className="text-cyan-400" />
                              ) : null}
                            </>
                          ) : (
                            "You"
                          )}
                        </div>
                        <p className="whitespace-pre-line leading-relaxed text-[15px]">{message.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {typing && (
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
                    <Loader2 className="animate-spin text-cyan-400" size={20} />
                    <span className="text-gray-300">AI is thinking…</span>
                  </div>
                )}
                <AIFeedbackCard feedback={answerFeedback} />
                <div ref={messagesEndRef} />
              </div>

              <div className="hidden xl:block sticky top-6">
                <VideoPanel liveStats />
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/[0.03] px-6 lg:px-10 py-5">
            <div className="max-w-4xl mx-auto rounded-[28px] border border-white/10 bg-white/[0.04] p-3 flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitAnswer(input)}
                placeholder="Type your answer…"
                disabled={typing}
                className="flex-1 bg-transparent outline-none px-3 text-lg placeholder:text-gray-500"
              />
              <button
                type="button"
                onClick={startListening}
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isListening ? "bg-red-500 animate-pulse" : "bg-white/[0.06]"
                }`}
              >
                <Mic size={20} />
              </button>
              <button
                type="button"
                onClick={() => submitAnswer(input)}
                disabled={typing || !input.trim()}
                className="h-12 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold flex items-center gap-2 disabled:opacity-50"
              >
                <Send size={18} />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
