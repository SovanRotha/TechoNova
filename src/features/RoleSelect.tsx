import React from "react";
import { Link } from "react-router-dom";
import { Sprout, Store, ArrowRight } from "lucide-react";

const RoleSelect: React.FC = () => {
  return (
    <div className="min-h-screen bg-leaf-800 flex flex-col items-center justify-center px-6 py-16 text-white">
      <div className="flex items-center gap-2 mb-2">
        <Sprout size={22} />
        <span className="font-display text-2xl">TechNova</span>
      </div>
      <p className="text-white/70 mb-12 text-center max-w-xs">
        ទីផ្សារដែលផ្សារភ្ញាក់ទាក់ទងដោយផ្ទាល់រវាងកសិករ និងអ្នកទិញ។
      </p>

      <div className="w-full max-w-3xl grid sm:grid-cols-2 gap-5">
        <Link
          to="/farmer"
          className="group bg-leaf-700 hover:bg-leaf-600 transition-colors rounded-farmer p-7 flex flex-col"
        >
          <span className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center mb-5">
            <Sprout size={22} />
          </span>
          <h2 className="font-display text-2xl mb-1.5">ខ្ញុំជាកសិករ</h2>
          <p className="text-white/70 text-sm mb-8 flex-1">
            បញ្ជីផលិតផលដែលអ្នកធ្វើកសិដ្ឋាន, ទទួលសំណើ និងការបញ្ជាទិញ, និងតាមដានការលក់របស់អ្នក — ក្នុងរយៈពេលខ្លី។
          </p>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            ចូលទៅកាន់ទិដ្ឋភាពកសិករ <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <Link
          to="/buyer"
          className="group bg-white text-ink hover:bg-soil-50 transition-colors rounded-buyer p-7 flex flex-col"
        >
          <span className="w-12 h-12 rounded-full bg-leaf-100 text-leaf-700 flex items-center justify-center mb-5">
            <Store size={22} />
          </span>
          <h2 className="font-display text-2xl mb-1.5 text-leaf-800">ខ្ញុំជាអ្នកទិញ</h2>
          <p className="text-ink/60 text-sm mb-8 flex-1">
            ស្វែងរកផលិតផលស្រស់, ប្រកាសសំណើទិញ, ប្រៀបធៀបកសិករ, និងផ្ទៀងផ្ទាត់គុណភាពមុនពេលធ្វើការបញ្ជាទិញ។
          </p>
          <span className="inline-flex items-center gap-1.5 font-semibold text-leaf-700">
            ចូលទៅកាន់ទិដ្ឋភាពអ្នកទិញ <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>

      <Link to="/admin" className="mt-10 text-sm text-white/50 hover:text-white/80">
        ផ្ទាំងគ្រប់គ្រង →
      </Link>
    </div>
  );
};

export default RoleSelect;
