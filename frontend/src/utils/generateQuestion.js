import { model } from "../services/gemini";

export const generateQuestion =
  async ({
    role,
    difficulty,
    previousAnswer,
  }) => {
    try {
      const prompt = `
You are a professional AI interviewer.

Generate ONE interview question for a ${role} candidate.

Difficulty level: ${difficulty}

Previous candidate answer:
"${previousAnswer || "No previous answer"}"

Rules:
- Ask only ONE question
- Keep it realistic
- Make it concise
- Technical but human-like
- No numbering
- No extra explanation
`;

      const result =
        await model.generateContent(
          prompt
        );

      const response =
        await result.response;

      const text =
        response.text();

      return text;
    } catch (error) {
      console.error(error);

      return "Tell me about a challenging project you worked on recently.";
    }
  };