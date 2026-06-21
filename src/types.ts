export enum RequestStatus {
  NEW = "New",
  QUOTE_SENT = "Quote Sent",
  AWAITING_SHIPMENT = "Awaiting Shipment",
  IN_REPAIR = "In Repair",
  COMPLETED = "Completed",
  DELIVERED = "Delivered",
}

export interface Service {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  duration?: string;
  imageUrl?: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  faqs?: { question: string; answer: string }[];
}

export interface RepairRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  whatsApp?: string;
  city?: string;
  country?: string;
  serviceId: string;
  serviceName: string;
  batBrand: string;
  batCondition: string;
  description?: string;
  imageUrl?: string;
  preferredDate?: string;
  preferredTime?: string;
  deliveryMethod: "Ship My Bat" | "Drop Off Personally" | "Pickup Required" | string;
  status: RequestStatus;
  createdAt: string; // ISO String
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  batModel?: string;
  serviceReceived?: string;
  date?: string;
  isFeatured?: boolean;
}

export interface PricingLine {
  id: string;
  serviceGroup: string; // e.g. "Workshop Classics", "Full Restoration"
  serviceName: string;
  price: string;
  priceType: "Fixed" | "Starting From" | "Custom Quote";
}

export interface LegalPageData {
  id: "privacy-policy" | "terms-conditions" | "refund-policy" | "shipping-policy" | "cookie-policy" | string;
  title: string;
  content: string;
  lastUpdated?: string;
}

export interface HomepageContent {
  id: "hero" | string;
  headline: string;
  subheadline: string;
  ctaText: string;
  whatsAppNumber: string;
}

export interface WorkshopGalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  category: "Repair" | "Workshop" | "Before/After" | string;
  description?: string;
  createdAt?: string;
}

// ==========================================
// FUTURE SCALABILITY ARCHITECTURE FRAMEWORKS
// ==========================================

export interface CustomerAccount {
  id: string;
  uid: string; // Firebase Auth UID
  email: string;
  fullName: string;
  phone?: string;
  shippingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    postcode: string;
    country: string;
  };
  createdAt: string;
  lastLoginAt?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: "Bespoke Cricket Bats" | "Accessories" | string;
  price: number;
  inventoryCount: number;
  imageUrl: string;
  woodType?: "Grade 1 English Willow" | "Grade 2 English Willow" | "Sourced Kashmir Willow" | string;
  weightOptions?: string[]; // e.g., ["2.7lb", "2.8lb", "2.9lb"]
  handleOptions?: ("Oval" | "Round" | "Semi-Oval")[];
  isFeatured?: boolean;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  quantity: number;
  unitPrice: number;
  selectedWeight?: string;
  selectedHandle?: string;
}

export type PaymentMethod = "Stripe" | "PayPal" | "Bank Transfer";

export interface Order {
  id: string;
  customerId: string; // References CustomerAccount or "GUEST"
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentTransactionId?: string;
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    postcode: string;
    country: string;
  };
  orderStatus: "PLACED" | "PREPARING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
}

export interface InventoryLog {
  id: string;
  productId: string;
  currentCount: number;
  previousCount: number;
  changeAmount: number; // e.g., -1 for sale, +10 for restock
  reason: "SALE" | "RESTOCK" | "AUDIT" | "RECONCILIATION";
  createdAt: string;
}

export interface AdvancedRepairTrack {
  id: string;
  requestId: string; // References RepairRequest
  ownerUid: string;
  currentStage: "DIAGNOSTICS" | "REPAIRING" | "OIL_CURING" | "BUFFING" | "PACKAGING" | "DISPATCHED";
  activityTimeline: {
    stage: string;
    completedAt: string;
    notes?: string;
    photoUpdateUrl?: string;
  }[];
  notes?: string;
  completionPercentage: number;
}
