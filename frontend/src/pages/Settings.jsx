import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import {
  User, Shield, Brain, Save, Loader2, CheckCircle2, AlertCircle,
} from "lucide-react";

const Settings = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const displayName = user?.name || "User";
  const initial = displayName.charAt(0).toUpperCase();

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "ai", label: "AI Preferences", icon: Brain },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-8">

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-8 lg:p-10"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/8 blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <h1 className="text-4xl font-bold mb-3">Settings</h1>
            <p className="text-gray-400 leading-relaxed">Manage your profile, security and AI preferences.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-black text-2xl font-black">
              {initial}
            </div>
            <div>
              <h2 className="text-xl font-bold">{displayName}</h2>
              <p className="text-gray-400 text-sm capitalize">{user?.role || "Member"}</p>
              <p className="text-gray-500 text-xs mt-1">{user?.email}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-8">

        {/* Tab Nav */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-4 h-fit"
        >
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-sm font-medium text-left ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-cyan-500/15 to-purple-500/15 border border-cyan-500/20 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <div>
          {activeTab === "profile" && <ProfileTab user={user} />}
          {activeTab === "security" && <SecurityTab logout={logout} />}
          {activeTab === "ai" && <AITab />}
        </div>
      </div>
    </div>
  );
};

/* ─── Profile Tab ───────────────────────────────────────── */
const ProfileTab = ({ user }) => {
  const [form, setForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    targetRole: user?.targetRole || "",
  });
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setStatus(null);
    try {
      await api.put("/profile", form);
      const stored = JSON.parse(localStorage.getItem("aiUser") || "{}");
      localStorage.setItem("aiUser", JSON.stringify({ ...stored, ...form }));
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-8"
    >
      <h2 className="text-2xl font-bold mb-2">Profile Information</h2>
      <p className="text-gray-400 text-sm mb-8">Update your account details.</p>

      {status === "success" && (
        <div className="flex items-center gap-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-5 py-3 mb-6 text-emerald-400 text-sm">
          <CheckCircle2 size={16} /> Changes saved successfully.
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/20 px-5 py-3 mb-6 text-red-400 text-sm">
          <AlertCircle size={16} /> Failed to save. Please try again.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-5">
        {[
          { label: "Full Name", key: "name", type: "text" },
          { label: "Email Address", key: "email", type: "email", disabled: true, value: user?.email },
          { label: "Target Role", key: "targetRole", type: "text" },
          { label: "Bio", key: "bio", type: "text" },
        ].map((field) => (
          <div key={field.key}>
            <label className="block text-gray-400 text-sm mb-2">{field.label}</label>
            <input
              type={field.type}
              value={field.disabled ? field.value : form[field.key]}
              onChange={(e) => !field.disabled && setForm({ ...form, [field.key]: e.target.value })}
              disabled={field.disabled}
              className="w-full h-14 rounded-xl border border-white/10 bg-white/[0.04] px-5 text-white placeholder:text-gray-500 outline-none focus:border-cyan-400/40 transition disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSave} disabled={loading}
        className="mt-8 h-12 px-8 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold flex items-center gap-3 hover:scale-[1.02] transition disabled:opacity-60"
      >
        {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
        Save Changes
      </button>
    </motion.div>
  );
};

/* ─── Security Tab ──────────────────────────────────────── */
const SecurityTab = ({ logout }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (form.newPassword !== form.confirm) { setStatus("mismatch"); return; }
    if (form.newPassword.length < 6) { setStatus("short"); return; }
    setLoading(true);
    setStatus(null);
    try {
      await api.put("/profile/password", { currentPassword: form.currentPassword, newPassword: form.newPassword });
      setStatus("success");
      setForm({ currentPassword: "", newPassword: "", confirm: "" });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const messages = {
    success: { type: "success", text: "Password updated successfully." },
    error: { type: "error", text: "Current password is incorrect." },
    mismatch: { type: "error", text: "New passwords don't match." },
    short: { type: "error", text: "Password must be at least 6 characters." },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-8">
        <h2 className="text-2xl font-bold mb-2">Change Password</h2>
        <p className="text-gray-400 text-sm mb-8">Keep your account secure.</p>

        {status && messages[status] && (
          <div className={`flex items-center gap-3 rounded-xl px-5 py-3 mb-6 text-sm ${
            messages[status].type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
              : "bg-red-500/10 border border-red-500/20 text-red-400"
          }`}>
            {messages[status].type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {messages[status].text}
          </div>
        )}

        <div className="space-y-4">
          {[
            { label: "Current Password", name: "currentPassword" },
            { label: "New Password", name: "newPassword" },
            { label: "Confirm New Password", name: "confirm" },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-gray-400 text-sm mb-2">{f.label}</label>
              <input
                type="password" name={f.name} value={form[f.name]}
                onChange={handleChange}
                className="w-full h-14 rounded-xl border border-white/10 bg-white/[0.04] px-5 text-white outline-none focus:border-cyan-400/40 transition"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSave} disabled={loading}
          className="mt-8 h-12 px-8 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold flex items-center gap-3 hover:scale-[1.02] transition disabled:opacity-60"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Update Password
        </button>
      </div>

      <div className="rounded-[28px] border border-red-500/15 bg-red-500/5 p-8">
        <h2 className="text-xl font-bold mb-2 text-red-400">Danger Zone</h2>
        <p className="text-gray-400 text-sm mb-6">Permanently delete your account and all data. This cannot be undone.</p>
        <button
          onClick={() => { if (window.confirm("Delete your account permanently? This cannot be undone.")) { logout(); } }}
          className="h-12 px-8 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium transition text-sm"
        >
          Delete Account
        </button>
      </div>
    </motion.div>
  );
};

/* ─── AI Tab ────────────────────────────────────────────── */
const AITab = () => {
  const [prefs, setPrefs] = useState({
    realtimeFeedback: true,
    voiceAnalysis: true,
    confidenceTracking: true,
    advancedAnalytics: true,
  });

  const toggle = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const items = [
    { key: "realtimeFeedback", label: "Real-time AI Feedback", desc: "Get instant scoring after each answer" },
    { key: "voiceAnalysis", label: "Voice Analysis", desc: "Analyse tone and speech patterns" },
    { key: "confidenceTracking", label: "Confidence Tracking", desc: "Monitor confidence scores across sessions" },
    { key: "advancedAnalytics", label: "Advanced Analytics", desc: "Detailed breakdown of performance metrics" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-8"
    >
      <h2 className="text-2xl font-bold mb-2">AI Preferences</h2>
      <p className="text-gray-400 text-sm mb-8">Configure your AI interview experience.</p>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.key} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <div>
              <h4 className="font-semibold text-sm">{item.label}</h4>
              <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
            </div>
            <button
              onClick={() => toggle(item.key)}
              className={`w-14 h-7 rounded-full relative transition-all duration-300 ${
                prefs[item.key] ? "bg-gradient-to-r from-cyan-400 to-purple-500" : "bg-white/10"
              }`}
            >
              <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all duration-300 ${
                prefs[item.key] ? "right-1" : "left-1"
              }`} />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};


export default Settings;
