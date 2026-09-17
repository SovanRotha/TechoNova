import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppData } from "../../lib/store";
import { RatingInput } from "../../components/RatingStars";
import { PrimaryButton } from "../../components/StepWizard";

const BuyerOrderDetails: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders } = useAppData();
  const order = orders.find((o) => o.id === orderId);
  const [showReview, setShowReview] = useState(false);
  const [ratings, setRatings] = useState({
    productQuality: 0,
    freshness: 0,
    accuracy: 0,
    packaging: 0,
    overallExperience: 0,
  });
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!order) return <p className="text-ink/50">រកមិនឃើញការបញ្ជាទិញនេះទេ។</p>;

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

      <div className="bg-white border border-soil-100 rounded-buyer divide-y divide-soil-100 mb-6">
        <Row label="កសិករ" value={order.farmerName} />
        <Row label="បរិមាណ" value={`${order.quantityKg} kg`} />
        <Row label="តម្លៃ" value={`$${order.pricePerKg.toFixed(2)}/kg`} />
        <Row label="ចំនួនសរុប" value={`$${order.totalAmount.toFixed(2)}`} />
        <Row label="ទីតាំងដឹកជញ្ជូន" value={order.deliveryLocation} />
        <Row label="កាលបរិច្ឆេទដឹកជញ្ជូន" value={order.deliveryDate} />
        <Row label="តម្រូវការគុណភាព" value={order.qualityRequirement === "Any Grade" ? "គ្រប់កំរិត" : `កំរិត ${order.qualityRequirement}`} />
      </div>

      {(order.status === "Delivered" || order.status === "Completed") && !submitted && (
        <div className="bg-white border border-soil-100 rounded-buyer p-5 mb-4">
          {!showReview ? (
            <button onClick={() => setShowReview(true)} className="font-semibold text-leaf-700">
              វាយតម្លៃការបញ្ជាទិញនេះ →
            </button>
          ) : (
            <div>
              <h2 className="font-medium mb-1">វាយតម្លៃការបញ្ជាទិញរបស់អ្នក</h2>
              <RatingInput label="គុណភាពផលិតផល" value={ratings.productQuality} onChange={(v) => setRatings((r) => ({ ...r, productQuality: v }))} />
              <RatingInput label="ភាពថ្មី" value={ratings.freshness} onChange={(v) => setRatings((r) => ({ ...r, freshness: v }))} />
              <RatingInput label="ភាពត្រឹមត្រូវ" value={ratings.accuracy} onChange={(v) => setRatings((r) => ({ ...r, accuracy: v }))} />
              <RatingInput label="ការវេចក្តី" value={ratings.packaging} onChange={(v) => setRatings((r) => ({ ...r, packaging: v }))} />
              <RatingInput label="បទពិសោធន៍សរុប" value={ratings.overallExperience} onChange={(v) => setRatings((r) => ({ ...r, overallExperience: v }))} />
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="ប៉េងប៉ោះថ្មី និងត្រូវនឹងកំរិត A."
                className="w-full mt-3 px-3 py-2.5 border border-soil-100 rounded-buyer outline-none focus:border-leaf-600 text-sm"
              />
              <PrimaryButton fullWidth className="mt-3 !py-3 !text-base" onClick={() => setSubmitted(true)}>
                បញ្ជូនការវាយតម្លៃ
              </PrimaryButton>
            </div>
          )}
        </div>
      )}
      {submitted && <p className="text-leaf-700 font-medium mb-4">អរគុណ — ការវាយតម្លៃរបស់អ្នកត្រូវបានបញ្ជូន។</p>}

      <Link
        to={`/buyer/complaints/new/${order.id}`}
        className="block text-center border border-alert text-alert font-semibold py-3 rounded-buyer"
      >
        រាយការណ៍លើបញ្ហាគុណភាព
      </Link>
    </div>
  );
};

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between px-5 py-3.5">
    <span className="text-ink/50">{label}</span>
    <span className="font-medium text-right">{value}</span>
  </div>
);

export default BuyerOrderDetails;
