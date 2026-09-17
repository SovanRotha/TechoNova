import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RoleSelect from "./features/RoleSelect";

import { FarmerLayout } from "./components/FarmerLayout";
import FarmerDashboard from "./features/farmer/FarmerDashboard";
import SellProduct from "./features/farmer/SellProduct";
import MyProducts from "./features/farmer/MyProducts";
import FarmerOrders from "./features/farmer/FarmerOrders";
import FarmerOrderDetails from "./features/farmer/FarmerOrderDetails";
import MySales from "./features/farmer/MySales";
import FarmerNotifications from "./features/farmer/FarmerNotifications";
import FarmerProfile from "./features/farmer/FarmerProfile";

import { BuyerLayout } from "./components/BuyerLayout";
import BuyerDashboard from "./features/buyer/BuyerDashboard";
import Marketplace from "./features/buyer/Marketplace";
import ProductDetails from "./features/buyer/ProductDetails";
import CreateBuyRequest from "./features/buyer/CreateBuyRequest";
import MyBuyRequests from "./features/buyer/MyBuyRequests";
import BuyRequestDetails from "./features/buyer/BuyRequestDetails";
import FarmerDetails from "./features/buyer/FarmerDetails";
import BuyerOrders from "./features/buyer/BuyerOrders";
import BuyerOrderDetails from "./features/buyer/BuyerOrderDetails";
import QualityVerification from "./features/buyer/QualityVerification";
import Complaints from "./features/buyer/Complaints";
import Favorites from "./features/buyer/Favorites";
import BuyerNotifications from "./features/buyer/BuyerNotifications";
import BuyerProfile from "./features/buyer/BuyerProfile";

import AdminDashboard from "./features/admin/AdminDashboard";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authenticated = localStorage.getItem("technova-authenticated") === "true";
  return authenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/roles"
        element={
          <ProtectedRoute>
            <RoleSelect />
          </ProtectedRoute>
        }
      />

      <Route path="/farmer" element={<ProtectedRoute><FarmerLayout /></ProtectedRoute>}>
        <Route index element={<FarmerDashboard />} />
        <Route path="sell" element={<SellProduct />} />
        <Route path="products" element={<MyProducts />} />
        <Route path="orders" element={<FarmerOrders />} />
        <Route path="orders/:orderId" element={<FarmerOrderDetails />} />
        <Route path="sales" element={<MySales />} />
        <Route path="notifications" element={<FarmerNotifications />} />
        <Route path="profile" element={<FarmerProfile />} />
      </Route>

      <Route path="/buyer" element={<ProtectedRoute><BuyerLayout /></ProtectedRoute>}>
        <Route index element={<BuyerDashboard />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="marketplace/:productId" element={<ProductDetails />} />
        <Route path="marketplace/farmer/:farmerId" element={<FarmerDetails />} />
        <Route path="requests" element={<MyBuyRequests />} />
        <Route path="requests/new" element={<CreateBuyRequest />} />
        <Route path="requests/:requestId" element={<BuyRequestDetails />} />
        <Route path="orders" element={<BuyerOrders />} />
        <Route path="orders/:orderId" element={<BuyerOrderDetails />} />
        <Route path="quality" element={<QualityVerification />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="complaints/new/:orderId" element={<Complaints />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="notifications" element={<BuyerNotifications />} />
        <Route path="profile" element={<BuyerProfile />} />
      </Route>

      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
