const { GoogleGenerativeAI } = require("@google/generative-ai");

const getModel = () => {
  if (!process.env.GEMINI_API_KEY) {
    const error = new Error('AI service is not configured. Set GEMINI_API_KEY in backend .env');
    error.status = 503;
    throw error;
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-1.5-flash' });
};


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

  const model = getModel();

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

  const model = getModel();

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { maxOutputTokens: 800, temperature: 0.3 },
  });

  const raw = result.response.text().trim();
  const firstJsonStart = raw.indexOf("{");
  const firstJsonEnd = raw.lastIndexOf("}");
  const jsonStr = firstJsonStart >= 0 && firstJsonEnd >= 0 ? raw.slice(firstJsonStart, firstJsonEnd + 1) : raw;
  try {
    return JSON.parse(jsonStr);
  } catch {
    return {
      overallScore: 70,
      scoreBreakdown: {
        technicalKnowledge: 70,
        communication: 70,
        confidence: 70,
        problemSolving: 70,
        clarity: 70,
      },
      feedback: {
        summary: "Interview completed. Enable GEMINI_API_KEY for detailed AI scoring.",
        strengths: ["Completed the full session"],
        weaknesses: ["Detailed analysis unavailable"],
        improvements: ["Retry after configuring the AI service"],
        detailedAnalysis: raw.slice(0, 500),
      },
    };
  }
};

const parseResumeJson = (raw) => {
  const firstJsonStart = raw.indexOf("{");
  const firstJsonEnd = raw.lastIndexOf("}");
  const jsonStr = firstJsonStart >= 0 && firstJsonEnd >= 0 ? raw.slice(firstJsonStart, firstJsonEnd + 1) : raw;
  return JSON.parse(jsonStr);
};

/** Evaluate one submitted answer so the interview UI can give immediate, honest coaching. */
const evaluateAnswer = async (question, answer, topic, type) => {
  const model = getModel();
  const prompt = `You are evaluating one ${type} interview answer for ${topic}.

QUESTION: ${question}
ANSWER: ${answer}

Return ONLY valid JSON in this exact shape:
{
  "technicalScore": <integer 0-100>,
  "communicationScore": <integer 0-100>,
  "confidenceScore": <integer 0-100>,
  "overallScore": <integer 0-100>,
  "strengths": "<one concise, evidence-based sentence>",
  "improvements": "<one concise, actionable sentence>"
}
Do not invent details not found in the answer.`;

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { maxOutputTokens: 250, temperature: 0.2 },
  });
  const feedback = parseResumeJson(result.response.text().trim());
  for (const key of ['technicalScore', 'communicationScore', 'confidenceScore', 'overallScore']) {
    if (!Number.isFinite(feedback[key])) throw new Error('AI evaluation response was invalid');
    feedback[key] = Math.max(0, Math.min(100, Math.round(feedback[key])));
  }
  return feedback;
};

/**
 * Analyze resume file (PDF/DOCX) via Gemini multimodal
 */
const analyzeResumeDocument = async (buffer, mimeType, fileName, targetRole = "") => {
  const model = getModel();
  const base64 = buffer.toString("base64");

  const prompt = `You are an expert ATS resume analyzer and technical recruiter.

Analyze this resume${targetRole ? ` for a ${targetRole} role` : ""}.

Return ONLY valid JSON:
{
  "atsScore": "<0-100>%",
  "technicalScore": "<0-100>%",
  "hiringScore": "<0-100>%",
  "strengths": "<2-3 sentence paragraph>",
  "improvements": "<2-3 sentence paragraph>",
  "missingSkills": "<2-3 sentence paragraph on skill gaps and keywords>"
}

File name: ${fileName}`;

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          { inlineData: { mimeType, data: base64 } },
          { text: prompt },
        ],
      },
    ],
    generationConfig: { maxOutputTokens: 900, temperature: 0.3 },
  });

  const raw = result.response.text().trim();
  return parseResumeJson(raw);
};

module.exports = { getNextInterviewMessage, analyzeInterview, analyzeResumeDocument, evaluateAnswer };
