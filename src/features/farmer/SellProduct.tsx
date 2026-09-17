import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, CheckCircle2 } from "lucide-react";
import { StepWizard, BigOption, PrimaryButton } from "../../components/StepWizard";
import { productCategories } from "../../data/mockData";
import { useAppData, currentFarmer } from "../../lib/store";
import type { Product } from "../../types";

const STOCK_PHOTOS: Record<string, string> = {
  Tomatoes: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&q=80",
  Cucumbers: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=600&q=80",
  Rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80",
  Chili: "https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=600&q=80",
  Fruits: "https://images.unsplash.com/photo-1527325678964-54921661f888?w=600&q=80",
  Vegetables: "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=600&q=80",
  Other: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80",
};

const emojiFor: Record<string, string> = {
  Vegetables: "🥬",
  Tomatoes: "🍅",
  Cucumbers: "🥒",
  Chili: "🌶️",
  Fruits: "🍇",
  Rice: "🌾",
  Other: "📦",
};

const categoryLabels: Record<string, string> = {
  Vegetables: "បន្លែ",
  Tomatoes: "ប៉េងប៉ោះ",
  Cucumbers: "ត្រសក់",
  Chili: "ម្ទេស",
  Fruits: "ផ្លែឈើ",
  Rice: "ស្រូវ",
  Other: "ផ្សេងៗ",
};

const farmingMethodLabels: Record<string, string> = {
  Organic: "សរីរាង្គ",
  Traditional: "ប្រពៃណី",
  Hydroponic: "ដាំដោយទឹក",
};

