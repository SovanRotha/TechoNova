import React from "react";
import { currentBuyer } from "../../lib/store";

const BuyerProfile: React.FC = () => {
  const b = currentBuyer;
  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-leaf-700 text-white flex items-center justify-center text-xl font-display">
          {b.avatarInitials}
        </div>
        <div>
          <h1 className="font-display text-2xl">{b.name}</h1>
          <p className="text-ink/50">{b.businessName}</p>
        </div>
      </div>

      <div className="bg-white border border-soil-100 rounded-buyer divide-y divide-soil-100">
        <Row label="ប្រភេទអាជីវកម្ម" value={b.businessType} />
        <Row label="ទីតាំង" value={b.location} />
      </div>
    </div>
  );
};

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between px-5 py-3.5">
    <span className="text-ink/50">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default BuyerProfile;
