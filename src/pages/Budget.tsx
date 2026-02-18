import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { toast } from "sonner";

const BUDGET_ITEMS = [
  { id: "rent", name: "Rent", icon: "🏠", limit: 15000, spent: 15000 },
  { id: "food", name: "Food & Dining", icon: "🍔", limit: 8000, spent: 5250 },
  { id: "transport", name: "Transport", icon: "🚗", limit: 5000, spent: 3500 },
  { id: "shopping", name: "Shopping", icon: "🛍️", limit: 5000, spent: 2500 },
  { id: "entertainment", name: "Entertainment", icon: "🎬", limit: 3000, spent: 800 },
  { id: "bills", name: "Bills & Utilities", icon: "📄", limit: 6000, spent: 4200 },
];

const Budget = () => {
  const [salary, setSalary] = useState(50000);
  const totalBudgeted = BUDGET_ITEMS.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = BUDGET_ITEMS.reduce((sum, b) => sum + b.spent, 0);
  const unallocated = salary - totalBudgeted;

  return (
    <div className="px-5 pt-6">
      <h1 className="text-xl font-display font-bold text-foreground mb-6">Budget & Limits</h1>

      {/* Salary Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-navy rounded-2xl p-5 mb-5"
      >
        <p className="text-navy-foreground/60 text-xs mb-1">Monthly Salary</p>
        <h2 className="text-2xl font-display font-bold text-primary-foreground">₹{salary.toLocaleString()}</h2>
        <div className="flex gap-4 mt-3">
          <div>
            <p className="text-[10px] text-navy-foreground/50">Budgeted</p>
            <p className="text-sm font-semibold text-accent">₹{totalBudgeted.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[10px] text-navy-foreground/50">Unallocated</p>
            <p className="text-sm font-semibold text-success">₹{unallocated.toLocaleString()}</p>
          </div>
        </div>
      </motion.div>

      {/* Budget Items */}
      <div className="space-y-3">
        {BUDGET_ITEMS.map((item, i) => {
          const percent = Math.round((item.spent / item.limit) * 100);
          const isOver = percent >= 90;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="bg-card rounded-2xl p-4 shadow-card"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-[11px] text-muted-foreground">
                    ₹{item.spent.toLocaleString()} / ₹{item.limit.toLocaleString()}
                  </p>
                </div>
                <span className={`text-xs font-bold ${isOver ? "text-primary" : "text-success"}`}>
                  {percent}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(percent, 100)}%` }}
                  transition={{ duration: 0.8 }}
                  className={`h-full rounded-full ${isOver ? "gradient-primary" : "bg-success"}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Budget Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => toast.info("Budget editing coming soon!")}
        className="w-full mt-5 py-3.5 rounded-2xl border-2 border-dashed border-primary/30 text-primary font-medium text-sm flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add Budget Category
      </motion.button>
    </div>
  );
};

export default Budget;
