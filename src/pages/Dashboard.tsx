import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, TrendingDown, TrendingUp, ArrowRight } from "lucide-react";
import SpendingChart from "@/components/dashboard/SpendingChart";
import CategoryBreakdown from "@/components/dashboard/CategoryBreakdown";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import BudgetSummary from "@/components/dashboard/BudgetSummary";
import { SAMPLE_EXPENSES } from "@/lib/data";

const Dashboard = () => {
  const totalSpent = SAMPLE_EXPENSES
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);
  const salary = 50000;
  const remaining = salary - totalSpent;
  const spentPercent = Math.round((totalSpent / salary) * 100);

  return (
    <div className="px-5 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Good morning 👋</p>
          <h1 className="text-xl font-display font-bold text-foreground">My Finances</h1>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center relative"
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
        </motion.button>
      </div>

      {/* Total Spend Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-navy rounded-2xl p-5 mb-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary/10 -mr-10 -mt-10" />
        <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-accent/10 -ml-6 -mb-6" />
        <p className="text-navy-foreground/70 text-sm mb-1">This month spend</p>
        <h2 className="text-3xl font-display font-bold text-primary-foreground mb-3">
          ₹{totalSpent.toLocaleString()}
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-success" />
            </div>
            <div>
              <p className="text-[10px] text-navy-foreground/50">Remaining</p>
              <p className="text-sm font-semibold text-success">₹{remaining.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <TrendingDown className="w-3.5 h-3.5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] text-navy-foreground/50">Spent</p>
              <p className="text-sm font-semibold text-primary">{spentPercent}%</p>
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-4 h-2 bg-navy-foreground/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${spentPercent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full gradient-primary rounded-full"
          />
        </div>
      </motion.div>

      {/* Weekly Spending Chart */}
      <SpendingChart />

      {/* Category Breakdown */}
      <CategoryBreakdown expenses={SAMPLE_EXPENSES} />

      {/* Budget Summary */}
      <BudgetSummary salary={salary} spent={totalSpent} />

      {/* Recent Transactions */}
      <RecentTransactions expenses={SAMPLE_EXPENSES} />
    </div>
  );
};

export default Dashboard;
