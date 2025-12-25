
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  RIDER = 'RIDER',
  VENDOR = 'VENDOR'
}

export enum VehicleType {
  BIKE = 'Bike',
  CAR = 'Car',
  VAN = 'Van'
}

export enum AvailabilityType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  WEEKEND = 'Weekend'
}

export enum BusinessCategory {
  FOOD = 'Food & Groceries',
  TECH = 'Tech & Electronics',
  PHARMACY = 'Pharmacy',
  FASHION = 'Fashion'
}

export interface User {
  id: string;
  phone: string;
  fullName: string;
  role: UserRole;
  location: string;
}

export interface CustomerProfile extends User {
  address?: string;
}

export interface RiderProfile extends User {
  vehicleType: VehicleType;
  availability: AvailabilityType;
  licenseNumber: string;
}

export interface VendorProfile extends User {
  businessName: string;
  category: BusinessCategory;
  address: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  vendorId: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export type OrderStatus = 'Processing' | 'Out for Delivery' | 'Delivered' | 'Completed' | 'Cancelled';

export interface DetailedOrder {
  id: string;
  title: string;
  date: string;
  time: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryAddress: string;
  vendor: {
    name: string;
    category: string;
    location: string;
  };
}
