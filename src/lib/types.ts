export type OrderStatus =
  | 'New Request'
  | 'Pickup Assigned'
  | 'Picked Up'
  | 'In Laundry'
  | 'Laundry Completed'
  | 'In Ironing'
  | 'Ready for Delivery'
  | 'Delivered';

export const orderStatusFlow: OrderStatus[] = [
  'New Request',
  'Pickup Assigned',
  'Picked Up',
  'In Laundry',
  'Laundry Completed',
  'In Ironing',
  'Ready for Delivery',
  'Delivered',
];

export type Role = 'Admin' | 'Pickup Staff' | 'Laundry Worker' | 'Ironing Worker' | 'Delivery Staff';

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: Role;
};

export type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  pickupAddress: string;
  itemCount: number;
  status: OrderStatus;
  createdAt: string;
  assignedTo?: string; // User ID
};
