import React from "react";
import { ShieldCheck } from "lucide-react";
import { currentFarmer } from "../../lib/store";
import { RatingStars } from "../../components/RatingStars";

const FarmerProfile: React.FC = () => {
  const f = currentFarmer;
  return (
    <div className="max-w-lg mx-auto">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-20 h-20 rounded-full bg-leaf-700 text-white flex items-center justify-center text-2xl font-display mb-3">
          {f.avatarInitials}
        </div>
        <h1 className="font-display text-2xl">{f.name}</h1>
        <p className="text-ink/50">{f.farmName} · {f.location}</p>
        {f.isVerified && (
          <span className="inline-flex items-center gap-1 mt-2 text-leaf-700 text-sm font-medium">
            <ShieldCheck size={16} /> កសិករដែលមានសុពលភាព
          </span>
        )}
        <div className="mt-2">
          <RatingStars value={f.rating} showValue />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-soil-100 rounded-farmer p-4 text-center">
          <p className="font-display text-2xl">{f.completedOrders}</p>
          <p className="text-ink/50 text-sm">ការបញ្ជាទិញដែលបានបញ្ចប់</p>
        </div>
        <div className="bg-white border border-soil-100 rounded-farmer p-4 text-center">
          <p className="font-display text-2xl">{f.yearsFarming}</p>
          <p className="text-ink/50 text-sm">ឆ្នាំនៃការធ្វើកសិដ្ឋាន</p>
        </div>
      </div>

      <div className="bg-white border border-soil-100 rounded-farmer p-5">
        <h2 className="font-medium mb-3">ប្រវត្តិគុណភាព</h2>
        <div className="space-y-2">
          {f.qualityHistory.map((q) => (
            <div key={q.grade} className="flex items-center gap-3">
              <span className="w-16 text-sm text-ink/60">Grade {q.grade}</span>
              <div className="flex-1 h-2 bg-soil-50 rounded-full overflow-hidden">
                <div className="h-full bg-leaf-600" style={{ width: `${q.percent}%` }} />
              </div>
              <span className="w-10 text-sm text-right text-ink/60">{q.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-soil-100 rounded-farmer p-5 mt-4">
        <h2 className="font-medium mb-2">វិធីធ្វើកសិដ្ឋាន</h2>
        <p className="text-ink/60 text-sm">{f.farmingMethod}</p>
      </div>
    </div>
  );
};

export default FarmerProfile;
