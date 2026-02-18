import { motion } from "framer-motion";
import { DEFAULT_CATEGORIES, type Expense } from "@/lib/data";

interface Props {
  expenses: Expense[];
}

const CategoryBreakdown = ({ expenses }: Props) => {
  const expenseOnly = expenses.filter((e) => e.type === "expense");
  const total = expenseOnly.reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = DEFAULT_CATEGORIES.map((cat) => {
    const catTotal = expenseOnly
      .filter((e) => e.category === cat.id)
      .reduce((sum, e) => sum + e.amount, 0);
    return { ...cat, total: catTotal, percent: total > 0 ? Math.round((catTotal / total) * 100) : 0 };
  }).filter((c) => c.total > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-2xl p-5 shadow-card mb-5"
    >
      <h3 className="font-display font-semibold text-foreground mb-4">Categories</h3>
      <div className="grid grid-cols-4 gap-3 mb-4">
        {DEFAULT_CATEGORIES.slice(0, 8).map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * i }}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-lg">
              {cat.icon}
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">{cat.name}</span>
          </motion.div>
        ))}
      </div>
      {/* Category bars */}
      <div className="space-y-3">
        {categoryTotals.map((cat) => (
          <div key={cat.id}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-foreground">{cat.icon} {cat.name}</span>
              <span className="text-xs text-muted-foreground">₹{cat.total.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${cat.percent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: `hsl(${cat.color})` }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoryBreakdown;
