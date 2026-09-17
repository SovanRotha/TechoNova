import React from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { Sprout, PackageSearch, Wallet, Bell, User, ArrowLeftRight } from "lucide-react";
import { useAppData } from "../lib/store";

const navItems = [
  { to: "/farmer", label: "ទំព័រដើម", icon: Sprout, end: true },
  { to: "/farmer/orders", label: "ការបញ្ជាទិញ", icon: PackageSearch },
  { to: "/farmer/sales", label: "ការលក់", icon: Wallet },
  { to: "/farmer/notifications", label: "ការជូនដំណឹង", icon: Bell },
  { to: "/farmer/profile", label: "ប្រវត្តិរូប", icon: User },
];

export const FarmerLayout: React.FC = () => {
  const { notifications } = useAppData();
  const unread = notifications.filter((n) => n.audience === "farmer" && !n.read).length;

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <header className="sticky top-0 z-20 bg-leaf-800 text-white">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
              <Sprout size={18} />
            </span>
            <span className="font-display text-xl">TechNova</span>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/85 hover:text-white"
          >
            <ArrowLeftRight size={14} />
            ប្ដូរមើល
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 pt-5 pb-28">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-soil-100">
        <div className="max-w-3xl mx-auto grid grid-cols-5">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center gap-1 py-3 text-xs font-medium transition-colors ${
                  isActive ? "text-leaf-700" : "text-ink/45"
                }`
              }
            >
              <Icon size={24} strokeWidth={2.2} />
              {label}
              {label === "ការជូនដំណឹង" && unread > 0 && (
                <span className="absolute top-2 right-[30%] w-2 h-2 rounded-full bg-clay-500" />
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};
