const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const returnGeminiResponse = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
        return responseText;
    } catch (error) {
        return error;
    }
};

module.exports = returnGeminiResponse;