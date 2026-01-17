import {
  WashingMachine,
  Shirt,
  Sparkles,
  Truck,
  PackagePlus,
  PackageCheck,
  UserCheck,
  Home,
  Bot,
  LayoutDashboard,
  Users,
  Settings,
  type Icon as LucideIcon,
} from 'lucide-react';

export type Icon = typeof LucideIcon;

export const Icons = {
  logo: Bot,
  'New Request': PackagePlus,
  'Pickup Assigned': UserCheck,
  'Picked Up': Truck,
  'In Laundry': WashingMachine,
  'Laundry Completed': Shirt,
  'In Ironing': Sparkles,
  'Ready for Delivery': PackageCheck,
  'Delivered': Home,
  dashboard: LayoutDashboard,
  users: Users,
  settings: Settings,
};
