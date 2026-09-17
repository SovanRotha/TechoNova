import React from "react";
import { Link } from "react-router-dom";
import { MapPin, CalendarDays, Users } from "lucide-react";
import type { BuyRequest } from "../types";

const statusText: Record<BuyRequest["status"], string> = {
  Open: "បើក",
  "Responses Received": "បានទទួលការឆ្លើយតប",
  Fulfilled: "បានបំពេញ",
  Closed: "បានបិទ",
};

const statusStyles: Record<BuyRequest["status"], string> = {
  Open: "bg-leaf-100 text-leaf-700",
  "Responses Received": "bg-harvest-100 text-harvest-600",
  Fulfilled: "bg-leaf-700 text-white",
  Closed: "bg-soil-100 text-soil-600",
};

export const BuyRequestCard: React.FC<{ request: BuyRequest; to: string }> = ({ request, to }) => (
  <Link to={to} className="block bg-white rounded-buyer border border-soil-100 p-4 hover:border-leaf-400 transition-colors">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs text-ink/50 uppercase tracking-wide">{request.buyerName}</p>
        <h3 className="font-display text-lg mt-0.5">
          ត្រូវការអោយ {request.quantityKg} kg {request.product}
        </h3>
      </div>
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyles[request.status]}`}>
        {statusText[request.status]}
      </span>
    </div>
    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-ink/60">
      <span className="inline-flex items-center gap-1">
        <CalendarDays size={14} /> {request.deliveryDate}
      </span>
      <span className="inline-flex items-center gap-1">
        <MapPin size={14} /> {request.location}
      </span>
      {request.responses.length > 0 && (
        <span className="inline-flex items-center gap-1">
          <Users size={14} /> {request.responses.length} ចម្លើយតប
        </span>
      )}
    </div>
    <div className="flex items-center justify-between mt-3">
      <span className="text-sm text-ink/50">គុណភាព: {request.quality === "Any Grade" ? "គ្រប់កំរិត" : `កំរិត ${request.quality}`}</span>
      <span className="font-semibold text-leaf-700">${request.targetPrice.toFixed(2)}/kg គោលដៅ</span>
    </div>
  </Link>
);
