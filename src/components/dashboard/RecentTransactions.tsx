import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { DEFAULT_CATEGORIES, type Expense } from "@/lib/data";

interface Props {
  expenses: Expense[];
}

const RecentTransactions = ({ expenses }: Props) => {
  const sorted = [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getCategoryIcon = (catId: string) => {
    return DEFAULT_CATEGORIES.find((c) => c.id === catId)?.icon || "💰";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card rounded-2xl p-5 shadow-card mb-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground">Recent Activity</h3>
        <button className="text-xs text-primary font-medium">See All</button>
      </div>
      <div className="space-y-3">
        {sorted.slice(0, 5).map((expense, i) => (
          <motion.div
            key={expense.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg">
              {getCategoryIcon(expense.category)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{expense.description}</p>
              <p className="text-[11px] text-muted-foreground">{expense.date}</p>
            </div>
            <div className="flex items-center gap-1">
              {expense.type === "income" ? (
                <ArrowDownLeft className="w-3.5 h-3.5 text-success" />
              ) : (
                <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
              )}
              <span
                className={`text-sm font-semibold ${
                  expense.type === "income" ? "text-success" : "text-primary"
                }`}
              >
                {expense.type === "income" ? "+" : "-"}₹{expense.amount.toLocaleString()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentTransactions;
