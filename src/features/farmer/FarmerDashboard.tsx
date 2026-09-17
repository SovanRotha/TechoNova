import React from "react";
import { Link } from "react-router-dom";
import { PackageSearch, Wallet, ChevronRight } from "lucide-react";
import { useAppData, currentFarmer } from "../../lib/store";
import AIMarketInsights from "../../components/AIMarketInsights";

const FarmerDashboard: React.FC = () => {
  const { orders, products } = useAppData();
  const myOrders = orders.filter((o) => o.farmerId === currentFarmer.id);
  const newOrders = myOrders.filter((o) => o.status === "New").length;

  return (
    <div>
      <p className="text-ink/50 text-sm">មិត្តស្រឡាញ់លក្ខណៈរបស់អ្នក,</p>
      <h1 className="font-display text-3xl mb-6">{currentFarmer.name.split(" ")[0]}</h1>

      <AIMarketInsights products={products} audience="farmer" />

      <Link
        to="/farmer/sell"
        className="block bg-leaf-700 hover:bg-leaf-800 transition-colors rounded-farmer p-6 text-white mb-4"
      >
        <span className="text-4xl">🌱</span>
        <h2 className="font-display text-2xl mt-3">លក់ផលិតផល</h2>
        <p className="text-white/75 text-sm mt-1">បញ្ជីអ្វីដែលអ្នកបានปลูกដោយចុចប៉ុណ្ណេះ</p>
      </Link>

      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/farmer/orders"
          className="relative bg-white border border-soil-100 rounded-farmer p-5 hover:border-leaf-400 transition-colors"
        >
          {newOrders > 0 && (
            <span className="absolute top-4 right-4 w-6 h-6 rounded-full bg-clay-500 text-white text-xs flex items-center justify-center font-semibold">
              {newOrders}
            </span>
          )}
          <PackageSearch size={28} className="text-leaf-700 mb-3" />
          <h2 className="font-display text-xl">ការបញ្ជាទិញរបស់ខ្ញុំ</h2>
          <p className="text-ink/50 text-sm mt-0.5">{myOrders.length} សរុប</p>
        </Link>
        <Link
          to="/farmer/sales"
          className="bg-white border border-soil-100 rounded-farmer p-5 hover:border-leaf-400 transition-colors"
        >
          <Wallet size={28} className="text-leaf-700 mb-3" />
          <h2 className="font-display text-xl">ការលក់របស់ខ្ញុំ</h2>
          <p className="text-ink/50 text-sm mt-0.5">មើលអ្វីដែលអ្នកទទួលបាន</p>
        </Link>
      </div>

      <Link
        to="/farmer/products"
        className="mt-4 flex items-center justify-between bg-white border border-soil-100 rounded-farmer p-5 hover:border-leaf-400 transition-colors"
      >
        <div>
          <h2 className="font-display text-xl">ផលិតផលរបស់ខ្ញុំ</h2>
          <p className="text-ink/50 text-sm mt-0.5">មើល និងគ្រប់គ្រងអ្វីដែលអ្នកបានបញ្ជី</p>
        </div>
        <ChevronRight className="text-ink/40" />
      </Link>
    </div>
  );
};

export default FarmerDashboard;
