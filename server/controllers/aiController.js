const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + '/../.env' });

if (!process.env.AI_API_KEY) {
    console.error("CRITICAL ERROR: AI_API_KEY is missing from environment variables.");
} else {
    console.log("AI_API_KEY loaded successfully. Starts with:", process.env.AI_API_KEY.substring(0, 7) + "...");
}

const openai = new OpenAI({
    apiKey: process.env.AI_API_KEY,
});

const generateAIResponse = async (req, res) => {
    try {
        const { messages, message } = req.body;

        let conversation = [];

        // Build context from history if provided (limit last 5 messages)
        if (messages && Array.isArray(messages)) {
            // Map frontend messages to OpenAI format
            conversation = messages
                .slice(-5) // Keep context manageable
                .map(msg => ({
                    role: msg.sender === 'user' ? 'user' : 'assistant',
                    content: msg.text
                }));
        }

        // Add the new user message if "message" field is sent separately
        if (message) {
            conversation.push({ role: 'user', content: message });
        }

        // System prompt context
        conversation.unshift({
            role: "system",
            content: "You are an AI Tutor for a college student management app called 'AI Campus Companion'. Help the student with their studies, explain concepts clearly, and provide academic guidance. If asked about their schedule or notes, remind them you don't have access to their real-time data yet but can help explain general topics."
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: conversation,
            max_tokens: 500,
        });

        const reply = completion.choices[0].message.content;

        res.status(200).json({ reply });
    } catch (error) {
        console.error('AI API Error:', error);
        res.status(500).json({
            message: 'Failed to fetch AI response',
            error: error.message
        });
    }
};

module.exports = { generateAIResponse };
