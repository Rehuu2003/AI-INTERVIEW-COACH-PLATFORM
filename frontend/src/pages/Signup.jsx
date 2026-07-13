import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { roleConfig } from "../config/roleConfig";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!selectedRole) { setError("Please select a career role to continue."); return; }
    if (formData.password.length < 6) { setError("Password must be at least 6 characters."); return; }

    setLoading(true);
    setError("");
    try {
      await signup({ ...formData, role: selectedRole });
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message
        || err.response?.data?.errors?.[0]?.msg
        || "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.07),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.07),transparent_30%)]" />
      <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-6xl rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl overflow-hidden"
      >
        <div className="grid lg:grid-cols-2">

          {/* LEFT — Role Selector */}
          <div className="relative p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/8 blur-[100px]" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black text-sm">IQ</div>
                <div>
                  <h1 className="text-lg font-bold">InterviewIQ</h1>
                  <p className="text-gray-500 text-xs">AI Interview Platform</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-cyan-400 mb-5">
                <Sparkles size={16} />
                <span className="text-sm font-medium">Step 1 of 2 — Pick your path</span>
              </div>

              <h2 className="text-4xl font-bold leading-tight mb-4">
                Choose your <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">career path</span>
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Your AI interview experience adapts to your selected role and skillset.
              </p>

              <div className="space-y-3">
                {roleConfig.map((role) => {
                  const Icon = role.icon;
                  const active = selectedRole === role.id;
                  return (
                    <button
                      key={role.id} type="button" onClick={() => { setSelectedRole(role.id); setError(""); }}
                      className={`group relative w-full rounded-[24px] border p-4 transition-all duration-300 text-left overflow-hidden ${
                        active ? "border-cyan-400/40 bg-white/[0.06]" : "border-white/8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/15"
                      }`}
                    >
                      <div className={`absolute inset-0 opacity-8 bg-gradient-to-r ${role.color}`} />
                      <div className="relative z-10 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${role.color} flex items-center justify-center shrink-0`}>
                          <Icon size={22} className="text-black" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold">{role.title}</h3>
                            {active && <div className="w-6 h-6 rounded-full bg-cyan-400 flex items-center justify-center"><Check size={14} className="text-black" /></div>}
                          </div>
                          <p className="text-gray-400 text-xs leading-relaxed mb-2">{role.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {role.skills.map((s, i) => <span key={i} className="px-2 py-0.5 rounded-full bg-white/[0.05] text-xs text-gray-400">{s}</span>)}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="p-10 md:p-14 flex items-center">
            <form onSubmit={handleSignup} className="w-full">
              <div className="flex items-center gap-2 text-purple-400 mb-5">
                <Sparkles size={16} />
                <span className="text-sm font-medium">Step 2 of 2 — Create your account</span>
              </div>

              <h2 className="text-4xl font-bold mb-2">Create Account</h2>
              <p className="text-gray-400 mb-8">Start your personalized AI interview journey.</p>

              {error && (
                <div className="flex items-center gap-3 rounded-2xl bg-red-500/10 border border-red-500/20 px-5 py-4 mb-6 text-red-400 text-sm">
                  <AlertCircle size={16} className="shrink-0" />
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <input
                  type="text" name="name" placeholder="Full Name"
                  value={formData.name} onChange={handleChange}
                  className="w-full h-14 rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-white placeholder:text-gray-500 outline-none focus:border-cyan-400/40 transition-all"
                  required
                />
                <input
                  type="email" name="email" placeholder="Email Address"
                  value={formData.email} onChange={handleChange}
                  className="w-full h-14 rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-white placeholder:text-gray-500 outline-none focus:border-cyan-400/40 transition-all"
                  required
                />
                <input
                  type="password" name="password" placeholder="Password (min. 6 characters)"
                  value={formData.password} onChange={handleChange}
                  className="w-full h-14 rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-white placeholder:text-gray-500 outline-none focus:border-cyan-400/40 transition-all"
                  required
                />
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold text-base flex items-center justify-center gap-3 mt-8 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <><span>Create Account</span><ArrowRight size={20} /></>}
              </button>

              <p className="text-center text-gray-400 text-sm mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-cyan-400 font-medium hover:text-cyan-300 transition">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
