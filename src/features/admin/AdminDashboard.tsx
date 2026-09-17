import React from "react";
import { Link } from "react-router-dom";
import { Users, ShieldCheck, Package, ClipboardList, ShoppingBag, Search, AlertTriangle, UserCheck, BarChart3 } from "lucide-react";
import { useAppData } from "../../lib/store";
import { farmers } from "../../data/mockData";

const sections = [
  { label: "ការគ្រប់គ្រងអ្នកប្រើ", icon: Users },
  { label: "ការផ្ទៀងផ្ទាត់កសិករ", icon: ShieldCheck },
  { label: "ការគ្រប់គ្រងផលិតផល", icon: Package },
  { label: "ការគ្រប់គ្រងសំណើទិញ", icon: ClipboardList },
  { label: "ការគ្រប់គ្រងការបញ្ជាទិញ", icon: ShoppingBag },
  { label: "ការគ្រប់គ្រងការត្រួតពិនិត្យគុណភាព", icon: Search },
  { label: "ការគ្រប់គ្រងការឈOUCH", icon: AlertTriangle },
  { label: "ការគ្រប់គ្រងអ្នកត្រួតពិនិត្យ / ដៃគូ", icon: UserCheck },
  { label: "របាយការណ៍", icon: BarChart3 },
];

const AdminDashboard: React.FC = () => {
  const { products, orders, buyRequests, complaints } = useAppData();

  return (
    <div className="min-h-screen bg-canvas">
      <header className="bg-ink text-white px-6 py-4 flex items-center justify-between">
        <span className="font-display text-xl">TechNova Admin</span>
        <Link to="/" className="text-sm text-white/70 hover:text-white">
          ចេញពីផ្ទាំងគ្រប់គ្រង
        </Link>
      </header>
      <div className="max-w-5xl mx-auto p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Stat label="កសិករ" value={farmers.length} />
          <Stat label="ផលិតផលដែលបានបញ្ជី" value={products.length} />
          <Stat label="សំណើទិញ" value={buyRequests.length} />
          <Stat label="ការឈូសបីដែលមិនទាន់ចប់" value={complaints.filter((c) => c.status !== "Resolved" && c.status !== "Rejected").length} />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sections.map(({ label, icon: Icon }) => (
            <div key={label} className="bg-white border border-soil-100 rounded-buyer p-4 flex items-center gap-3">
              <Icon size={18} className="text-leaf-700" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Stat: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="bg-white border border-soil-100 rounded-buyer p-4">
    <p className="font-display text-2xl">{value}</p>
    <p className="text-sm text-ink/50">{label}</p>
  </div>
);

export default AdminDashboard;
