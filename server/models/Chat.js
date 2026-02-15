const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    messages: [{
        sender: { type: String, enum: ['user', 'system', 'assistant'], required: true },
        text: { type: String, required: true },
        contextIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
        timestamp: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Chat', ChatSchema);