const SellProduct: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useAppData();
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photoAdded, setPhotoAdded] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [location, setLocation] = useState(currentFarmer.location);
  const [method, setMethod] = useState(farmingMethodLabels[currentFarmer.farmingMethod] ?? currentFarmer.farmingMethod);
  const [description, setDescription] = useState("");
  const totalSteps = 5;

  const goBack = () => {
    if (step === 1) navigate("/farmer");
    else setStep(step - 1);
  };

  const handleSubmit = () => {
    const product: Product = {
      id: `p-${Date.now()}`,
      name: name || category,
      category,
      photo: STOCK_PHOTOS[category] ?? STOCK_PHOTOS.Other,
      farmerId: currentFarmer.id,
      farmerName: currentFarmer.name,
      location,
      quantityKg: Number(quantity) || 0,
      pricePerKg: Number(price) || 0,
      harvestDate: harvestDate || new Date().toISOString().slice(0, 10),
      farmingMethod: method,
      description,
      qualityGrade: "A",
      verification: {
        status: "ai_checked",
        aiAnalysis: {
          appearance: "Good",
          visibleDamage: "Low",
          colorConsistency: "Good",
          estimatedGrade: "A",
        },
      },
      rating: 0,
      reviewCount: 0,
    };
    addProduct(product);
    setStep(6);
  };

  if (step === 6) {
    return (
      <div className="max-w-xl mx-auto text-center pt-16">
        <CheckCircle2 size={64} className="text-leaf-600 mx-auto mb-5" />
        <h1 className="font-display text-3xl mb-2">ផលិតផលរបស់អ្នកត្រូវបានបញ្ជីដោយជោគជ័យ។</h1>
        <p className="text-ink/60 mb-8">អ្នកទិញនៅជិតនេះអាចរកឃើញ និងស្នើសុំ {name || categoryLabels[category] || category} ខាងក្រោម។</p>
        <PrimaryButton fullWidth onClick={() => navigate("/farmer/products")}>
          មើលផលិតផលរបស់ខ្ញុំ
        </PrimaryButton>
      </div>
    );
  }

  return (
    <StepWizard
      step={step}
      totalSteps={totalSteps}
      title={
        step === 1
          ? "តើអ្នកកំពុងលក់អ្វី?"
          : step === 2
          ? "តើអ្នកមានប៉ុន្មាន?"
          : step === 3
          ? "ថតរូប"
          : step === 4
          ? "ព័ត៌មានផលិតផល"
          : "ពិនិត្យ និងបញ្ជូន"
      }
      onBack={goBack}
      large
    >
      {step === 1 && (
        <div className="space-y-3">
          {productCategories.map((c) => (
            <BigOption
              key={c}
              label={categoryLabels[c] ?? c}
              emoji={emojiFor[c]}
              selected={category === c}
              onClick={() => setCategory(c)}
            />
          ))}
          <PrimaryButton fullWidth disabled={!category} onClick={() => setStep(2)} className="mt-4">
            បន្ទាប់
          </PrimaryButton>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <label className="block">
            <span className="text-ink/60 text-sm">បរិមាណ</span>
            <div className="flex items-center mt-2 border-2 border-soil-100 rounded-farmer overflow-hidden focus-within:border-leaf-600">
              <input
                type="number"
                inputMode="decimal"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                className="w-full px-5 py-4 text-2xl outline-none"
                autoFocus
              />
              <span className="px-5 text-xl text-ink/50">kg</span>
            </div>
          </label>
          <PrimaryButton fullWidth disabled={!quantity} onClick={() => setStep(3)}>
            បន្ទាប់
          </PrimaryButton>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="aspect-video rounded-farmer bg-soil-50 border-2 border-dashed border-soil-200 flex items-center justify-center overflow-hidden">
            {photoAdded ? (
              <img src={STOCK_PHOTOS[category] ?? STOCK_PHOTOS.Other} alt="រូបភាពមើលជាមុន" className="w-full h-full object-cover" />
            ) : (
              <span className="text-ink/40 text-sm">មិនទាន់មានរូបភាព</span>
            )}
          </div>
          <button
            onClick={() => setPhotoAdded(true)}
            className="w-full flex items-center justify-center gap-2 border-2 border-soil-100 rounded-farmer py-4 text-lg font-medium"
          >
            <Camera size={22} /> ថតរូប
          </button>
          <button
            onClick={() => setPhotoAdded(true)}
            className="w-full flex items-center justify-center gap-2 border-2 border-soil-100 rounded-farmer py-4 text-lg font-medium"
          >
            <Upload size={22} /> បង្ហោះរូបភាព
          </button>
          <PrimaryButton fullWidth disabled={!photoAdded} onClick={() => setStep(4)}>
            បន្ទាប់
          </PrimaryButton>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <TextField label="ឈ្មោះផលិតផល" value={name} onChange={setName} placeholder={category} />
          <TextField label="តម្លៃក្នុងមួយគីឡូ ($)" value={price} onChange={setPrice} type="number" placeholder="0.50" />
          <TextField label="កាលបរិច្ឆេទច្រូត" value={harvestDate} onChange={setHarvestDate} type="date" />
          <TextField label="ទីតាំង" value={location} onChange={setLocation} />
          <TextField label="វិធីធ្វើកសិដ្ឋាន" value={method} onChange={setMethod} />
          <label className="block">
            <span className="text-ink/60 text-sm">ការពិពណ៌នាសង្ខេប</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full mt-2 px-4 py-3 border-2 border-soil-100 rounded-farmer outline-none focus:border-leaf-600 text-base"
              placeholder="បានច្រូតថ្មីៗ មិនបានប្រើគីមី..."
            />
          </label>
          <PrimaryButton fullWidth disabled={!price} onClick={() => setStep(5)}>
            បន្ទាប់
          </PrimaryButton>
        </div>
      )}

      {step === 5 && (
        <div>
          <div className="bg-white border border-soil-100 rounded-farmer divide-y divide-soil-100">
            <SummaryRow label="ផលិតផល" value={name || categoryLabels[category] || category} />
            <SummaryRow label="បរិមាណ" value={`${quantity} kg`} />
            <SummaryRow label="តម្លៃ" value={`$${price}/kg`} />
            <SummaryRow label="កាលបរិច្ឆេទច្រូត" value={harvestDate || "—"} />
            <SummaryRow label="ទីតាំង" value={location} />
            <SummaryRow label="វិធីធ្វើកសិដ្ឋាន" value={method} />
          </div>
          <PrimaryButton fullWidth onClick={handleSubmit} className="mt-6">
            បញ្ជូន
          </PrimaryButton>
        </div>
      )}
    </StepWizard>
  );
};

const TextField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}> = ({ label, value, onChange, type = "text", placeholder }) => (
  <label className="block">
    <span className="text-ink/60 text-sm">{label}</span>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full mt-2 px-4 py-3 border-2 border-soil-100 rounded-farmer outline-none focus:border-leaf-600 text-base"
    />
  </label>
);

const SummaryRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between px-5 py-3.5">
    <span className="text-ink/50">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default SellProduct;
