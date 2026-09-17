import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppData } from "../../lib/store";
import { PrimaryButton } from "../../components/StepWizard";
import type { OrderStatus } from "../../types";

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  New: "Accepted",
  Accepted: "Preparing",
  Preparing: "Ready",
  Ready: "Delivered",
  Delivered: "Completed",
};

const FarmerOrderDetails: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useAppData();
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return <p className="text-ink/50">រកមិនឃើញការបញ្ជាទិញនេះទេ។</p>;
  }

  const advance = nextStatus[order.status];

  return (
    <div className="max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="text-ink/50 text-sm mb-4">
        ← ត្រឡប់ក្រោយ
      </button>
      <p className="text-xs text-ink/50">{order.id}</p>
      <h1 className="font-display text-3xl mb-1">{order.productName}</h1>
      <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full bg-harvest-100 text-harvest-600 mb-6">
        {order.status}
      </span>

      <div className="bg-white border border-soil-100 rounded-farmer divide-y divide-soil-100 mb-6">
        <Row label="អ្នកទិញ" value={order.buyerName} />
        <Row label="បរិមាណ" value={`${order.quantityKg} kg`} />
        <Row label="តម្លៃ" value={`$${order.pricePerKg.toFixed(2)}/kg`} />
        <Row label="ចំនួនសរុប" value={`$${order.totalAmount.toFixed(2)}`} />
        <Row label="ទីតាំងដឹកជញ្ជូន" value={order.deliveryLocation} />
        <Row label="កាលបរិច្ឆេទដឹកជញ្ជូន" value={order.deliveryDate} />
        <Row label="តម្រូវការគុណភាព" value={order.qualityRequirement === "Any Grade" ? "គ្រប់កំរិត" : `កំរិត ${order.qualityRequirement}`} />
      </div>

      {advance && order.status !== "Cancelled" && (
        <PrimaryButton fullWidth onClick={() => updateOrderStatus(order.id, advance)}>
          ទីតាំងជា {advance}
        </PrimaryButton>
      )}
    </div>
  );
};

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between px-5 py-3.5">
    <span className="text-ink/50">{label}</span>
    <span className="font-medium text-right">{value}</span>
  </div>
);

export default FarmerOrderDetails;
