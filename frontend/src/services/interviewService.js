import api from "../api/axios";

export async function startInterview({ topic, difficulty = "medium", type = "mixed" }) {
  const { data } = await api.post("/interviews/start", { topic, difficulty, type });
  return data.data;
}

export async function sendMessage(interviewId, message) {
  const { data } = await api.post(`/interviews/${interviewId}/message`, { message });
  return data.data;
}

export async function completeInterview(interviewId) {
  const { data } = await api.post(`/interviews/${interviewId}/complete`);
  return data.data;
}

export async function abandonInterview(interviewId) {
  const { data } = await api.patch(`/interviews/${interviewId}/abandon`);
  return data;
}

export async function getInterview(interviewId) {
  const { data } = await api.get(`/interviews/${interviewId}`);
  return data.data;
}

export async function listInterviews(params = {}) {
  const { data } = await api.get("/interviews", { params });
  return data;
}
