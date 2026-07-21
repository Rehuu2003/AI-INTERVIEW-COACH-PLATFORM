import api from "../api/axios";

export async function fetchAnalyticsSummary() {
  const { data } = await api.get("/analytics/summary");
  return data.data;
}

export async function fetchProgress(limit = 20) {
  const { data } = await api.get("/analytics/progress", { params: { limit } });
  return data.data;
}

export async function fetchWeaknesses() {
  const { data } = await api.get("/analytics/weaknesses");
  return data.data;
}

export async function fetchHistory(limit = 10) {
  const { data } = await api.get("/analytics/history", { params: { limit } });
  return data.data;
}

export async function fetchProfileStats() {
  const { data } = await api.get("/profile/stats");
  return data.data;
}
