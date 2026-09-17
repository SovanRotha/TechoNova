import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Heart } from "lucide-react";
import type { Product } from "../types";
import { GradePill, VerificationBadge } from "./QualityBadge";
import { RatingStars } from "./RatingStars";

function daysAgo(dateStr: string) {
  const days = Math.max(
    0,
    Math.round((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24))
  );
  if (days === 0) return "ច្រូតថ្មីថ្ងៃនេះ";
  if (days === 1) return "ច្រូតមួយថ្ងៃមុន";
  return `ច្រូត ${days} ថ្ងៃមុន`;
}

export const ProductCard: React.FC<{
  product: Product;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}> = ({ product, isFavorite, onToggleFavorite }) => {
  return (
    <div className="group bg-white rounded-buyer border border-soil-100 overflow-hidden hover:shadow-lifted transition-shadow">
      <div className="relative aspect-[4/3] overflow-hidden bg-soil-50">
        <img
          src={product.photo}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => onToggleFavorite?.(product.id)}
          aria-label="Toggle favorite"
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-soft"
        >
          <Heart size={16} className={isFavorite ? "fill-clay-500 text-clay-500" : "text-ink/40"} />
        </button>
        <div className="absolute top-2 left-2">
          <GradePill grade={product.qualityGrade} />
        </div>
      </div>
      <div className="p-3.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg leading-tight text-ink">{product.name}</h3>
          <span className="font-semibold text-leaf-700 whitespace-nowrap">${product.pricePerKg.toFixed(2)}/kg</span>
        </div>
        <p className="text-sm text-ink/60 mt-0.5">{product.quantityKg} kg មានសល់</p>
        <div className="flex items-center gap-1 text-xs text-ink/50 mt-1.5">
          <MapPin size={12} />
          {product.location}
          <span className="mx-1">·</span>
          {daysAgo(product.harvestDate)}
        </div>
        <div className="flex items-center justify-between mt-2.5">
          <VerificationBadge verification={product.verification} compact />
          <RatingStars value={product.rating} size={12} />
        </div>
        <Link
          to={`/buyer/marketplace/${product.id}`}
          className="mt-3 block text-center bg-leaf-700 text-white text-sm font-medium py-2 rounded-buyer hover:bg-leaf-800 transition-colors"
        >
          មើលផលិតផល
        </Link>
      </div>
    </div>
  );
};
