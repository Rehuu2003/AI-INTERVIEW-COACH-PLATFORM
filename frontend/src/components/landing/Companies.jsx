const companies = ["Google", "Microsoft", "Amazon", "Meta", "Netflix", "Apple", "OpenAI", "Spotify", "Uber", "Airbnb"];

const Companies = () => {
  return (
    <section className="bg-[#09090b] py-16 overflow-hidden relative border-y border-white/[0.05]">
      <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-[#09090b] to-transparent z-10" />
      <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[#09090b] to-transparent z-10" />

      <p className="text-center text-xs text-zinc-600 uppercase tracking-widest mb-8 font-medium">
        Engineers from world-class companies trust InterviewIQ
      </p>

      <div className="overflow-hidden">
        <div className="marquee-track flex w-max gap-4 whitespace-nowrap">
          {[...companies, ...companies].map((c, i) => (
            <div
              key={`${c}-${i}`}
              className="px-6 py-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] text-zinc-500 text-sm font-semibold tracking-wide hover:text-zinc-300 hover:border-white/[0.10] transition-all duration-200 cursor-default"
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;
