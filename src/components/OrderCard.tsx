import React from "react";
import { Link } from "react-router-dom";
import type { Order } from "../types";

const statusText: Record<Order["status"], string> = {
  New: "ថ្មី",
  Accepted: "បានទទួល",
  Preparing: "កំពង់រៀបចំ",
  Ready: "រួចរាល់",
  Delivered: "បានដឹកជញ្ជូន",
  Completed: "បានបញ្ចប់",
  Cancelled: "បានបោះបង់",
};

const statusStyles: Record<Order["status"], string> = {
  New: "bg-leaf-100 text-leaf-700",
  Accepted: "bg-harvest-100 text-harvest-600",
  Preparing: "bg-harvest-100 text-harvest-600",
  Ready: "bg-leaf-100 text-leaf-700",
  Delivered: "bg-soil-100 text-soil-600",
  Completed: "bg-leaf-700 text-white",
  Cancelled: "bg-clay-400/15 text-clay-500",
};

export const OrderCard: React.FC<{
  order: Order;
  basePath: string;
  counterpartLabel: string;
  counterpartName: string;
}> = ({ order, basePath, counterpartLabel, counterpartName }) => (
  <Link
    to={`${basePath}/${order.id}`}
    className="block bg-white rounded-buyer border border-soil-100 p-4 hover:border-leaf-400 transition-colors"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs text-ink/50">{order.id}</p>
        <h3 className="font-display text-lg mt-0.5">{order.productName}</h3>
      </div>
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[order.status]}`}>
        {statusText[order.status]}
      </span>
    </div>
    <div className="grid grid-cols-2 gap-y-1.5 mt-3 text-sm">
      <div className="text-ink/50">{counterpartLabel === "Farmer" ? "កសិករ" : "អ្នកទិញ"}</div>
      <div className="text-right font-medium">{counterpartName}</div>
      <div className="text-ink/50">បរិមាណ</div>
      <div className="text-right font-medium">{order.quantityKg} kg</div>
      <div className="text-ink/50">សរុប</div>
      <div className="text-right font-medium text-leaf-700">${order.totalAmount.toFixed(2)}</div>
      <div className="text-ink/50">ការដឹកជញ្ជូន</div>
      <div className="text-right font-medium">{order.deliveryDate}</div>
    </div>
  </Link>
);
