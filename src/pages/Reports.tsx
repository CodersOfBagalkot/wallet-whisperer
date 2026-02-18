import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { SAMPLE_EXPENSES, DEFAULT_CATEGORIES } from "@/lib/data";

const MONTHS_DATA = [
  { month: "Jan", amount: 32000 },
  { month: "Feb", amount: 28500 },
  { month: "Mar", amount: 35000 },
  { month: "Apr", amount: 22000 },
  { month: "May", amount: 41000 },
  { month: "Jun", amount: 18500 },
];

const Reports = () => {
  const expenseOnly = SAMPLE_EXPENSES.filter((e) => e.type === "expense");
  const total = expenseOnly.reduce((sum, e) => sum + e.amount, 0);

  const pieData = DEFAULT_CATEGORIES.map((cat) => {
    const catTotal = expenseOnly
      .filter((e) => e.category === cat.id)
      .reduce((sum, e) => sum + e.amount, 0);
    return { name: cat.name, value: catTotal, icon: cat.icon, color: cat.color };
  }).filter((c) => c.value > 0);

  const COLORS = pieData.map((d) => `hsl(${d.color})`);

  return (
    <div className="px-5 pt-6">
      <h1 className="text-xl font-display font-bold text-foreground mb-6">Reports</h1>

      {/* Donut chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-5 shadow-card mb-5"
      >
        <h3 className="font-display font-semibold text-foreground mb-4">Category Breakdown</h3>
        <div className="flex items-center gap-4">
          <div className="w-36 h-36 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={40}
                  outerRadius={65}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-sm font-display font-bold text-foreground">₹{total.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-xs text-muted-foreground flex-1">{d.icon} {d.name}</span>
                <span className="text-xs font-medium text-foreground">₹{d.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Trend Line */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-5 shadow-card mb-5"
      >
        <h3 className="font-display font-semibold text-foreground mb-4">Monthly Trend</h3>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MONTHS_DATA}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(220 10% 50%)", fontSize: 11 }} />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "hsl(220 40% 13%)",
                  border: "none",
                  borderRadius: 12,
                  color: "#fff",
                  fontSize: 12,
                }}
                formatter={(value: number) => [`₹${value.toLocaleString()}`, "Spent"]}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="hsl(351, 76%, 59%)"
                strokeWidth={2.5}
                dot={{ fill: "hsl(351, 76%, 59%)", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default Reports;
