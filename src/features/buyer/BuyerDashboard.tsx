import React from "react";
import { Link } from "react-router-dom";
import { Search, ClipboardList, ShoppingBag, ShieldCheck } from "lucide-react";
import { useAppData, currentBuyer } from "../../lib/store";
import { ProductCard } from "../../components/ProductCard";
import AIMarketInsights from "../../components/AIMarketInsights";

const BuyerDashboard: React.FC = () => {
  const { products, buyRequests, orders } = useAppData();
  const myRequests = buyRequests.filter((r) => r.buyerId === currentBuyer.id);
  const myOrders = orders.filter((o) => o.buyerId === currentBuyer.id);
  const featured = products.slice(0, 3);

  return (
    <div>
      <p className="text-ink/50 text-sm">{currentBuyer.businessName}</p>
      <h1 className="font-display text-3xl mb-6">ស្វែងរកអ្វីដែលអ្នកចង់ទិញ</h1>

      <Link
        to="/buyer/marketplace"
        className="flex items-center gap-3 bg-white border border-soil-100 rounded-buyer px-5 py-4 mb-6 text-ink/40 hover:border-leaf-400 transition-colors"
      >
        <Search size={18} />
        ស្វែងរកប៉េងប៉ោះ រួមទាំងអង្ករ និងគ្រីប...
      </Link>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatLink to="/buyer/requests" icon={ClipboardList} label="សំណើទិញ" value={`${myRequests.length} កំពុងដំណើរការ`} />
        <StatLink to="/buyer/orders" icon={ShoppingBag} label="ការបញ្ជាទិញ" value={`${myOrders.length} សរុប`} />
        <StatLink to="/buyer/quality" icon={ShieldCheck} label="ផ្ទៀងផ្ទាត់គុណភាព" value="ស្វែងយល់ពីរបៀបធ្វើការ" />
      </div>

      <AIMarketInsights products={products} />

      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-xl">ផលិតផលថ្មីនៅក្នុងទីផ្សារ</h2>
        <Link to="/buyer/marketplace" className="text-sm font-medium text-leaf-700">
          មើលទាំងអស់
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

const StatLink: React.FC<{ to: string; icon: React.ElementType; label: string; value: string }> = ({
  to,
  icon: Icon,
  label,
  value,
}) => (
  <Link to={to} className="bg-white border border-soil-100 rounded-buyer p-4 hover:border-leaf-400 transition-colors">
    <Icon size={20} className="text-leaf-700 mb-2" />
    <p className="font-medium">{label}</p>
    <p className="text-sm text-ink/50">{value}</p>
  </Link>
);

export default BuyerDashboard;
