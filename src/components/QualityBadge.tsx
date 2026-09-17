import React from "react";
import { ShieldCheck, ScanEye, ShieldQuestion } from "lucide-react";
import type { QualityVerification, QualityGrade } from "../types";

const gradeColor: Record<QualityGrade, string> = {
  A: "bg-leaf-100 text-leaf-700",
  B: "bg-harvest-100 text-harvest-600",
  C: "bg-clay-400/15 text-clay-500",
};

export const GradePill: React.FC<{ grade: QualityGrade }> = ({ grade }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${gradeColor[grade]}`}>
    កំរិត {grade}
  </span>
);

export const VerificationBadge: React.FC<{ verification: QualityVerification; compact?: boolean }> = ({
  verification,
  compact,
}) => {
  if (verification.status === "inspector_verified" && verification.inspection) {
    return (
      <span className="inline-flex items-center gap-1.5 text-leaf-700 text-xs font-medium">
        <ShieldCheck size={14} strokeWidth={2.4} />
        {compact ? "បានផ្ទៀងផ្ទាត់" : `បានផ្ទៀងផ្ទាត់ដោយ ${verification.inspection.inspectorName}`}
      </span>
    );
  }
  if (verification.status === "ai_checked") {
    return (
      <span className="inline-flex items-center gap-1.5 text-soil-600 text-xs font-medium">
        <ScanEye size={14} strokeWidth={2.4} />
        បានពិនិត្យដោយ AI
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-ink/40 text-xs font-medium">
      <ShieldQuestion size={14} strokeWidth={2.4} />
      មិនទាន់ផ្ទៀងផ្ទាត់
    </span>
  );
};
