import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { DEFAULT_CATEGORIES } from "@/lib/data";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddExpense = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [type, setType] = useState<"expense" | "income">("expense");

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
      <h1 className="text-xl font-display font-bold text-foreground mb-6">Add Transaction</h1>

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
              className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${
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
