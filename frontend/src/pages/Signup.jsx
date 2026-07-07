
import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";

import { roleConfig } from "../config/roleConfig";

const Signup = () => {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!selectedRole) {
      alert("Please select a role.");
      return;
    }

    const userData = {
      ...formData,
      role: selectedRole,
      interviews: 0,
      score: 0,
      growth: 0,
      analytics: [],
      aiInsights: [],
    };

    localStorage.setItem(
      "aiUser",
      JSON.stringify(userData)
    );

    localStorage.setItem(
  "token",
  "demo-token"
);

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-4 py-20 relative overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_30%)]" />

      {/* GRID */}

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]" />

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        className="relative z-10 w-full max-w-6xl rounded-[40px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.35)]"
      >

        <div className="grid lg:grid-cols-2">

          {/* LEFT */}

          <div className="relative p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-white/10">

            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[100px]" />

            <div className="relative z-10">

              {/* LOGO */}

              <div className="flex items-center gap-4 mb-12">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">

                  <Sparkles
                    size={32}
                    className="text-black"
                  />
                </div>

                <div>

                  <h1 className="text-3xl font-black">
                    AI Interview
                  </h1>

                  <p className="text-gray-400">
                    Personalized AI Preparation
                  </p>
                </div>
              </div>

              {/* TEXT */}

              <h2 className="text-5xl font-black leading-tight mb-6">

                Choose your
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {" "}
                  career path
                </span>
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed mb-12">
                Your AI interview experience will
                automatically adapt to your selected
                role and skillset.
              </p>

              {/* ROLE CARDS */}

              <div className="space-y-4">

                {roleConfig.map((role) => {
                  const Icon = role.icon;

                  const active =
                    selectedRole === role.id;

                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() =>
                        setSelectedRole(role.id)
                      }
                      className={`premium-hover group relative w-full rounded-[28px] border p-5 transition-all duration-300 text-left overflow-hidden ${
                        active
                          ? "border-cyan-400/40 bg-white/[0.07]"
                          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                      }`}
                    >

                      <div
                        className={`absolute inset-0 opacity-10 bg-gradient-to-r ${role.color}`}
                      />

                      <div className="relative z-10 flex items-start gap-5">

                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${role.color} flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.08)]`}
                        >

                          <Icon
                            size={30}
                            className="text-black"
                          />
                        </div>

                        <div className="flex-1">

                          <div className="flex items-center justify-between mb-2">

                            <h3 className="text-xl font-bold">
                              {role.title}
                            </h3>

                            {active && (
                              <div className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center">

                                <Check
                                  size={18}
                                  className="text-black"
                                />
                              </div>
                            )}
                          </div>

                          <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            {role.description}
                          </p>

                          <div className="flex flex-wrap gap-2">

                            {role.skills.map(
                              (skill, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 rounded-full bg-white/[0.06] text-xs text-gray-300"
                                >
                                  {skill}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="p-10 md:p-14 flex items-center">

            <form
              onSubmit={handleSignup}
              className="w-full"
            >

              <h2 className="text-4xl font-black mb-3">
                Create Account
              </h2>

              <p className="text-gray-400 mb-10">
                Start your personalized AI interview
                journey.
              </p>

              {/* INPUTS */}

              <div className="space-y-6">

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-16 rounded-2xl border border-white/10 bg-white/[0.04] px-6 outline-none focus:border-cyan-400/40 transition-all"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-16 rounded-2xl border border-white/10 bg-white/[0.04] px-6 outline-none focus:border-cyan-400/40 transition-all"
                  required
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-16 rounded-2xl border border-white/10 bg-white/[0.04] px-6 outline-none focus:border-cyan-400/40 transition-all"
                  required
                />
              </div>

              {/* BUTTON */}

              <button
                type="submit"
                className="premium-button-hover group w-full h-16 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-black text-lg flex items-center justify-center gap-3 mt-10 transition-all duration-300 shadow-[0_0_40px_rgba(34,211,238,0.25)]"
              >

                Create Account

                <ArrowRight
                  size={22}
                  className="group-hover:translate-x-1 transition"
                />
              </button>

              {/* LOGIN */}

              <p className="text-center text-gray-400 mt-8">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="text-cyan-400 font-semibold hover:text-cyan-300 transition"
                >
                  Login

                </Link>
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </div>

  );
};

export default Signup;

