import React, { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import {
  Sprout,
  Search,
  LayoutGrid,
  ClipboardList,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Bell,
  User,
  ArrowLeftRight,
  MapPinned,
  Menu,
  X,
} from "lucide-react";
import { useAppData } from "../lib/store";

const navItems = [
  { to: "/buyer", label: "ផ្ទាំងគ្រប់គ្រង", icon: LayoutGrid, end: true },
  { to: "/buyer/marketplace", label: "ទីផ្សារ", icon: Search },
  { to: "/buyer/farmers-map", label: "ផែនទីកសិករ", icon: MapPinned },
  { to: "/buyer/requests", label: "សំណើទិញ", icon: ClipboardList },
  { to: "/buyer/orders", label: "ការបញ្ជាទិញ", icon: ShoppingBag },
  { to: "/buyer/favorites", label: "ចំណូលចិត្ត", icon: Heart },
  { to: "/buyer/quality", label: "ផ្ទៀងផ្ទាត់គុណភាព", icon: ShieldCheck },
  { to: "/buyer/notifications", label: "ការជូនដំណឹង", icon: Bell },
  { to: "/buyer/profile", label: "ប្រវត្តិរូប", icon: User },
];

export const BuyerLayout: React.FC = () => {
  const { notifications } = useAppData();
  const [mobileOpen, setMobileOpen] = useState(false);
  const unread = notifications.filter((n) => n.audience === "buyer" && !n.read).length;

  const SidebarContent = (
    <>
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="w-9 h-9 rounded-buyer bg-leaf-700 text-white flex items-center justify-center">
          <Sprout size={18} />
        </span>
        <span className="font-display text-xl text-leaf-800">TechNova</span>
      </div>
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-buyer text-sm font-medium transition-colors ${
                isActive ? "bg-leaf-100 text-leaf-800" : "text-ink/60 hover:bg-soil-50"
              }`
            }
          >
            <Icon size={18} />
            {label}
            {label === "ការជូនដំណឹង" && unread > 0 && (
              <span className="ml-auto text-xs bg-clay-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {unread}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="px-5 py-4 border-t border-soil-100">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-leaf-700">
          <ArrowLeftRight size={14} />
          ប្ដូរមើល
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-canvas">
      <aside className="hidden lg:flex lg:flex-col w-64 border-r border-soil-100 bg-white">{SidebarContent}</aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 flex">
          <div className="w-72 bg-white flex flex-col">
            <button
              onClick={() => setMobileOpen(false)}
              className="self-end m-3 w-8 h-8 flex items-center justify-center text-ink/50"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
            {SidebarContent}
          </div>
          <div className="flex-1 bg-ink/30" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-soil-100 flex items-center justify-between px-4 py-3">
          <button onClick={() => setMobileOpen(true)} aria-label="Open menu" className="text-ink/70">
            <Menu size={22} />
          </button>
          <span className="font-display text-lg text-leaf-800">TechNova</span>
          <span className="w-[22px]" />
        </header>
        <main className="flex-1 p-5 lg:p-8 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
