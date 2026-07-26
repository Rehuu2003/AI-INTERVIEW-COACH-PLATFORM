export function formatTimeAgo(date) {
  if (!date) return "—";
  const then = new Date(date).getTime();
  const diff = Date.now() - then;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(date).toLocaleDateString();
}

export function scoreToGrade(score) {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B+";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  return "D";
}

export function calcWeeklyGrowth(trend) {
  if (!trend?.length || trend.length < 2) return 0;
  const recent = trend.slice(-7);
  if (recent.length < 2) return 0;
  const first = recent[0].overallScore || 0;
  const last = recent[recent.length - 1].overallScore || 0;
  if (first === 0) return last > 0 ? 100 : 0;
  return Math.round(((last - first) / first) * 100);
}

export function calcStreak(completedDates) {
  if (!completedDates?.length) return 0;
  const days = [...new Set(
    completedDates.map((d) => new Date(d).toDateString())
  )].sort((a, b) => new Date(b) - new Date(a));

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < days.length; i++) {
    const day = new Date(days[i]);
    day.setHours(0, 0, 0, 0);
    const expected = new Date(today);
    expected.setDate(today.getDate() - i);
    if (day.getTime() === expected.getTime()) streak++;
    else if (i === 0 && day.getTime() === expected.getTime() - 86400000) {
      streak++;
    } else break;
  }
  return streak;
}

export function areaLabel(key) {
  const labels = {
    technicalKnowledge: "Technical",
    communication: "Communication",
    confidence: "Confidence",
    problemSolving: "Problem Solving",
    clarity: "Clarity",
  };
  return labels[key] || key;
}

export function getUserRole(user) {
  return user?.targetRole || user?.role || "frontend";
}
