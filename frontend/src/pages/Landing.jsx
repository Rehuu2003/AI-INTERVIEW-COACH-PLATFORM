import Navbar from "../components/common/Navbar";

import Hero from "../components/landing/Hero";
import Companies from "../components/landing/Companies";
import Features from "../components/landing/Features";
import Analytics from "../components/landing/Analytics";
import Testimonials from "../components/landing/Testimonials";
import Pricing from "../components/landing/Pricing";

import Footer from "../components/common/Footer";

const Landing = () => {
  return (
    <div className="relative min-h-screen bg-[#050816] text-white overflow-hidden">
      
      {/* PREMIUM BACKGROUND LIGHTS */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        
        <div className="absolute top-[-120px] left-[8%] w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

        <div className="absolute bottom-[-180px] right-[10%] w-[500px] h-[500px] bg-purple-500/10 blur-[140px] rounded-full" />
      </div>

      {/* CONTENT */}

      <div className="relative z-10">
        
        <Navbar />

      <Hero />

      <Companies />

      <section id="features">
        <Features />
      </section>

      <section id="analytics">
        <Analytics />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>

      <section id="pricing">
        <Pricing />
      </section>

        <Footer />
      </div>
    </div>
  );
};

export default Landing;

