import { Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

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
                Join thousands of candidates who already use InterviewIQ.
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
              AI-powered mock interviews, real-time analytics, and communication feedback for modern hiring.
            </p>
          </div>

          {[
            { heading: "Product", links: ["Features", "Analytics", "Pricing", "AI Feedback", "Mock Interviews"] },
            { heading: "Company", links: ["About", "Blog", "Careers", "Contact", "Privacy Policy"] },
            { heading: "Support", links: ["Documentation", "Community", "Status", "Changelog"] },
          ].map((col, i) => (
            <div key={i}>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">{col.heading}</p>
              <div className="space-y-3">
                {col.links.map((l, j) => (
                  <a key={j} href="#" className="block text-sm text-zinc-500 hover:text-zinc-200 transition-colors">{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="text-zinc-600 text-xs">© 2026 InterviewIQ. All rights reserved.</p>

          <div className="flex items-center gap-3">
            {[FaTwitter, FaGithub, FaLinkedin].map((Icon, i) => (
              <button key={i} className="w-8 h-8 rounded-lg border border-white/[0.07] bg-white/[0.03] flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.06] transition-all">
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
