
import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  /* ========================================= */
  /* LOGIN */
  /* ========================================= */

 const handleSubmit = async (e) => {
    e.preventDefault();

    /* EXISTING USER */

    const existingUser =
      JSON.parse(
        localStorage.getItem(
          "aiUser"
        )
      ) || {};

    /* USER DATA */

    const userData = {
      name:
        existingUser.name ||
        "User",

      email:
        formData.email,

      role:
        existingUser.role ||
        "Frontend Developer",

      interviews:
        existingUser.interviews ||
        0,

      score:
        existingUser.score || 0,

      growth:
        existingUser.growth ||
        0,
    };

    /* TOKEN */

    localStorage.setItem(
      "token",
      "demo-token"
    );

    /* SAVE USER */

    localStorage.setItem(
      "aiUser",
      JSON.stringify(userData)
    );

    /* CONTEXT LOGIN */

    login(
      formData.email,
      formData.password
    );

    /* REDIRECT */

    const success =
  await login(
    formData.email,
    formData.password
  );

if (success) {
  navigate("/dashboard");
} else {
  alert(
    "Invalid credentials"
  );
}
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0b0f19] premium-grid flex items-center justify-center px-6">
      
      {/* LIGHTS */}
      <div className="purple-light top-[-150px] left-[-120px]" />

      <div className="blue-light bottom-[-150px] right-[-120px]" />

      {/* CARD */}
      <div className="relative z-10 w-full max-w-[1200px] grid lg:grid-cols-2 rounded-[36px] overflow-hidden glass-card">
        
        {/* LEFT */}
        <div className="relative hidden lg:flex flex-col justify-between p-14 border-r border-white/5 overflow-hidden">
          
          <div className="absolute top-[-80px] right-[-80px] w-[260px] h-[260px] rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative z-10">
            
            {/* LOGO */}
            <div className="flex items-center gap-4 mb-20">
              
              <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center font-bold text-xl">
                IQ
              </div>

              <div>
                
                <h1 className="text-2xl font-semibold">
                  InterviewIQ
                </h1>

                <p className="text-gray-500 text-sm">
                  AI Interview Platform
                </p>
              </div>
            </div>

            {/* HERO */}
            <div className="max-w-xl">
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 text-sm text-gray-300">
                
                <Sparkles size={16} />

                AI-Powered Career Preparation
              </div>

              <h2 className="text-6xl font-bold leading-[1.05] tracking-tight mb-8">
                Train for interviews with intelligent AI feedback.
              </h2>

              <p className="text-xl text-gray-400 leading-relaxed">
                Practice technical and behavioral interviews with real-time speech analysis, confidence tracking, and AI-powered improvement suggestions.
              </p>
            </div>
          </div>

          {/* STATS */}
          <div className="relative z-10 grid grid-cols-2 gap-5">
            
            {[
              {
                title: "50K+",
                text: "Mock interviews completed",
              },

              {
                title: "92%",
                text: "Average confidence improvement",
              },

              {
                title: "Real-time",
                text: "Speech & communication analysis",
              },

              {
                title: "AI Driven",
                text: "Personalized interview coaching",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white/5 border border-white/5 p-6"
              >
                
                <h3 className="text-3xl font-bold mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex items-center justify-center p-8 lg:p-14">
          
          <div className="absolute bottom-0 left-0 w-[240px] h-[240px] rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative z-10 w-full max-w-md">
            
            {/* MOBILE LOGO */}
            <div className="lg:hidden flex items-center gap-4 mb-10">
              
              <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center font-bold">
                IQ
              </div>

              <div>
                
                <h1 className="text-xl font-semibold">
                  InterviewIQ
                </h1>

                <p className="text-sm text-gray-500">
                  AI Interview Platform
                </p>
              </div>
            </div>

            {/* HEADER */}
            <div className="mb-10">
              
              <p className="text-sm text-indigo-400 mb-4">
                WELCOME BACK
              </p>

              <h1 className="text-5xl font-bold tracking-tight mb-5">
                Sign in
              </h1>

              <p className="text-gray-400 text-lg leading-relaxed">
                Continue your AI interview journey and track your performance growth.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={
                handleSubmit
              }
              autoComplete="off"
              className="space-y-5"
            >
              
              {/* EMAIL */}
              <div>
                
                <label className="block text-sm text-gray-400 mb-3">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your email"
                  className="premium-input"
                  autoComplete="username"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div>
                
                <label className="block text-sm text-gray-400 mb-3">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={
                    formData.password
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter password"
                  className="premium-input"
                  autoComplete="new-password"
                  required
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="premium-button w-full flex items-center justify-center gap-3"
              >
                
                Continue

                <ArrowRight
                  size={18}
                />
              </button>
            </form>

            {/* FOOTER */}
            <p className="mt-8 text-gray-500">
              Don’t have an account?{" "}
              
              <Link
                to="/signup"
                className="text-white hover:text-indigo-400 transition"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

