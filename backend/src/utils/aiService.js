/**
 * Minimal placeholder AI service.
 * Replace with real LLM calls (OpenAI/Vertex/etc.) as needed.
 */

const generateFollowUp = (lastAnswer) => {
  // Very simple heuristic: ask for clarification on long answers or ask a probing question
  if (!lastAnswer) return 'Tell me about a challenge you faced and how you resolved it.';
  if (lastAnswer.length > 180) return 'That was detailed — what did you learn from that experience?';
  if (lastAnswer.toLowerCase().includes('team')) return 'Describe a time you disagreed with a teammate. How did you handle it?';
  return 'Can you give a specific example to illustrate that?';
};

const analyzeTranscript = (messages) => {
  const joined = messages.map(m => m.text).join(' ');
  const words = joined.split(/\s+/).filter(Boolean).length;
  const confidence = Math.min(100, Math.round((words / 50) * 10));
  const communication = Math.min(100, Math.round((Math.max(0, 10 - (joined.split(/[.,!?]/).length - 1))) * 10));

  // weakness detection: naive keyword scan
  const weaknesses = [];
  if (joined.toLowerCase().includes('uh') || joined.toLowerCase().includes('um')) weaknesses.push('Filler words');
  if (joined.length < 40) weaknesses.push('Short answers');

  return { confidence, communication, words, weaknesses };
};

module.exports = { generateFollowUp, analyzeTranscript };
