import Navbar from "../components/common/Navbar";

import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";

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

      <section id="features">
        <Features />
      </section>


        <Footer />
      </div>
    </div>
  );
};

export default Landing;

