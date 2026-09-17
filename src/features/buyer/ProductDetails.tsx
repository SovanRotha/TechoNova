import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MessageCircle, Heart, ScanEye, ShieldCheck } from "lucide-react";
import { useAppData } from "../../lib/store";
import { GradePill } from "../../components/QualityBadge";
import { RatingStars } from "../../components/RatingStars";

const ProductDetails: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products } = useAppData();
  const [favorite, setFavorite] = useState(false);
  const product = products.find((p) => p.id === productId);

  if (!product) return <p className="text-ink/50">រកមិនឃើញផលិតផលនេះទេ។</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={() => navigate(-1)} className="text-ink/50 text-sm mb-4">
        ← ត្រឡប់ទៅទីផ្សារ
      </button>

      <div className="grid md:grid-cols-2 gap-6">
        <img src={product.photo} alt={product.name} className="w-full aspect-square object-cover rounded-buyer" />

        <div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-display text-3xl">{product.name}</h1>
              <p className="text-ink/50 mt-1">{product.description}</p>
            </div>
            <button
              onClick={() => setFavorite((f) => !f)}
              className="w-10 h-10 rounded-full border border-soil-100 flex items-center justify-center shrink-0"
              aria-label="Toggle favorite"
            >
              <Heart size={18} className={favorite ? "fill-clay-500 text-clay-500" : "text-ink/40"} />
            </button>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <GradePill grade={product.qualityGrade} />
            <RatingStars value={product.rating} showValue />
            <span className="text-sm text-ink/40">({product.reviewCount} reviews)</span>
          </div>

          <p className="font-display text-3xl text-leaf-700 mt-4">${product.pricePerKg.toFixed(2)}/kg</p>
          <p className="text-ink/60">{product.quantityKg} kg available</p>

          <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
            <InfoRow label="កសិករ" value={product.farmerName} />
            <InfoRow label="ទីតាំង" value={product.location} />
            <InfoRow label="កាលបរិច្ឆេទច្រូត" value={product.harvestDate} />
            <InfoRow label="វិធីធ្វើកសិដ្ឋាន" value={product.farmingMethod} />
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button className="flex-1 min-w-[140px] bg-leaf-700 text-white font-semibold py-3 rounded-buyer">
              ទិញឥឡូវនេះ
            </button>
            <Link
              to="/buyer/requests/new"
              className="flex-1 min-w-[140px] text-center border border-leaf-700 text-leaf-700 font-semibold py-3 rounded-buyer"
            >
              បង្កើតសំណើទិញ
            </Link>
            <Link
              to={`/buyer/marketplace/farmer/${product.farmerId}`}
              className="flex items-center gap-1.5 border border-soil-100 px-4 py-3 rounded-buyer text-sm font-medium"
            >
              <MessageCircle size={16} /> ទាក់ទងកសិករ
            </Link>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-10">
        <div className="bg-white border border-soil-100 rounded-buyer p-5">
          <h2 className="flex items-center gap-2 font-medium mb-3">
            <ScanEye size={18} className="text-soil-600" /> វិភាគគុណភាពដោយ AI
          </h2>
          {product.verification.aiAnalysis ? (
            <div className="space-y-2 text-sm">
              <Row label="មុខមាត់" value={product.verification.aiAnalysis.appearance} />
              <Row label="ការខូចប៉ះ" value={product.verification.aiAnalysis.visibleDamage} />
              <Row label="ភាពស្របនៃពណ៍" value={product.verification.aiAnalysis.colorConsistency} />
              <Row label="គុណភាពដែលប៉ាន់ស្មាន" value={`Grade ${product.verification.aiAnalysis.estimatedGrade}`} />
              <p className="text-xs text-ink/40 pt-2 border-t border-soil-100 mt-3">
                ការវិភាគ AI គឺជាការវាយតម្លៃដោយចិត្តដំបូងលើរូបភាពដែលបានបង្ហោះ។ វាមិនធានាថា គុណភាពពិតប្រាកដនឹងស្ថិតនៅក្នុងផលិតផលទេ។
              </p>
            </div>
          ) : (
            <p className="text-sm text-ink/50">មិនទាន់បានវិភាគនៅឡើយទេ។</p>
          )}
        </div>

        <div className="bg-white border border-soil-100 rounded-buyer p-5">
          <h2 className="flex items-center gap-2 font-medium mb-3">
            <ShieldCheck size={18} className="text-leaf-700" /> ការត្រួតពិនិត្យគុណភាពដោយមនុស្ស
          </h2>
          {product.verification.inspection ? (
            <div className="space-y-2 text-sm">
              <Row label="អ្នកត្រួតពិនិត្យ" value={product.verification.inspection.inspectorName} />
              <Row label="កាលបរិច្ឆេទពិនិត្យ" value={product.verification.inspection.inspectionDate} />
              <Row label="ដំណាក់កាលគុណភាព" value={`Grade ${product.verification.inspection.grade}`} />
            </div>
          ) : (
            <div>
              <p className="text-sm text-ink/50 mb-3">មិនទាន់មានអ្នកត្រួតពិនិត្យដែលទំនុកចិត្តបានពិនិត្យនៅឡើយទេ។</p>
              <button className="text-sm font-semibold text-leaf-700">ស្នើសុំការត្រួតពិនិត្យសម្រាប់ការបញ្ជាទិញនេះ →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-ink/40 text-xs">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <span className="text-ink/50">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default ProductDetails;
