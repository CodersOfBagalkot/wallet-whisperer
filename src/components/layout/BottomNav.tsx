import { Home, PlusCircle, BarChart3, Wallet, MessageCircle } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/reports", icon: BarChart3, label: "Reports" },
  { to: "/add", icon: PlusCircle, label: "Add", isCenter: true },
  { to: "/budget", icon: Wallet, label: "Budget" },
  { to: "/chat", icon: MessageCircle, label: "AI Chat" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-card/95 backdrop-blur-xl border-t border-border z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <NavLink key={item.to} to={item.to} className="relative -mt-6">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 rounded-full gradient-primary shadow-primary flex items-center justify-center"
                >
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </motion.div>
              </NavLink>
            );
          }

          return (
            <NavLink key={item.to} to={item.to} className="relative flex flex-col items-center gap-0.5 px-3 py-1.5">
              <motion.div whileTap={{ scale: 0.85 }}>
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              </motion.div>
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-2 w-1 h-1 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
