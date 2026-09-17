import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, FileUp, Leaf } from "lucide-react";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [nationalIdCard, setNationalIdCard] = useState<File | null>(null);
  const [idCardError, setIdCardError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nationalIdCard) {
      setIdCardError("សូមបញ្ចូលរូបថត ឬឯកសារអត្តសញ្ញាណប័ណ្ណជាតិ");
      return;
    }
    const formData = new FormData(event.currentTarget);
    const nationalId = String(formData.get("nationalId") ?? "").trim();
    localStorage.setItem("technova-registration", JSON.stringify({
      name: formData.get("name"),
      email: formData.get("email"),
      nationalId,
      nationalIdCard: {
        name: nationalIdCard.name,
        type: nationalIdCard.type,
        size: nationalIdCard.size,
      },
    }));
    localStorage.setItem("technova-authenticated", "true");
    navigate("/roles");
  };

  const handleIdCardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file && file.size > 5 * 1024 * 1024) {
      setNationalIdCard(null);
      setIdCardError("ឯកសារត្រូវមានទំហំតូចជាង ៥ មេកាបៃ");
      event.target.value = "";
      return;
    }
    setNationalIdCard(file);
    setIdCardError(file ? "" : "សូមបញ្ចូលរូបថត ឬឯកសារអត្តសញ្ញាណប័ណ្ណជាតិ");
  };

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white border border-soil-100 rounded-buyer shadow-soft p-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-10 h-10 rounded-buyer bg-leaf-700 text-white flex items-center justify-center">
            <Leaf size={18} />
          </span>
          <span className="font-display text-2xl text-leaf-800">TechNova</span>
        </div>

        <h1 className="font-display text-3xl text-center mb-2">បង្កើតគណនី</h1>
        <p className="text-center text-ink/60 mb-6">ចូលរួមជាមួយ TechNova សម្រាប់ទិញ និងលក់ផលិតផល</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm text-ink/60">ឈ្មោះពេញ</span>
            <input
              type="text"
              name="name"
              placeholder="អ្នកប្រើ TechNova"
              className="w-full mt-2 px-4 py-3 border border-soil-100 rounded-buyer outline-none focus:border-leaf-600"
            />
          </label>

          <label className="block">
            <span className="text-sm text-ink/60">អ៊ីមែល</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full mt-2 px-4 py-3 border border-soil-100 rounded-buyer outline-none focus:border-leaf-600"
            />
          </label>

          <label className="block">
            <span className="text-sm text-ink/60">លេខអត្តសញ្ញាណប័ណ្ណជាតិ</span>
            <input
              type="text"
              name="nationalId"
              inputMode="numeric"
              pattern="[0-9]{9}"
              minLength={9}
              maxLength={9}
              required
              placeholder="បញ្ចូលលេខ ៩ ខ្ទង់"
              className="w-full mt-2 px-4 py-3 border border-soil-100 rounded-buyer outline-none focus:border-leaf-600"
            />
            <span className="block text-xs text-ink/50 mt-1">ត្រូវការសម្រាប់ការផ្ទៀងផ្ទាត់សុវត្ថិភាព</span>
          </label>

          <label className="block">
            <span className="text-sm text-ink/60">រូបថត ឬឯកសារអត្តសញ្ញាណប័ណ្ណជាតិ</span>
            <span className="flex items-center justify-center gap-2 w-full mt-2 px-4 py-4 border-2 border-dashed border-soil-200 rounded-buyer text-ink/60 cursor-pointer hover:border-leaf-600 hover:text-leaf-700 transition-colors">
              <FileUp size={20} />
              {nationalIdCard ? nationalIdCard.name : "ជ្រើសរើសឯកសារ"}
              <input
                type="file"
                name="nationalIdCard"
                accept="image/*,.pdf"
                required
                onChange={handleIdCardChange}
                className="sr-only"
              />
            </span>
            <span className="block text-xs text-ink/50 mt-1">អាចប្រើ JPG, PNG ឬ PDF និងមានទំហំមិនលើស ៥ មេកាបៃ</span>
            {idCardError && <span className="block text-xs text-red-600 mt-1">{idCardError}</span>}
          </label>

          <label className="block">
            <span className="text-sm text-ink/60">លេខសម្ងាត់</span>
            <input
              type="password"
              placeholder="********"
              className="w-full mt-2 px-4 py-3 border border-soil-100 rounded-buyer outline-none focus:border-leaf-600"
            />
          </label>

          <label className="block">
            <span className="text-sm text-ink/60">បញ្ជាក់លេខសម្ងាត់</span>
            <input
              type="password"
              placeholder="********"
              className="w-full mt-2 px-4 py-3 border border-soil-100 rounded-buyer outline-none focus:border-leaf-600"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-leaf-700 hover:bg-leaf-800 transition-colors text-white font-semibold py-3.5 rounded-buyer flex items-center justify-center gap-2"
          >
            បង្កើតគណនី <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-ink/60">
          មានគណនីរួចហើយ? {" "}
          <Link to="/login" className="text-leaf-700 font-semibold">
            ចូល
          </Link>
        </div>

        <Link to="/login" className="mt-5 block text-center text-sm text-ink/60 hover:text-leaf-700">
          ត្រឡប់ទៅការចូលគណនី
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
