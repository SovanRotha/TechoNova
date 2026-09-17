import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { farmers, products } from "../../data/mockData";
import { RatingStars } from "../../components/RatingStars";
import { ProductCard } from "../../components/ProductCard";

const FarmerDetails: React.FC = () => {
  const { farmerId } = useParams();
  const navigate = useNavigate();
  const farmer = farmers.find((f) => f.id === farmerId);
  const theirProducts = products.filter((p) => p.farmerId === farmerId);

  if (!farmer) return <p className="text-ink/50">រកមិនឃើញកសិករនេះទេ។</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)} className="text-ink/50 text-sm mb-4">
        ← ត្រឡប់ក្រោយ
      </button>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-leaf-700 text-white flex items-center justify-center text-xl font-display">
          {farmer.avatarInitials}
        </div>
        <div>
          <h1 className="font-display text-2xl">{farmer.name}</h1>
          <p className="text-ink/50">{farmer.farmName} · {farmer.location}</p>
          <div className="flex items-center gap-2 mt-1">
            {farmer.isVerified && (
              <span className="inline-flex items-center gap-1 text-leaf-700 text-sm font-medium">
                <ShieldCheck size={14} /> កសិករដែលមានសុពលភាព
              </span>
            )}
            <RatingStars value={farmer.rating} showValue />
            <span className="text-sm text-ink/40">{farmer.completedOrders} ការបញ្ជាទិញដែលបានបញ្ចប់</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-soil-100 rounded-buyer p-5 mb-8">
        <h2 className="font-medium mb-3">ប្រវត្តិគុណភាព</h2>
        <div className="flex gap-6">
          {farmer.qualityHistory.map((q) => (
            <div key={q.grade}>
              <p className="font-display text-2xl">{q.percent}%</p>
              <p className="text-sm text-ink/50">កំរិត {q.grade}</p>
            </div>
          ))}
        </div>
      </div>

      <h2 className="font-display text-xl mb-3">ផលិតផលពី {farmer.name}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {theirProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default FarmerDetails;
