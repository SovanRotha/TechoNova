import React, { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useAppData } from "../../lib/store";
import { ProductCard } from "../../components/ProductCard";
import { productCategories } from "../../data/mockData";
import AIMarketInsights from "../../components/AIMarketInsights";

const Marketplace: React.FC = () => {
  const { products } = useAppData();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = category === "All" || p.category === category;
        return matchesQuery && matchesCategory;
      }),
    [products, query, category]
  );

  return (
    <div>
      <h1 className="font-display text-2xl mb-4">ទីផ្សារ</h1>
      <AIMarketInsights products={products} />
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1 flex items-center gap-2 bg-white border border-soil-100 rounded-buyer px-4 py-2.5">
          <Search size={18} className="text-ink/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ស្វែងរកផលិតផល..."
            className="w-full outline-none text-sm"
          />
        </div>
        <div className="flex items-center gap-2 bg-white border border-soil-100 rounded-buyer px-3">
          <SlidersHorizontal size={16} className="text-ink/40" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="py-2.5 outline-none text-sm bg-transparent"
          >
            <option>ទាំងអស់</option>
            {productCategories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-ink/50 py-16">មិនមានផលិតផលដែលត្រូវនឹងការស្វែងរករបស់អ្នកទេ។</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} isFavorite={favorites.includes(p.id)} onToggleFavorite={toggleFavorite} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
