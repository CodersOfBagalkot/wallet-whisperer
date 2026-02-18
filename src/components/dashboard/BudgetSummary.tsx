import { motion } from "framer-motion";
import { Shield, AlertTriangle } from "lucide-react";

interface Props {
  salary: number;
  spent: number;
}

const BudgetSummary = ({ salary, spent }: Props) => {
  const savings = salary - spent;
  const savingsPercent = Math.round((savings / salary) * 100);
  const isHealthy = savingsPercent >= 20;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-card rounded-2xl p-5 shadow-card mb-5"
    >
      <h3 className="font-display font-semibold text-foreground mb-3">Budget Health</h3>
      <div className="flex gap-3">
        <div className="flex-1 rounded-xl bg-secondary p-3.5">
          <p className="text-[10px] text-muted-foreground mb-1">Salary</p>
          <p className="text-lg font-display font-bold text-foreground">₹{salary.toLocaleString()}</p>
        </div>
        <div className="flex-1 rounded-xl bg-secondary p-3.5">
          <p className="text-[10px] text-muted-foreground mb-1">Savings</p>
          <p className={`text-lg font-display font-bold ${isHealthy ? "text-success" : "text-primary"}`}>
            ₹{savings.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
        {isHealthy ? (
          <Shield className="w-4 h-4 text-success" />
        ) : (
          <AlertTriangle className="w-4 h-4 text-warning" />
        )}
        <p className="text-xs text-muted-foreground">
          {isHealthy
            ? `Great! You're saving ${savingsPercent}% of your income.`
            : `Warning: Only ${savingsPercent}% savings. Try to cut spending!`}
        </p>
      </div>
    </motion.div>
  );
};

export default BudgetSummary;
