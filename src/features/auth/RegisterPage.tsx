import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem("technova-authenticated", "true");
    navigate("/roles");
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
              placeholder="អ្នកប្រើ TechNova"
              className="w-full mt-2 px-4 py-3 border border-soil-100 rounded-buyer outline-none focus:border-leaf-600"
            />
          </label>

          <label className="block">
            <span className="text-sm text-ink/60">អ៊ីមែល</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-2 px-4 py-3 border border-soil-100 rounded-buyer outline-none focus:border-leaf-600"
            />
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
