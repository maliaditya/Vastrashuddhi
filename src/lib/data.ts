import type { Order, User } from './types';

export const users: User[] = [
  { id: 'user-1', name: 'Alice Admin', email: 'alice@laundrybot.com', avatarUrl: 'https://picsum.photos/seed/1/40/40', role: 'Admin' },
  { id: 'user-2', name: 'Bob Pickup', email: 'bob@laundrybot.com', avatarUrl: 'https://picsum.photos/seed/2/40/40', role: 'Pickup Staff' },
  { id: 'user-3', name: 'Charlie Laundry', email: 'charlie@laundrybot.com', avatarUrl: 'https://picsum.photos/seed/3/40/40', role: 'Laundry Worker' },
  { id: 'user-4', name: 'Diana Ironing', email: 'diana@laundrybot.com', avatarUrl: 'https://picsum.photos/seed/4/40/40', role: 'Ironing Worker' },
  { id: 'user-5', name: 'Evan Delivery', email: 'evan@laundrybot.com', avatarUrl: 'https://picsum.photos/seed/5/40/40', role: 'Delivery Staff' },
];

export const orders: Order[] = [
  { id: 'LB-101', customerName: 'John Doe', customerPhone: '+15551234567', pickupAddress: '123 Main St, Anytown, USA', itemCount: 15, status: 'New Request', createdAt: '2024-07-28T10:00:00Z' },
  { id: 'LB-102', customerName: 'Jane Smith', customerPhone: '+15552345678', pickupAddress: '456 Oak Ave, Anytown, USA', itemCount: 8, status: 'Pickup Assigned', createdAt: '2024-07-28T11:30:00Z', assignedTo: 'user-2' },
  { id: 'LB-103', customerName: 'Peter Jones', customerPhone: '+15553456789', pickupAddress: '789 Pine Ln, Anytown, USA', itemCount: 22, status: 'Picked Up', createdAt: '2024-07-28T09:45:00Z' },
  { id: 'LB-104', customerName: 'Mary Johnson', customerPhone: '+15554567890', pickupAddress: '101 Maple Dr, Anytown, USA', itemCount: 12, status: 'In Laundry', createdAt: '2024-07-27T18:00:00Z' },
  { id: 'LB-105', customerName: 'David Williams', customerPhone: '+15555678901', pickupAddress: '212 Birch Rd, Anytown, USA', itemCount: 5, status: 'Laundry Completed', createdAt: '2024-07-27T15:20:00Z' },
  { id: 'LB-106', customerName: 'Susan Brown', customerPhone: '+15556789012', pickupAddress: '313 Cedar Ct, Anytown, USA', itemCount: 30, status: 'In Ironing', createdAt: '2024-07-27T14:00:00Z' },
  { id: 'LB-107', customerName: 'Michael Miller', customerPhone: '+15557890123', pickupAddress: '414 Elm St, Anytown, USA', itemCount: 18, status: 'Ready for Delivery', createdAt: '2024-07-26T16:00:00Z', assignedTo: 'user-5' },
  { id: 'LB-108', customerName: 'Karen Davis', customerPhone: '+15558901234', pickupAddress: '515 Spruce Way, Anytown, USA', itemCount: 10, status: 'Delivered', createdAt: '2024-07-25T12:00:00Z' },
  { id: 'LB-109', customerName: 'James Wilson', customerPhone: '+15559012345', pickupAddress: '616 Ash Blvd, Anytown, USA', itemCount: 7, status: 'In Laundry', createdAt: '2024-07-28T14:00:00Z' },
  { id: 'LB-110', customerName: 'Patricia Taylor', customerPhone: '+15550123456', pickupAddress: '717 Willow Ave, Anytown, USA', itemCount: 14, status: 'New Request', createdAt: '2024-07-28T14:30:00Z' },
];
