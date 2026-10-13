import { useState, useRef, useEffect } from 'react';
import { Card, Button } from '../components/ui';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from 'axios';
import API_BASE_URL from "../api";

const AITutorPage = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: "Hello! I'm your AI Tutor. How can I help you with your studies today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo?.token}`,
                    'Content-Type': 'application/json'
                }
            };

            // Send conversation history + new message
            const { data } = await axios.post(`${API_BASE_URL}/api/notes`, {
                messages: messages.map(m => ({ sender: m.sender, text: m.text })),
                message: userMsg.text
            }, config);

            const botMsg = { id: Date.now() + 1, sender: 'bot', text: data.reply };
            setMessages(prev => [...prev, botMsg]);

        } catch (error) {
            console.error("AI Request Failed", error);
            const errorMsg = {
                id: Date.now() + 1,
                sender: 'bot',
                text: "I'm sorry, but I'm having trouble connecting to the server. Please check your API usage or try again later."
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-12 flex flex-col h-screen">
            <header className="mb-6 flex-shrink-0">
                <h1 className="text-3xl font-bold dark:text-white mb-2 flex items-center gap-2">
                    <Bot className="text-primary" size={32} /> AI Tutor
                </h1>
                <p className="text-slate-500 dark:text-slate-400">Ask questions and get instant answers from your study materials</p>
            </header>

            <Card className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl">
                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex max-w-[85%] md:max-w-[75%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                                    {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                                </div>
                                <div className={`p-4 rounded-2xl overflow-hidden ${msg.sender === 'user'
                                    ? 'bg-primary text-white rounded-tr-none'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700'
                                    }`}>
                                    {msg.sender === 'user' ? (
                                        <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                    ) : (
                                        <div className="prose dark:prose-invert prose-sm max-w-none">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {msg.text}
                                            </ReactMarkdown>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="flex max-w-[80%] flex-row gap-3">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                                    <Bot size={16} />
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700 flex items-center">
                                    <Loader2 className="animate-spin mr-2" size={18} />
                                    <span className="text-sm">Thinking...</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="flex gap-2 items-center relative"
                    >
                        <input
                            type="text"
                            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full py-3 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm dark:text-white disabled:opacity-50"
                            placeholder="Type your question..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="absolute right-2 p-2 bg-primary text-white rounded-full hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default AITutorPage;
