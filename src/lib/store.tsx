import React, { createContext, useContext, useMemo, useState } from "react";
import type { Product, Order, BuyRequest, Notification, Complaint } from "../types";
import {
  products as initialProducts,
  orders as initialOrders,
  buyRequests as initialBuyRequests,
  notifications as initialNotifications,
  complaints as initialComplaints,
  currentFarmer,
  currentBuyer,
} from "../data/mockData";

interface AppDataContextValue {
  products: Product[];
  orders: Order[];
  buyRequests: BuyRequest[];
  notifications: Notification[];
  complaints: Complaint[];
  addProduct: (product: Product) => void;
  addBuyRequest: (request: BuyRequest) => void;
  addComplaint: (complaint: Complaint) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  markNotificationRead: (id: string) => void;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [buyRequests, setBuyRequests] = useState<BuyRequest[]>(initialBuyRequests);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);

  const value = useMemo<AppDataContextValue>(
    () => ({
      products,
      orders,
      buyRequests,
      notifications,
      complaints,
      addProduct: (product) => setProducts((prev) => [product, ...prev]),
      addBuyRequest: (request) => setBuyRequests((prev) => [request, ...prev]),
      addComplaint: (complaint) => setComplaints((prev) => [complaint, ...prev]),
      updateOrderStatus: (orderId, status) =>
        setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o))),
      markNotificationRead: (id) =>
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n))),
    }),
    [products, orders, buyRequests, notifications, complaints]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}

export { currentFarmer, currentBuyer };
