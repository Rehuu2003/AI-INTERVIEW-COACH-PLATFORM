import api from "../api/axios";

export async function analyzeResumeFile(file, targetRole = "") {
  const form = new FormData();
  form.append("resume", file);
  if (targetRole) form.append("targetRole", targetRole);

  const { data } = await api.post("/resume/analyze", form, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 120000,
  });
  return data.data;
}

export async function fetchResumeHistory() {
  const { data } = await api.get("/resume");
  return data.data;
}
