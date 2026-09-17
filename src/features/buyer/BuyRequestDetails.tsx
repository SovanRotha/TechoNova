import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppData } from "../../lib/store";

const BuyRequestDetails: React.FC = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { buyRequests } = useAppData();
  const request = buyRequests.find((r) => r.id === requestId);

  if (!request) return <p className="text-ink/50">រកមិនឃើញសំណើទិញនេះទេ។</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => navigate(-1)} className="text-ink/50 text-sm mb-4">
        ← ត្រឡប់ក្រោយ
      </button>
      <h1 className="font-display text-3xl mb-1">
        {request.buyerName} ត្រូវការអោយ {request.product}
      </h1>
      <p className="text-ink/50 mb-6">បានបង្ហោះ {request.createdAt}</p>

      <div className="bg-white border border-soil-100 rounded-buyer divide-y divide-soil-100 mb-8">
        <Row label="បរិមាណ" value={`${request.quantityKg} kg`} />
        <Row label="ការដឹកជញ្ជូន" value={request.deliveryDate} />
        <Row label="ទីតាំង" value={request.location} />
        <Row label="គុណភាព" value={request.quality === "Any Grade" ? "គ្រប់កំរិត" : `កំរិត ${request.quality}`} />
        <Row label="តម្លៃគោលដៅ" value={`$${request.targetPrice.toFixed(2)}/kg`} />
        <Row label="ស្ថានភាព" value={request.status} />
      </div>

      <h2 className="font-display text-xl mb-3">ការឆ្លើយតបពីកសិករ</h2>
      {request.responses.length === 0 ? (
        <p className="text-ink/50">កសិករមិនទាន់មានការឆ្លើយតបនៅឡើយទេ។</p>
      ) : (
        <div className="space-y-3">
          {request.responses.map((r) => (
            <div key={r.farmerId} className="bg-white border border-soil-100 rounded-buyer p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{r.farmerName}</p>
                <p className="text-sm text-ink/50">
                  ផ្ដល់នូវ {r.offeredQuantityKg} kg ក្នុងតម្លៃ ${r.offeredPrice.toFixed(2)}/kg
                </p>
              </div>
              <button className="bg-leaf-700 text-white text-sm font-semibold px-4 py-2 rounded-buyer">
                ជ្រើសរើសកសិករ
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between px-5 py-3.5">
    <span className="text-ink/50">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default BuyRequestDetails;
