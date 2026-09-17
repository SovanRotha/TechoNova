import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useAppData, currentBuyer } from "../../lib/store";
import { BuyRequestCard } from "../../components/BuyRequestCard";

const MyBuyRequests: React.FC = () => {
  const { buyRequests } = useAppData();
  const mine = buyRequests.filter((r) => r.buyerId === currentBuyer.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-display text-2xl">សំណើទិញ</h1>
        <Link
          to="/buyer/requests/new"
          className="inline-flex items-center gap-1.5 bg-leaf-700 text-white text-sm font-semibold px-4 py-2.5 rounded-buyer"
        >
          <Plus size={16} /> សំណើថ្មី
        </Link>
      </div>
      {mine.length === 0 ? (
        <p className="text-center text-ink/50 py-16">អ្នកមិនទាន់បានបង្ហោះសំណើទិញទេ។</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {mine.map((r) => (
            <BuyRequestCard key={r.id} request={r} to={`/buyer/requests/${r.id}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBuyRequests;
