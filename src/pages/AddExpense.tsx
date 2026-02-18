import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mic, MicOff, Sparkles } from "lucide-react";
import { DEFAULT_CATEGORIES } from "@/lib/data";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

const AddExpense = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [type, setType] = useState<"expense" | "income">("expense");
  const { isListening, transcript, isSupported, startListening, stopListening, parseExpense } = useSpeechRecognition();

  useEffect(() => {
    if (transcript && !isListening) {
      const parsed = parseExpense(transcript);
      if (parsed.amount) setAmount(parsed.amount);
      if (parsed.description) setDescription(parsed.description);
      if (parsed.category) setSelectedCategory(parsed.category);
      toast.success("Voice captured! Review and submit 🎤");
    }
  }, [transcript, isListening, parseExpense]);

  const handleSubmit = () => {
    if (!amount || !selectedCategory) {
      toast.error("Please fill amount and category");
      return;
    }
    toast.success(`${type === "expense" ? "Expense" : "Income"} of ₹${amount} added!`);
    navigate("/");
  };

  return (
    <div className="px-5 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-display font-bold text-foreground">Add Transaction</h1>
        {isSupported && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={isListening ? stopListening : startListening}
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
              isListening
                ? "bg-destructive text-destructive-foreground animate-pulse"
                : "gradient-primary text-primary-foreground shadow-primary"
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </motion.button>
        )}
      </div>

      {/* Voice Status */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-5 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              <span className="text-sm font-medium text-foreground">Listening...</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Say something like "Spent 500 on food at KFC"
            </p>
            {transcript && (
              <p className="text-sm text-foreground mt-2 italic">"{transcript}"</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Type Toggle */}
      <div className="flex gap-2 mb-6 bg-muted p-1 rounded-xl">
        {(["expense", "income"] as const).map((t) => (
          <motion.button
            key={t}
            whileTap={{ scale: 0.97 }}
            onClick={() => setType(t)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium capitalize transition-all ${
              type === t
                ? t === "expense"
                  ? "gradient-primary text-primary-foreground shadow-primary"
                  : "bg-success text-success-foreground"
                : "text-muted-foreground"
            }`}
          >
            {t}
          </motion.button>
        ))}
      </div>

      {/* Amount Input */}
      <div className="bg-card rounded-2xl p-6 shadow-card mb-5 text-center">
        <p className="text-sm text-muted-foreground mb-2">Amount</p>
        <div className="flex items-center justify-center gap-1">
          <span className="text-3xl font-display font-bold text-foreground">₹</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="text-4xl font-display font-bold text-foreground bg-transparent outline-none text-center w-40"
          />
        </div>
      </div>

      {/* Description */}
      <div className="bg-card rounded-2xl p-5 shadow-card mb-5">
        <label className="text-xs text-muted-foreground mb-2 block">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What was this for?"
          className="w-full text-sm text-foreground bg-transparent outline-none placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Category Selection */}
      <div className="bg-card rounded-2xl p-5 shadow-card mb-6">
        <label className="text-xs text-muted-foreground mb-3 block">Category</label>
        <div className="grid grid-cols-4 gap-3">
          {DEFAULT_CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedCategory(cat.id)}
              className={`relative flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${
                selectedCategory === cat.id
                  ? "bg-primary/10 ring-2 ring-primary"
                  : "bg-secondary"
              }`}
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="text-[10px] font-medium text-muted-foreground">{cat.name}</span>
              {selectedCategory === cat.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-2.5 h-2.5 text-primary-foreground" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleSubmit}
        className="w-full py-4 rounded-2xl gradient-primary text-primary-foreground font-semibold text-base shadow-primary"
      >
        Add {type === "expense" ? "Expense" : "Income"}
      </motion.button>
    </div>
  );
};

export default AddExpense;
