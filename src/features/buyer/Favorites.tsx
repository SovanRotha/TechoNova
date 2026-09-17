import React from "react";
import { useAppData } from "../../lib/store";
import { ProductCard } from "../../components/ProductCard";

const Favorites: React.FC = () => {
  const { products } = useAppData();
  const favorites = products.slice(0, 2);

  return (
    <div>
      <h1 className="font-display text-2xl mb-5">Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-center text-ink/50 py-16">You haven't saved any products yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((p) => (
            <ProductCard key={p.id} product={p} isFavorite />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
