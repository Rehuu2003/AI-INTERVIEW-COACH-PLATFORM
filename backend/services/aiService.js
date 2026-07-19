const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


/**
 * Builds the system prompt for the AI interviewer
 */
const buildSystemPrompt = (topic, difficulty, type) => {
  return `You are an expert technical interviewer conducting a ${difficulty} ${type} interview on the topic: "${topic}".

Your role:
- Ask ONE focused question at a time
- After each candidate answer, give a brief acknowledgment (1-2 sentences max), then ask a natural follow-up question based on their response
- Dynamically adjust question depth based on the quality of the candidate's answers
- Cover a breadth of sub-topics within "${topic}"
- Be professional, encouraging, yet rigorous

Interview style:
- Start with a warm introduction and your first question
- Follow up with deeper probing questions when answers are shallow
- Ask clarifying questions when answers are vague
- Transition to different sub-topics naturally
- After about 8-10 exchanges, you can start wrapping up

Important rules:
- NEVER provide the answer yourself
- NEVER break character
- NEVER ask multiple questions at once
- Keep your responses concise (under 80 words unless absolutely necessary)`;
};

/**
 * Get the next AI interviewer message based on conversation history
 */
const getNextInterviewMessage = async (messages, topic, difficulty, type) => {
  const systemPrompt = buildSystemPrompt(topic, difficulty, type);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const parts = [
    { text: systemPrompt },
    ...messages.map((m) => ({ text: `${m.role === "assistant" ? "Interviewer" : "Candidate"}: ${m.content}` })),
    { text: "\nInterviewer:" },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
  });

  const text = result.response.text();
  return text.trim();
};


/**
 * Analyze the full interview transcript and generate scores + feedback
 */
const analyzeInterview = async (messages, topic, type) => {
  const transcript = messages
    .map((m) => `${m.role === 'assistant' ? 'Interviewer' : 'Candidate'}: ${m.content}`)
    .join('\n\n');

  const prompt = `You are an expert interview evaluator. Analyze this ${type} interview transcript on "${topic}" and provide structured JSON feedback.

TRANSCRIPT:
${transcript}

Return ONLY valid JSON with this exact structure:
{
  "overallScore": <0-100 integer>,
  "scoreBreakdown": {
    "technicalKnowledge": <0-100>,
    "communication": <0-100>,
    "confidence": <0-100>,
    "problemSolving": <0-100>,
    "clarity": <0-100>
  },
  "feedback": {
    "summary": "<2-3 sentence overall summary>",
    "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
    "weaknesses": ["<weakness 1>", "<weakness 2>"],
    "improvements": ["<actionable tip 1>", "<actionable tip 2>", "<actionable tip 3>"],
    "detailedAnalysis": "<3-4 sentence in-depth analysis of technical depth, communication style, and confidence>"
  }
}

Scoring rubric:
- technicalKnowledge: Accuracy and depth of technical answers
- communication: Clarity, structure, and articulation
- confidence: Decisiveness, tone, and assertiveness
- problemSolving: Ability to break down and reason through problems
- clarity: How well ideas were explained and organized`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { maxOutputTokens: 800, temperature: 0.3 },
  });

  const raw = result.response.text().trim();
  // Ensure we parse the first JSON object found.
  const firstJsonStart = raw.indexOf("{");
  const firstJsonEnd = raw.lastIndexOf("}");
  const jsonStr = firstJsonStart >= 0 && firstJsonEnd >= 0 ? raw.slice(firstJsonStart, firstJsonEnd + 1) : raw;
  return JSON.parse(jsonStr);
};


module.exports = { getNextInterviewMessage, analyzeInterview };
