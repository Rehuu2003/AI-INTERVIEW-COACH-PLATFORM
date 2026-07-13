
import { useState } from "react";

import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  Sparkles,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] =
    useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  /* SCROLL FUNCTION */

  const handleScroll = (id) => {
    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const section =
          document.getElementById(id);

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
          });
        }
      }, 200);

      return;
    }

    const section =
      document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const navLinks = [
    {
      name: "Features",
      id: "features",
    },

    {
      name: "Analytics",
      id: "analytics",
    },

    {
      name: "Testimonials",
      id: "testimonials",
    },

    {
      name: "Pricing",
      id: "pricing",
    },
  ];

  return (
    <>
      <motion.nav
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 pt-5"
      >
        
        <div className="max-w-7xl mx-auto">
          
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-[0_0_40px_rgba(0,255,255,0.05)]">

            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5" />

            <div className="relative z-10 flex items-center justify-between px-6 md:px-8 py-4">

              {/* LOGO */}

              <button
                onClick={() => {
                  if (location.pathname === "/") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    navigate("/");
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }, 100);
                  }
                }}
                className="flex items-center gap-4"
              >
                
                <div className="relative">

                  <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-40" />

                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.35)]">

                    <Sparkles
                      size={28}
                      className="text-black"
                    />
                  </div>
                </div>

                <div>
                  
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    InterviewIQ
                  </h1>

                  <p className="text-xs text-gray-400 mt-1">
                    Premium AI Workspace
                  </p>
                </div>
              </button>

              {/* DESKTOP */}

              <div className="hidden lg:flex items-center gap-3">

                {navLinks.map((item, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleScroll(
                        item.id
                      )
                    }
                    className="premium-hover relative px-5 py-3 rounded-2xl text-gray-300 hover:text-white hover:bg-white/[0.05] transition-all duration-300 font-medium"
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* RIGHT */}

              <div className="hidden lg:flex items-center gap-4">

                <NavLink
                  to="/login"
                  className="premium-hover px-6 py-3 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-white font-semibold transition-all duration-300"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  className="premium-button-hover group relative overflow-hidden px-7 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-black flex items-center gap-3 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.25)]"
                >

                  <span className="relative z-10">
                    Get Started
                  </span>

                  <ArrowRight
                    size={18}
                    className="relative z-10 group-hover:translate-x-1 transition"
                  />
                </NavLink>
              </div>

              {/* MOBILE BTN */}

              <button
                onClick={() =>
                  setMobileMenu(true)
                }
                className="lg:hidden w-12 h-12 rounded-2xl border border-white/10 bg-white/[0.05] flex items-center justify-center text-white"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}

      {mobileMenu && (
        <div className="fixed inset-0 z-[60] lg:hidden">

          <div
            onClick={() =>
              setMobileMenu(false)
            }
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              duration: 0.3,
            }}
            className="absolute top-0 right-0 w-[85%] max-w-[340px] h-full bg-[#081120] border-l border-white/10 p-6"
          >

            <div className="flex items-center justify-between mb-10">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">

                  <Sparkles
                    size={24}
                    className="text-black"
                  />
                </div>

                <div>

                  <h2 className="text-xl font-black text-white">
                    InterviewIQ
                  </h2>

                  <p className="text-xs text-gray-400">
                    Premium Workspace
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  setMobileMenu(false)
                }
                className="w-11 h-11 rounded-2xl bg-white/[0.05] flex items-center justify-center text-white"
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-3">

              {navLinks.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleScroll(
                      item.id
                    );

                    setMobileMenu(false);
                  }}
                  className="w-full text-left px-5 py-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] text-white font-semibold transition-all duration-300"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Navbar;

