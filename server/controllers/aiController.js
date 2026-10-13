
const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

const apiKey = process.env.AI_API_KEY;

if (!apiKey) {
    console.error("AI_API_KEY is missing from server/.env");
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_INSTRUCTION = `
You are the AI Tutor for AI Campus Companion, a college student
management app. Explain academic concepts clearly and patiently.
Use examples when helpful. Break complex topics into manageable steps.
Do not claim to know the student's real-time schedule, notes, or grades
unless that information is explicitly provided in the conversation.
`;

const generateAIResponse = async (req, res) => {
    try {
        if (!ai) {
            return res.status(500).json({
                message: "AI Tutor is not configured. Please check the server configuration."
            });
        }

        const { messages, message } = req.body || {};
        const conversation = [];

        if (Array.isArray(messages)) {
            messages.slice(-10).forEach((msg) => {
                if (typeof msg.text !== "string" || !msg.text.trim()) {
                    return;
                }

                conversation.push({
                    role: msg.sender === "user" ? "user" : "model",
                    parts: [{ text: msg.text.trim() }]
                });
            });
        }

        // Avoid adding the latest question twice if it is already in history.
        if (typeof message === "string" && message.trim()) {
            const lastMessage = conversation[conversation.length - 1];
            if (
                !lastMessage ||
                lastMessage.role !== "user" ||
                lastMessage.parts[0].text !== message.trim()
            ) {
                conversation.push({
                    role: "user",
                    parts: [{ text: message.trim() }]
                });
            }
        }

        if (conversation.length === 0) {
            return res.status(400).json({
                message: "Please enter a question for the AI Tutor."
            });
        }

        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: conversation,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                maxOutputTokens: 500
            }
        });

        const reply = response.text;

        if (!reply) {
            return res.status(502).json({
                message: "The AI Tutor returned an empty response. Please try again."
            });
        }

        return res.status(200).json({ reply });
    } catch (error) {
        // Never log API keys or environment variables.
        console.error("AI Tutor request failed:", error.message);

        return res.status(500).json({
            message: "Failed to fetch an AI Tutor response. Please try again."
        });
    }
};

module.exports = { generateAIResponse };
