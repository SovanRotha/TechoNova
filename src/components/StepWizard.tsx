import React from "react";
import { ChevronLeft } from "lucide-react";

export const StepWizard: React.FC<{
  step: number;
  totalSteps: number;
  title: string;
  onBack: () => void;
  children: React.ReactNode;
  large?: boolean;
}> = ({ step, totalSteps, title, onBack, children, large }) => (
  <div className="max-w-xl mx-auto">
    <div className="flex items-center gap-3 mb-5">
      <button
        onClick={onBack}
        aria-label="Go back"
        className="w-10 h-10 rounded-full bg-white border border-soil-100 flex items-center justify-center shrink-0"
      >
        <ChevronLeft size={20} />
      </button>
      <div className="flex-1 flex gap-1.5">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i < step ? "bg-leaf-600" : "bg-soil-100"}`}
          />
        ))}
      </div>
    </div>
    <h1 className={large ? "font-display text-3xl mb-6 leading-tight" : "font-display text-2xl mb-6"}>{title}</h1>
    {children}
  </div>
);

export const BigOption: React.FC<{
  label: string;
  emoji?: string;
  selected: boolean;
  onClick: () => void;
}> = ({ label, emoji, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-5 py-4 rounded-farmer border-2 text-lg font-medium transition-colors ${
      selected ? "border-leaf-600 bg-leaf-50 text-leaf-800" : "border-soil-100 bg-white text-ink"
    }`}
  >
    {emoji && <span className="text-2xl">{emoji}</span>}
    {label}
  </button>
);

export const PrimaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { fullWidth?: boolean }
> = ({ fullWidth, className = "", children, ...props }) => (
  <button
    {...props}
    className={`${fullWidth ? "w-full" : ""} bg-leaf-700 disabled:bg-soil-200 disabled:text-ink/40 text-white font-semibold py-4 rounded-farmer text-lg hover:bg-leaf-800 transition-colors ${className}`}
  >
    {children}
  </button>
);
