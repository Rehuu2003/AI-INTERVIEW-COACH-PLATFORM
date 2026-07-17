import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Zap } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogo = () => {
    setMobileOpen(false);
    if (location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
    else navigate("/");
  };

  const links = [
    { label: "Features", id: "features" },
    { label: "Analytics", id: "analytics" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Pricing", id: "pricing" },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#09090b]/90 backdrop-blur-xl border-b border-white/[0.06]" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">

          {/* Logo */}
          <button onClick={handleLogo} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <span className="text-[15px] font-semibold text-white tracking-tight">InterviewIQ</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all duration-150 font-medium"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <NavLink
              to="/login"
              className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-all"
            >
              Sign in
            </NavLink>
            <NavLink
              to="/signup"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all duration-150"
            >
              Get started <ArrowRight size={14} />
            </NavLink>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.04] flex items-center justify-center text-zinc-300"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#09090b] border-b border-white/[0.06] px-5 py-4 md:hidden"
          >
            <div className="space-y-1 mb-4">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-all"
                >
                  {l.label}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2 pt-4 border-t border-white/[0.06]">
              <NavLink to="/login" onClick={() => setMobileOpen(false)} className="w-full py-2.5 rounded-lg border border-white/[0.08] text-sm font-medium text-center text-zinc-300 hover:bg-white/[0.05] transition-all">
                Sign in
              </NavLink>
              <NavLink to="/signup" onClick={() => setMobileOpen(false)} className="w-full py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-sm font-semibold text-center text-white transition-all">
                Get started
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
