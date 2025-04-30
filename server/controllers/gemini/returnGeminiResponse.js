const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const cleanMarkdown = (text) => {
  return text
    .replace(/[*`]+/g, '')                      // Remove *, **, `
    .replace(/(\.)(\s)([A-Z])/g, '$1\n$3')      // Add line break after sentence
    .replace(/\s{2,}/g, ' ')                    // Optional: normalize excessive spaces
    .replace(/(\d+\.)\s+/g, '\n$1 ')            // Add newline before numbered points
    .replace(/([-–•])\s+/g, '\n$1 ')            // Add newline before bullets
    .trim();
};

const returnGeminiResponse = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    return cleanMarkdown(responseText);
  } catch (error) {
    return error;
  }
};

module.exports = returnGeminiResponse;
