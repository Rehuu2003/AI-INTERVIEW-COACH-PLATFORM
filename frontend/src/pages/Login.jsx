import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid email or password.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] premium-grid flex items-center justify-center px-6 relative overflow-hidden">
      <div className="purple-light top-[-150px] left-[-120px]" />
      <div className="blue-light bottom-[-150px] right-[-120px]" />

      <div className="relative z-10 w-full max-w-[1100px] grid lg:grid-cols-2 rounded-[36px] overflow-hidden glass-card">

        {/* LEFT PANEL */}
        <div className="hidden lg:flex flex-col justify-between p-14 border-r border-white/5 relative overflow-hidden">
          <div className="absolute top-[-80px] right-[-80px] w-[260px] h-[260px] rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-20">
              <Link to="/" className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center font-black text-lg">IQ</div>
              <div>
                <h1 className="text-xl font-bold">InterviewIQ</h1>
                <p className="text-gray-500 text-sm">AI Interview Platform</p>
              </div>
              </Link>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 text-sm text-gray-300">
                <Sparkles size={14} /> AI-Powered Career Preparation
              </div>
              <h2 className="text-5xl font-bold leading-tight tracking-tight mb-6">
                Train smarter.<br />Land your dream role.
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Practice with a real-time AI interviewer, get scored on communication, confidence, and technical depth.
              </p>
            </div>
          </div>
          <div className="relative z-10 grid grid-cols-2 gap-4">
            {[
              { title: "AI", text: "Role-focused interview questions" },
              { title: "Scores", text: "Feedback from your submitted answers" },
              { title: "Voice", text: "Browser speech input when supported" },
              { title: "History", text: "Your completed sessions and reports" },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/5 p-5">
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex items-center justify-center p-8 lg:p-14 relative">
          <div className="absolute bottom-0 left-0 w-[220px] h-[220px] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="relative z-10 w-full max-w-md">

            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-3 mb-10">
              <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black text-sm">IQ</div>
              <h1 className="text-lg font-bold">InterviewIQ</h1>
              </Link>
            </div>

            <p className="text-sm text-indigo-400 font-semibold mb-3 tracking-widest">WELCOME BACK</p>
            <h1 className="text-4xl font-bold tracking-tight mb-3">Sign in</h1>
            <p className="text-gray-400 mb-10">Continue your AI interview journey.</p>

            {error && (
              <div className="flex items-center gap-3 rounded-2xl bg-red-500/10 border border-red-500/20 px-5 py-4 mb-6 text-red-400 text-sm">
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                <input
                  type="email" name="email" value={formData.email}
                  onChange={handleChange} placeholder="you@example.com"
                  className="premium-input" required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Password</label>
                <input
                  type="password" name="password" value={formData.password}
                  onChange={handleChange} placeholder="Your password"
                  className="premium-input" required
                />
              </div>
              <button
                type="submit" disabled={loading}
                className="premium-button w-full flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <><span>Continue</span><ArrowRight size={18} /></>}
              </button>
            </form>

            <p className="mt-8 text-gray-500 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-white hover:text-indigo-400 transition font-medium">Create account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
