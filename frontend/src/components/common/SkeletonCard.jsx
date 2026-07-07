const SkeletonCard = () => {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 animate-pulse">
      
      <div className="w-16 h-16 rounded-2xl bg-white/10 mb-8" />

      <div className="h-6 w-40 rounded-full bg-white/10 mb-4" />

      <div className="h-12 w-24 rounded-full bg-white/10 mb-6" />

      <div className="h-3 w-full rounded-full bg-white/10 mb-3" />

      <div className="h-3 w-2/3 rounded-full bg-white/10" />
    </div>
  );
};

export default SkeletonCard;