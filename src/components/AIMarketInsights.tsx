import React from "react";
import { Lightbulb, Sparkles, Tag, TrendingUp } from "lucide-react";
import type { Product } from "../types";

interface AIMarketInsightsProps {
  products: Product[];
  audience?: "buyer" | "farmer";
}

const AIMarketInsights: React.FC<AIMarketInsightsProps> = ({ products, audience = "buyer" }) => {
  const averagePrice = products.length
    ? products.reduce((sum, product) => sum + product.pricePerKg, 0) / products.length
    : 0;
  const popularCategory = products.reduce<Record<string, number>>((counts, product) => {
    counts[product.category] = (counts[product.category] || 0) + product.quantityKg;
    return counts;
  }, {});
  const leadingCategory = Object.entries(popularCategory).sort(([, first], [, second]) => second - first)[0]?.[0] || "ផលិតផលស្រស់";
  const suggestedPrice = averagePrice * 0.95;
  const isFarmer = audience === "farmer";

  return (
    <section className="bg-leaf-50 border border-leaf-100 rounded-buyer p-5 mb-6">
      <div className="flex items-start gap-3">
        <span className="w-10 h-10 shrink-0 rounded-buyer bg-leaf-700 text-white flex items-center justify-center">
          <Sparkles size={19} />
        </span>
        <div>
          <h2 className="font-display text-xl text-leaf-900">សំណើឆ្លាតវៃពី AI សម្រាប់{isFarmer ? "កសិករ" : "អ្នកទិញ"}</h2>
          <p className="text-sm text-ink/60 mt-1">ព័ត៌មានសង្ខេបពីទីផ្សារ ដើម្បីជួយអ្នកសម្រេចចិត្តបានលឿន។</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mt-5">
        <Insight icon={TrendingUp} label="និន្នាការទីផ្សារ" value={isFarmer ? `${leadingCategory} កំពុងមានការផ្គត់ផ្គង់ច្រើន` : `${leadingCategory} មានជម្រើសច្រើនសម្រាប់អ្នកទិញ`} />
        <Insight icon={Tag} label={isFarmer ? "តម្លៃលក់ដែលណែនាំ" : "តម្លៃដែលណែនាំ"} value={`ប្រហែល $${suggestedPrice.toFixed(2)}/គីឡូ`} />
        <Insight icon={Lightbulb} label={isFarmer ? "គន្លឹះសម្រាប់កសិករ" : "គន្លឹះសម្រាប់អ្នកទិញ"} value={isFarmer ? "បន្ថែមរូបភាពច្បាស់ និងបញ្ជាក់ថ្ងៃប្រមូលផល" : "ប្រៀបធៀបគុណភាព និងទីតាំង មុនបញ្ជាទិញ"} />
      </div>

      <p className="text-xs text-ink/50 mt-4">ការណែនាំនេះគឺផ្អែកលើផលិតផល និងតម្លៃដែលមានក្នុងទីផ្សារបច្ចុប្បន្ន។ តម្លៃពិតអាចប្រែប្រួលតាមរដូវកាល និងគុណភាព។</p>
    </section>
  );
};

const Insight: React.FC<{ icon: React.ElementType; label: string; value: string }> = ({ icon: Icon, label, value }) => (
  <div className="bg-white/80 border border-leaf-100 rounded-buyer p-3">
    <Icon size={17} className="text-leaf-700 mb-2" />
    <p className="text-xs text-ink/50">{label}</p>
    <p className="text-sm font-medium mt-1">{value}</p>
  </div>
);

export default AIMarketInsights;