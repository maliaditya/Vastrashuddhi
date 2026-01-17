import {
  WashingMachine,
  Shirt,
  Sparkles,
  Truck,
  PackagePlus,
  PackageCheck,
  UserCheck,
  Home,
  LayoutDashboard,
  Users,
  Settings,
  Package,
  Repeat,
  Smile,
  type Icon as LucideIcon,
} from 'lucide-react';

export type Icon = typeof LucideIcon;

export const Icons = {
  logo: WashingMachine,
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
  howItWorks: {
    step1: Package,
    step2: Truck,
    step3: Repeat,
    step4: Smile,
  }
};
