export type ServiceCategory = 'all' | 'wash-fold' | 'dry-cleaning' | 'ironing' | 'bedding-linens';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  unit: string;
  description: string;
  turnaroundHours: number;
  popular?: boolean;
  ecoFriendly?: boolean;
}

export interface LaundryServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  features: string[];
  startingPrice: string;
  bestFor: string;
}

export interface CartItem {
  itemId: string;
  quantity: number;
}

export type OrderStatusStep = 
  | 'placed'
  | 'picked_up'
  | 'inspecting'
  | 'washing'
  | 'pressing'
  | 'out_for_delivery'
  | 'delivered';

export interface OrderTimelineEvent {
  step: OrderStatusStep;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
}

export interface OrderRecord {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  pickupDate: string;
  pickupTimeSlot: string;
  deliveryDate: string;
  serviceType: string;
  items: { name: string; qty: number }[];
  totalAmount: number;
  status: OrderStatusStep;
  timeline: OrderTimelineEvent[];
  driverName?: string;
  driverPhone?: string;
  specialInstructions?: string;
}

export interface StainCareItem {
  id: string;
  name: string;
  iconName: string;
  quickDos: string;
  donts: string;
  proTreatment: string;
  severity: 'Light' | 'Moderate' | 'Urgent';
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  service: string;
  comment: string;
  date: string;
  verified: boolean;
  turnaround: string;
}
