import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { WEEKLY_DATA } from "@/lib/data";

const SpendingChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card rounded-2xl p-5 shadow-card mb-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground">Weekly Spending</h3>
        <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">This week</span>
      </div>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={WEEKLY_DATA} barCategoryGap="20%">
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(220 10% 50%)", fontSize: 11 }}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "hsl(220 14% 93%)", radius: 8 }}
              contentStyle={{
                background: "hsl(220 40% 13%)",
                border: "none",
                borderRadius: 12,
                color: "#fff",
                fontSize: 12,
                padding: "6px 12px",
              }}
              formatter={(value: number) => [`₹${value}`, "Spent"]}
            />
            <Bar
              dataKey="amount"
              radius={[6, 6, 0, 0]}
              fill="hsl(351, 76%, 59%)"
              activeBar={{ fill: "hsl(351, 90%, 50%)" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SpendingChart;
