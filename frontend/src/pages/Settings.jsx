import { motion } from "framer-motion";

import {
  User,
  Shield,
  Bell,
  Brain,
  Lock,
  Moon,
  Sparkles,
  Save,
  ChevronRight,
} from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-8">
      
      {/* HERO */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#081120] via-[#0b1220] to-[#111827] p-10"
      >
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px]" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          
          <div>
            
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 mb-8">
              
              <Sparkles
                size={16}
                className="text-cyan-400"
              />

              <span className="text-cyan-300 text-sm font-medium">
                Workspace Settings
              </span>
            </div>

            <h1 className="text-5xl font-black text-white leading-tight mb-6">
              
              Personalize your
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {" "}
                AI workspace
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              Manage profile settings, AI preferences,
              notifications, privacy, and workspace personalization.
            </p>
          </div>

          {/* PROFILE */}

          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl p-8 min-w-[320px]">
            
            <div className="flex items-center gap-5 mb-8">
              
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-black text-4xl font-black shadow-[0_0_40px_rgba(34,211,238,0.25)]">
                M
              </div>

              <div>
                
                <h2 className="text-3xl font-black text-white mb-2">
                  Mujtaba
                </h2>

                <p className="text-gray-400">
                  Premium Member
                </p>
              </div>
            </div>

            <button className="w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-black hover:scale-[1.02] transition">
              Edit Profile
            </button>
          </div>
        </div>
      </motion.div>

      {/* SETTINGS GRID */}

      <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-8">
        
        {/* LEFT MENU */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-[36px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-6 h-fit"
        >
          
          <div className="space-y-3">
            
            {[
              {
                name: "Profile",
                icon: User,
              },

              {
                name: "Security",
                icon: Shield,
              },

              {
                name: "Notifications",
                icon: Bell,
              },

              {
                name: "AI Preferences",
                icon: Brain,
              },

              {
                name: "Privacy",
                icon: Lock,
              },

              {
                name: "Appearance",
                icon: Moon,
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <button
                  key={index}
                  className={`w-full flex items-center justify-between px-5 py-5 rounded-2xl transition-all ${
                    index === 0
                      ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/20"
                      : "hover:bg-white/[0.05]"
                  }`}
                >
                  
                  <div className="flex items-center gap-4">
                    
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center">
                      
                      <Icon
                        size={22}
                        className="text-cyan-400"
                      />
                    </div>

                    <span className="text-lg font-semibold text-white">
                      {item.name}
                    </span>
                  </div>

                  <ChevronRight
                    size={18}
                    className="text-gray-500"
                  />
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}

        <div className="space-y-8">
          
          {/* PROFILE SETTINGS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-[36px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-8"
          >
            
            <div className="mb-10">
              
              <h2 className="text-3xl font-black text-white mb-3">
                Profile Information
              </h2>

              <p className="text-gray-400">
                Update your workspace details
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              
              <div>
                
                <label className="block text-gray-400 mb-3">
                  Full Name
                </label>

                <input
                  type="text"
                  defaultValue="Mujtaba Shaikh"
                  className="w-full h-16 rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-white outline-none focus:border-cyan-400 transition"
                />
              </div>

              <div>
                
                <label className="block text-gray-400 mb-3">
                  Email Address
                </label>

                <input
                  type="email"
                  defaultValue="mujtaba@gmail.com"
                  className="w-full h-16 rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-white outline-none focus:border-cyan-400 transition"
                />
              </div>

              <div>
                
                <label className="block text-gray-400 mb-3">
                  Role
                </label>

                <input
                  type="text"
                  defaultValue="Full Stack Developer"
                  className="w-full h-16 rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-white outline-none focus:border-cyan-400 transition"
                />
              </div>

              <div>
                
                <label className="block text-gray-400 mb-3">
                  Experience
                </label>

                <input
                  type="text"
                  defaultValue="2 Years"
                  className="w-full h-16 rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-white outline-none focus:border-cyan-400 transition"
                />
              </div>
            </div>

            <button className="mt-8 h-14 px-8 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-black hover:scale-[1.02] transition flex items-center gap-3">
              
              <Save size={20} />

              Save Changes
            </button>
          </motion.div>

          {/* AI SETTINGS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-[36px] border border-white/10 bg-gradient-to-br from-[#081120] to-[#111827] p-8"
          >
            
            <div className="mb-10">
              
              <h2 className="text-3xl font-black text-white mb-3">
                AI Preferences
              </h2>

              <p className="text-gray-400">
                Configure AI interview behavior
              </p>
            </div>

            <div className="space-y-6">
              
              {[
                "Enable realtime AI feedback",
                "Enable voice analysis",
                "Enable confidence tracking",
                "Enable advanced analytics",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] p-5"
                >
                  
                  <div>
                    
                    <h4 className="text-lg font-semibold text-white">
                      {item}
                    </h4>

                    <p className="text-gray-400 text-sm mt-1">
                      AI workspace configuration
                    </p>
                  </div>

                  {/* TOGGLE */}

                  <div className="w-16 h-9 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 relative cursor-pointer">
                    
                    <div className="absolute top-1 right-1 w-7 h-7 rounded-full bg-white" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* SECURITY */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-[36px] border border-red-500/10 bg-gradient-to-br from-red-500/10 to-transparent p-8"
          >
            
            <div className="mb-10">
              
              <h2 className="text-3xl font-black text-white mb-3">
                Security
              </h2>

              <p className="text-gray-400">
                Manage account protection
              </p>
            </div>

            <div className="space-y-5">
              
              <button className="w-full h-16 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition text-left px-6 text-white font-semibold">
                Change Password
              </button>

              <button className="w-full h-16 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] transition text-left px-6 text-white font-semibold">
                Enable Two-Factor Authentication
              </button>

              <button className="w-full h-16 rounded-2xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 transition text-left px-6 text-red-400 font-semibold">
                Delete Account
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;