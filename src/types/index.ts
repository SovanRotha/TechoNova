export type Role = "farmer" | "buyer" | "admin";

export type QualityGrade = "A" | "B" | "C";

export type VerificationStatus = "not_verified" | "ai_checked" | "inspector_verified";

export interface User {
  id: string;
  name: string;
  nationalId?: string;
  role: Role;
  avatarInitials: string;
  location: string;
}

export interface Farmer extends User {
  role: "farmer";
  farmName: string;
  yearsFarming: number;
  farmingMethod: string;
  rating: number;
  completedOrders: number;
  isVerified: boolean;
  qualityHistory: { grade: QualityGrade; percent: number }[];
}

export interface Buyer extends User {
  role: "buyer";
  businessName: string;
  businessType: "Restaurant" | "Hotel" | "Grocery Store" | "Market" | "Food Business" | "Individual Business";
}

export interface QualityVerification {
  status: VerificationStatus;
  aiAnalysis?: {
    appearance: "Good" | "Fair" | "Poor";
    visibleDamage: "Low" | "Medium" | "High";
    colorConsistency: "Good" | "Fair" | "Poor";
    estimatedGrade: QualityGrade;
  };
  inspection?: {
    inspectorName: string;
    inspectionDate: string;
    grade: QualityGrade;
  };
}

export interface Product {
  id: string;
  name: string;
  category: string;
  photo: string;
  farmerId: string;
  farmerName: string;
  location: string;
  quantityKg: number;
  pricePerKg: number;
  harvestDate: string;
  farmingMethod: string;
  description: string;
  qualityGrade: QualityGrade;
  verification: QualityVerification;
  rating: number;
  reviewCount: number;
}

export type OrderStatus =
  | "New"
  | "Accepted"
  | "Preparing"
  | "Ready"
  | "Delivered"
  | "Completed"
  | "Cancelled";

export interface Order {
  id: string;
  productId: string;
  productName: string;
  farmerId: string;
  farmerName: string;
  buyerId: string;
  buyerName: string;
  quantityKg: number;
  pricePerKg: number;
  totalAmount: number;
  deliveryLocation: string;
  deliveryDate: string;
  qualityRequirement: QualityGrade | "Any Grade";
  status: OrderStatus;
}

export type BuyRequestStatus = "Open" | "Responses Received" | "Fulfilled" | "Closed";

export interface FarmerResponse {
  farmerId: string;
  farmerName: string;
  offeredQuantityKg: number;
  offeredPrice: number;
  status: "Pending" | "Accepted" | "Declined";
}

export interface BuyRequest {
  id: string;
  buyerId: string;
  buyerName: string;
  product: string;
  quantityKg: number;
  deliveryDate: string;
  location: string;
  quality: QualityGrade | "Any Grade";
  targetPrice: number;
  status: BuyRequestStatus;
  responses: FarmerResponse[];
  createdAt: string;
}

export interface Review {
  id: string;
  orderId: string;
  productId: string;
  buyerName: string;
  productQuality: number;
  freshness: number;
  accuracy: number;
  packaging: number;
  overallExperience: number;
  comment: string;
  date: string;
}

export type ComplaintStatus =
  | "Submitted"
  | "Under Review"
  | "Evidence Requested"
  | "Approved"
  | "Rejected"
  | "Resolved";

export interface Complaint {
  id: string;
  orderId: string;
  problemType: string;
  description: string;
  expectedResolution: string;
  status: ComplaintStatus;
  createdAt: string;
}

export interface Notification {
  id: string;
  audience: Role;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface Inspector {
  id: string;
  name: string;
  region: string;
  completedInspections: number;
}
