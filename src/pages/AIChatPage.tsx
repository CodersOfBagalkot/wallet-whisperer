import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "How can I save more money?",
  "Am I spending too much on food?",
  "Tips to reduce travel costs",
  "Best 50-30-20 budget plan",
];

const AIChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your financial advisor AI 🤖💰\n\nI can help you manage your expenses, create savings plans, and give personalized tips. Ask me anything!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response (will be replaced with real AI backend)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: getSimulatedResponse(msg),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-display font-bold text-foreground">AI Financial Advisor</h1>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-soft" /> Online
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 space-y-4">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "gradient-primary text-primary-foreground rounded-br-md"
                    : "bg-card shadow-card text-foreground rounded-bl-md"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
            <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
              <Bot className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <div className="bg-card shadow-card px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {SUGGESTIONS.map((s) => (
              <motion.button
                key={s}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend(s)}
                className="px-3 py-2 rounded-xl bg-card shadow-card text-xs font-medium text-foreground border border-border"
              >
                {s}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 bg-card rounded-2xl shadow-card p-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask for financial advice..."
            className="flex-1 px-3 py-2 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground/50"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center disabled:opacity-40"
          >
            <Send className="w-4 h-4 text-primary-foreground" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

function getSimulatedResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("save")) {
    return "💡 Here are some tips to save more:\n\n1. Follow the 50-30-20 rule: 50% needs, 30% wants, 20% savings\n2. Set up automatic transfers to a savings account\n3. Track every expense (you're already doing this! 🎉)\n4. Cut subscriptions you don't use\n5. Cook at home more often";
  }
  if (lower.includes("food") || lower.includes("dining")) {
    return "🍔 Looking at your food spending:\n\nYou've spent ₹5,250 on food this month. That's about 10.5% of your salary.\n\n✅ This is within a healthy range (10-15%).\n\nTip: Try meal prepping on weekends to reduce dining out costs by 30%!";
  }
  if (lower.includes("travel")) {
    return "✈️ Travel cost tips:\n\n1. Book tickets in advance (save 20-40%)\n2. Use public transport when possible\n3. Consider carpooling for daily commute\n4. Set a monthly travel budget of ₹3,000-5,000";
  }
  if (lower.includes("budget") || lower.includes("50-30-20")) {
    return "📊 The 50-30-20 Budget Plan:\n\nWith your salary of ₹50,000:\n\n• 50% Needs (₹25,000): Rent, bills, groceries, transport\n• 30% Wants (₹15,000): Dining, shopping, entertainment\n• 20% Savings (₹10,000): Emergency fund, investments\n\nYou're currently saving about ₹18,550 — that's 37%! 🎉 Great job!";
  }
  return "That's a great question! 🤔\n\nBased on your spending patterns, I'd recommend reviewing your monthly budget categories and setting specific limits for each. Would you like me to create a personalized savings plan?";
}

export default AIChatPage;
