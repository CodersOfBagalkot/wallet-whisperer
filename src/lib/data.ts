export type ExpenseCategory = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type Expense = {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: "expense" | "income";
};

export const DEFAULT_CATEGORIES: ExpenseCategory[] = [
  { id: "food", name: "Food", icon: "🍔", color: "351 76% 59%" },
  { id: "grocery", name: "Grocery", icon: "🛒", color: "152 60% 45%" },
  { id: "travel", name: "Travel", icon: "✈️", color: "220 80% 55%" },
  { id: "shopping", name: "Shopping", icon: "🛍️", color: "280 70% 55%" },
  { id: "dining", name: "Dining", icon: "🍽️", color: "38 92% 60%" },
  { id: "movie", name: "Movie", icon: "🎬", color: "0 70% 50%" },
  { id: "bills", name: "Bills", icon: "📄", color: "200 60% 50%" },
  { id: "transport", name: "Transport", icon: "🚗", color: "170 60% 45%" },
];

export const SAMPLE_EXPENSES: Expense[] = [
  { id: "1", amount: 450, category: "food", description: "KFC Dinner", date: "2026-02-18", type: "expense" },
  { id: "2", amount: 1200, category: "grocery", description: "Monthly grocery at SuperMart", date: "2026-02-17", type: "expense" },
  { id: "3", amount: 3500, category: "travel", description: "Train ticket to Coimbatore", date: "2026-02-16", type: "expense" },
  { id: "4", amount: 800, category: "dining", description: "Restaurant with friends", date: "2026-02-15", type: "expense" },
  { id: "5", amount: 2500, category: "shopping", description: "New shoes", date: "2026-02-14", type: "expense" },
  { id: "6", amount: 50000, category: "bills", description: "Salary credited", date: "2026-02-01", type: "income" },
];

export const WEEKLY_DATA = [
  { day: "Mon", amount: 450 },
  { day: "Tue", amount: 1200 },
  { day: "Wed", amount: 300 },
  { day: "Thu", amount: 800 },
  { day: "Fri", amount: 2500 },
  { day: "Sat", amount: 3500 },
  { day: "Sun", amount: 150 },
];
