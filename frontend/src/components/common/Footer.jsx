import { Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#09090b] border-t border-white/[0.06] px-5 pt-20 pb-10">
      <div className="max-w-6xl mx-auto">

        {/* CTA banner */}
        <div className="rounded-2xl bg-violet-600 p-8 md:p-10 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                Ready to ace your next interview?
              </h2>
              <p className="text-violet-200 text-[15px]">
                Create an account to start a role-focused practice session.
              </p>
            </div>
            <Link to="/signup" className="shrink-0">
              <button className="flex items-center gap-2 h-11 px-6 rounded-xl bg-white text-violet-700 text-sm font-bold hover:bg-violet-50 transition-all">
                Get started free <ArrowRight size={15} />
              </button>
            </Link>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
                <Zap size={14} className="text-white" fill="white" />
              </div>
              <span className="text-sm font-semibold text-white">InterviewIQ</span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              AI-assisted interview practice, answer feedback, resume analysis, and progress tracking.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Product</p>
            <div className="space-y-3">
              <Link to="/signup" className="block text-sm text-zinc-500 hover:text-zinc-200">Create account</Link>
              <Link to="/login" className="block text-sm text-zinc-500 hover:text-zinc-200">Sign in</Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="text-zinc-600 text-xs">© 2026 InterviewIQ. All rights reserved.</p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
