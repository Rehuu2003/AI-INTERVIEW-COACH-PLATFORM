import {
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050816] px-6 pt-28 pb-10">
      
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_25%)]" />

      {/* GRID */}

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]" />

      {/* GLOW */}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan-500/10 blur-[160px]" />

      {/* CONTENT */}

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* TOP CTA */}

        <div className="rounded-[40px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-10 md:p-14 mb-20 overflow-hidden relative">
          
          {/* INNER GLOW */}

          <div className="absolute -top-20 -right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />

          <div className="grid lg:grid-cols-2 gap-10 items-center relative z-10">
            
            {/* LEFT */}

            <div>
              
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 bg-white/5 mb-8">
                
                <Sparkles
                  size={18}
                  className="text-cyan-400"
                />

                <span className="text-sm text-gray-300">
                  AI-Powered Career Growth
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6 text-white">
                
                Ready to ace your
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {" "}
                  next interview?
                </span>
              </h2>

              <p className="text-xl text-gray-400 leading-relaxed">
                Join thousands of candidates improving interview
                performance using advanced AI coaching.
              </p>
            </div>

            {/* RIGHT */}

            <div className="flex flex-col items-start lg:items-end gap-6">
              
              <Link to="/signup">
                <button className="group px-8 py-5 rounded-3xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-black text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(34,211,238,0.25)] flex items-center gap-3">
                  
                  Get Started Free

                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition"
                  />
                </button>
              </Link>

              <div className="flex flex-wrap gap-5">
                
                {[
                  "Unlimited Practice",
                  "AI Feedback",
                  "Realtime Analytics",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-emerald-400"
                    />

                    <span className="text-gray-300 text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MAIN FOOTER */}

        <div className="grid lg:grid-cols-5 gap-14 pb-20 border-b border-white/10">
          
          {/* BRAND */}

          <div className="lg:col-span-2">
            
            <Link
              to="/"
              className="flex items-center gap-4 mb-8"
            >
              
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.25)]">
                
                <Brain
                  size={32}
                  className="text-black"
                />
              </div>

              <div>
                
                <h1 className="text-4xl font-black text-white">
                  InterviewIQ
                </h1>

                <p className="text-gray-400 mt-1">
                  AI Interview Platform
                </p>
              </div>
            </Link>

            <p className="text-gray-400 text-lg leading-relaxed max-w-lg mb-10">
              Prepare smarter with AI-powered mock interviews,
              realtime analytics, and advanced communication
              feedback built for modern hiring.
            </p>

            {/* LIVE USERS */}

            <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/5">
              
              <div className="w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.9)] animate-pulse" />

              <span className="text-gray-300">
                <span className="font-bold text-white">
                  12,847
                </span>{" "}
                candidates practicing right now
              </span>
            </div>
          </div>

          {/* PRODUCT */}

          <div>
            
            <h3 className="text-2xl font-black mb-8 text-white">
              Product
            </h3>

            <div className="space-y-5">
              
              {[
                "Features",
                "Analytics",
                "AI Feedback",
                "Mock Interviews",
                "Pricing",
              ].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="block text-gray-400 hover:text-cyan-400 transition text-lg"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* COMPANY */}

          <div>
            
            <h3 className="text-2xl font-black mb-8 text-white">
              Company
            </h3>

            <div className="space-y-5">
              
              {[
                "About",
                "Careers",
                "Blog",
                "Contact",
                "Privacy Policy",
              ].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="block text-gray-400 hover:text-cyan-400 transition text-lg"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* CONNECT */}

          <div>
            
            <h3 className="text-2xl font-black mb-8 text-white">
              Connect
            </h3>

            {/* SOCIAL ICONS */}

            <div className="flex flex-wrap gap-4 mb-10">
              
              {[
                FaTwitter,
                FaGithub,
                FaLinkedin,
                FaInstagram,
              ].map((Icon, index) => (
                <button
                  key={index}
                  className="
                    group
                    w-14
                    h-14
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    flex
                    items-center
                    justify-center
                    hover:bg-cyan-500/10
                    hover:border-cyan-500/30
                    transition-all
                    duration-300
                    hover:scale-110
                  "
                >
                  <Icon
                    size={20}
                    className="
                      text-gray-300
                      group-hover:text-cyan-400
                      transition-all
                      duration-300
                    "
                  />
                </button>
              ))}
            </div>

            {/* NEWSLETTER */}

            <div>
              
              <p className="text-gray-400 mb-5 leading-relaxed">
                Subscribe for AI interview tips and updates.
              </p>

              <div className="flex items-center gap-3">
                
                <input
                  type="email"
                  placeholder="Enter email"
                  autoComplete="off"
                  className="flex-1 px-5 py-4 rounded-2xl border border-white/10 bg-white/[0.04] text-white placeholder:text-gray-500 outline-none focus:border-cyan-400/50 transition"
                />

                <button className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center hover:scale-105 transition">
                  
                  <ArrowRight
                    size={22}
                    className="text-black"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10">
          
          <p className="text-gray-500 text-center md:text-left">
            © 2025 InterviewIQ. All rights reserved.
          </p>

          <div className="flex items-center gap-4 px-5 py-3 rounded-full border border-white/10 bg-white/[0.03]">
            
            <Sparkles
              size={16}
              className="text-cyan-400"
            />

            <span className="text-sm text-gray-400">
              Built with AI-powered innovation
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;