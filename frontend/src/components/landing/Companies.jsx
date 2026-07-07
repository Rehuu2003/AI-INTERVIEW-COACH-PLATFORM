const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Netflix",
  "Apple",
  "OpenAI",
  "Spotify",
  "Uber",
  "Airbnb",
];

const Companies = () => {
  return (
    <section className="py-20 overflow-hidden relative">
      
      {/* TOP TEXT */}
      <div className="text-center mb-12">
        
        <p className="text-gray-400 uppercase tracking-[4px] text-sm mb-4">
          Trusted by engineers from
        </p>

        <h2 className="text-4xl md:text-5xl font-black">
          World Class
          <span className="gradient-text">
            {" "}
            Companies
          </span>
        </h2>
      </div>

      {/* GRADIENT FADES */}
      <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-[#050816] to-transparent z-10" />

      <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-[#050816] to-transparent z-10" />

      {/* MARQUEE */}
      <div className="flex gap-8 whitespace-nowrap animate-[marquee_20s_linear_infinite]">
        
        {[...companies, ...companies].map(
          (company, index) => (
            <div
              key={index}
              className="glass px-10 py-5 rounded-3xl min-w-fit hover:scale-105 transition-all duration-300"
            >
              
              <h3 className="text-2xl md:text-3xl font-black text-white/90">
                {company}
              </h3>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Companies;