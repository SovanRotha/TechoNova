import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useAppData, currentFarmer } from "../../lib/store";
import { GradePill, VerificationBadge } from "../../components/QualityBadge";

const MyProducts: React.FC = () => {
  const { products } = useAppData();
  const mine = products.filter((p) => p.farmerId === currentFarmer.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-display text-2xl">ផលិតផលរបស់ខ្ញុំ</h1>
        <Link
          to="/farmer/sell"
          className="inline-flex items-center gap-1.5 bg-leaf-700 text-white text-sm font-semibold px-4 py-2.5 rounded-farmer"
        >
          <Plus size={16} /> លក់
        </Link>
      </div>

      {mine.length === 0 ? (
        <div className="text-center py-16 text-ink/50">
          <p>អ្នកមិនទាន់បានបញ្ជីអ្វីនៅឡើយទេ។</p>
        </div>
      ) : (
        <div className="space-y-3">
          {mine.map((p) => (
            <div key={p.id} className="bg-white border border-soil-100 rounded-farmer p-4 flex gap-4">
              <img src={p.photo} alt={p.name} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg">{p.name}</h3>
                  <GradePill grade={p.qualityGrade} />
                </div>
                <p className="text-ink/50 text-sm mt-0.5">
                  {p.quantityKg} kg · ${p.pricePerKg.toFixed(2)}/kg
                </p>
                <div className="mt-1.5">
                  <VerificationBadge verification={p.verification} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
