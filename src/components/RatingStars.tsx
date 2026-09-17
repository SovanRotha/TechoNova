import React from "react";
import { Star } from "lucide-react";

export const RatingStars: React.FC<{ value: number; size?: number; showValue?: boolean }> = ({
  value,
  size = 14,
  showValue = false,
}) => (
  <span className="inline-flex items-center gap-1">
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(value) ? "fill-harvest-500 text-harvest-500" : "fill-soil-100 text-soil-100"}
        />
      ))}
    </span>
    {showValue && <span className="text-sm font-medium text-ink/70">{value.toFixed(1)}</span>}
  </span>
);

export const RatingInput: React.FC<{ value: number; onChange: (v: number) => void; label: string }> = ({
  value,
  onChange,
  label,
}) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm text-ink/70">{label}</span>
    <span className="inline-flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          aria-label={`${label}: ${i} star${i > 1 ? "s" : ""}`}
          onClick={() => onChange(i)}
          className="p-0.5"
        >
          <Star size={22} className={i <= value ? "fill-harvest-500 text-harvest-500" : "fill-soil-100 text-soil-100"} />
        </button>
      ))}
    </span>
  </div>
);
