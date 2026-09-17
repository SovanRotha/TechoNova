import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { StepWizard, PrimaryButton, BigOption } from "../../components/StepWizard";
import { useAppData, currentBuyer } from "../../lib/store";
import type { BuyRequest, QualityGrade } from "../../types";

const qualityOptions: (QualityGrade | "Any Grade")[] = ["A", "B", "C", "Any Grade"];

const CreateBuyRequest: React.FC = () => {
  const navigate = useNavigate();
  const { addBuyRequest } = useAppData();
  const [step, setStep] = useState(1);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [location, setLocation] = useState(currentBuyer.location);
  const [quality, setQuality] = useState<QualityGrade | "Any Grade">("A");
  const [targetPrice, setTargetPrice] = useState("");
  const totalSteps = 7;

  const goBack = () => (step === 1 ? navigate(-1) : setStep(step - 1));

  const handlePost = () => {
    const request: BuyRequest = {
      id: `req-${Date.now()}`,
      buyerId: currentBuyer.id,
      buyerName: currentBuyer.businessName,
      product,
      quantityKg: Number(quantity) || 0,
      deliveryDate,
      location,
      quality,
      targetPrice: Number(targetPrice) || 0,
      status: "Open",
      responses: [],
      createdAt: new Date().toISOString().slice(0, 10),
    };
    addBuyRequest(request);
    setStep(8);
  };

  if (step === 8) {
    return (
      <div className="max-w-lg mx-auto text-center pt-16">
        <CheckCircle2 size={64} className="text-leaf-600 mx-auto mb-5" />
        <h1 className="font-display text-3xl mb-2">សំណើទិញរបស់អ្នកត្រូវបានចេញផ្សាយរួចរាល់។</h1>
        <p className="text-ink/60 mb-8">កសិករដែលអាចបំពេញបាននឹងត្រូវបានជូនដំណឹង និងអាចឆ្លើយតបទៅកាន់ក្រុមហ៊ុនណាមួយ។</p>
        <PrimaryButton fullWidth onClick={() => navigate("/buyer/requests")}>
          មើលសំណើទិញរបស់ខ្ញុំ
        </PrimaryButton>
      </div>
    );
  }

  return (
    <StepWizard
      step={step}
      totalSteps={totalSteps}
      onBack={goBack}
      title={
        step === 1
          ? "តើអ្នកត្រូវការផលិតផលអ្វី?"
          : step === 2
          ? "តើអ្នកត្រូវការប៉ុន្មាន?"
          : step === 3
          ? "តើអ្នកត្រូវការវេលាណាមួយ?"
          : step === 4
          ? "តើវាត្រូវបានដឹកជញ្ជូននៅកន្លែងណា?"
          : step === 5
          ? "តើអ្នកត្រូវការគុណភាពអ្វី?"
          : step === 6
          ? "តើតម្លៃគោលដៅរបស់អ្នកគឺជាអ្វី?"
          : "ពិនិត្យសំណើរបស់អ្នក"
      }
    >
      {step === 1 && (
        <div className="space-y-4">
          <input
            autoFocus
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="e.g. Tomatoes"
            className="w-full px-4 py-3.5 border-2 border-soil-100 rounded-buyer outline-none focus:border-leaf-600 text-lg"
          />
          <PrimaryButton fullWidth disabled={!product} onClick={() => setStep(2)}>
            បន្ទាប់
          </PrimaryButton>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="flex items-center border-2 border-soil-100 rounded-buyer overflow-hidden focus-within:border-leaf-600">
            <input
              autoFocus
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="500"
              className="w-full px-4 py-3.5 text-lg outline-none"
            />
            <span className="px-4 text-ink/50">kg</span>
          </div>
          <PrimaryButton fullWidth disabled={!quantity} onClick={() => setStep(3)}>
            បន្ទាប់
          </PrimaryButton>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <input
            autoFocus
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="w-full px-4 py-3.5 border-2 border-soil-100 rounded-buyer outline-none focus:border-leaf-600 text-lg"
          />
          <PrimaryButton fullWidth disabled={!deliveryDate} onClick={() => setStep(4)}>
            បន្ទាប់
          </PrimaryButton>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <input
            autoFocus
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Phnom Penh"
            className="w-full px-4 py-3.5 border-2 border-soil-100 rounded-buyer outline-none focus:border-leaf-600 text-lg"
          />
          <PrimaryButton fullWidth disabled={!location} onClick={() => setStep(5)}>
            បន្ទាប់
          </PrimaryButton>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-3">
          {qualityOptions.map((q) => (
            <BigOption
              key={q}
              label={q === "Any Grade" ? "គ្រប់កំរិត" : `កំរិត ${q}`}
              selected={quality === q}
              onClick={() => setQuality(q)}
            />
          ))}
          <PrimaryButton fullWidth onClick={() => setStep(6)} className="mt-2">
            បន្ទាប់
          </PrimaryButton>
        </div>
      )}

      {step === 6 && (
        <div className="space-y-4">
          <div className="flex items-center border-2 border-soil-100 rounded-buyer overflow-hidden focus-within:border-leaf-600">
            <span className="px-4 text-ink/50">$</span>
            <input
              autoFocus
              type="number"
              step="0.01"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              placeholder="0.50"
              className="w-full px-2 py-3.5 text-lg outline-none"
            />
            <span className="px-4 text-ink/50">/kg</span>
          </div>
          <PrimaryButton fullWidth disabled={!targetPrice} onClick={() => setStep(7)}>
            បន្ទាប់
          </PrimaryButton>
        </div>
      )}

      {step === 7 && (
        <div>
          <div className="bg-white border border-soil-100 rounded-buyer divide-y divide-soil-100">
            <SummaryRow label="ផលិតផល" value={product} />
            <SummaryRow label="បរិមាណ" value={`${quantity} kg`} />
            <SummaryRow label="កាលបរិច្ឆេទដឹកជញ្ជូន" value={deliveryDate} />
            <SummaryRow label="ទីតាំង" value={location} />
            <SummaryRow label="គុណភាព" value={quality === "Any Grade" ? "គ្រប់កំរិត" : `កំរិត ${quality}`} />
            <SummaryRow label="តម្លៃគោលដៅ" value={`$${targetPrice}/kg`} />
          </div>
          <PrimaryButton fullWidth onClick={handlePost} className="mt-6">
            បង្ហោះសំណើទិញ
          </PrimaryButton>
        </div>
      )}
    </StepWizard>
  );
};

const SummaryRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between px-5 py-3.5">
    <span className="text-ink/50">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default CreateBuyRequest;
