import React, { useState } from "react";
import { useAppData, currentFarmer } from "../../lib/store";
import { OrderCard } from "../../components/OrderCard";
import type { OrderStatus } from "../../types";

const filters: (OrderStatus | "All")[] = ["All", "New", "Accepted", "Preparing", "Ready", "Delivered", "Completed", "Cancelled"];

const FarmerOrders: React.FC = () => {
  const { orders } = useAppData();
  const [filter, setFilter] = useState<OrderStatus | "All">("All");
  const mine = orders
    .filter((o) => o.farmerId === currentFarmer.id)
    .filter((o) => filter === "All" || o.status === filter);

  return (
    <div>
      <h1 className="font-display text-2xl mb-4">ការបញ្ជាទិញរបស់ខ្ញុំ</h1>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-4 px-4">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium border ${
              filter === f ? "bg-leaf-700 text-white border-leaf-700" : "bg-white text-ink/60 border-soil-100"
            }`}
          >
            {f === "All" ? "ទាំងអស់" : f === "New" ? "ថ្មី" : f === "Accepted" ? "បានទទួល" : f === "Preparing" ? "កំពុងរៀបចំ" : f === "Ready" ? "រួចរាល់" : f === "Delivered" ? "បានដឹកជញ្ជូន" : f === "Completed" ? "បានបញ្ចប់" : "បានបោះបង់"}
          </button>
        ))}
      </div>
      {mine.length === 0 ? (
        <p className="text-center text-ink/50 py-16">មិនមានការបញ្ជាទិញក្នុងស្ថានភាពនេះទេ។</p>
      ) : (
        <div className="space-y-3">
          {mine.map((o) => (
            <OrderCard
              key={o.id}
              order={o}
              basePath="/farmer/orders"
              counterpartLabel="Buyer"
              counterpartName={o.buyerName}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerOrders;
