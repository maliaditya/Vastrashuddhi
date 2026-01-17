'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OrderList } from "./order-list";
import type { Order, User, Role, OrderStatus } from "@/lib/types";
import { orderStatusFlow } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardClientProps {
  initialOrders: Order[];
  users: User[];
}

export function DashboardClient({ initialOrders, users }: DashboardClientProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [currentUser, setCurrentUser] = useState<User>(users[0]); // Default to Admin
  const [adminSelectedStatus, setAdminSelectedStatus] = useState<OrderStatus>('New Request');
  
  const isMobile = useIsMobile();

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };
  
  const getVisibleOrdersForRole = (role: Role, statusForAdmin?: OrderStatus): Order[] => {
    if (role === 'Admin') {
      return orders.filter(o => o.status === statusForAdmin);
    }
    
    const roleStatusMap: Partial<Record<Role, OrderStatus[]>> = {
      'Pickup Staff': ['Pickup Assigned'],
      'Laundry Worker': ['Picked Up', 'In Laundry'],
      'Ironing Worker': ['Laundry Completed', 'In Ironing'],
      'Delivery Staff': ['Ready for Delivery'],
    };
    
    const visibleStatuses = roleStatusMap[role] || [];
    return orders.filter(o => visibleStatuses.includes(o.status));
  };

  const getRoleSpecificTitle = (role: Role) => {
    const titles: Record<Role, string> = {
      'Admin': 'All Orders',
      'Pickup Staff': 'Assigned Pickups',
      'Laundry Worker': 'Laundry Queue',
      'Ironing Worker': 'Ironing Queue',
      'Delivery Staff': 'Ready for Delivery',
    };
    return titles[role];
  };

  const renderAdminView = () => {
    // On first render on client, isMobile can be false even on mobile.
    // So we'll get a flash of tabs before it switches to select. This is acceptable.
    if (isMobile) {
      return (
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="status-select">Filter by Status</Label>
            <Select 
              value={adminSelectedStatus} 
              onValueChange={(status) => setAdminSelectedStatus(status as OrderStatus)}
            >
              <SelectTrigger id="status-select">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                {orderStatusFlow.map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <OrderList
            orders={getVisibleOrdersForRole(currentUser.role, adminSelectedStatus)}
            currentUser={currentUser}
            onUpdateStatus={handleUpdateOrderStatus}
          />
        </div>
      );
    }

    return (
      <Tabs value={adminSelectedStatus} onValueChange={(status) => setAdminSelectedStatus(status as OrderStatus)} className="space-y-4">
        <TabsList className="overflow-x-auto whitespace-nowrap h-auto justify-start">
          {orderStatusFlow.map(status => (
            <TabsTrigger key={status} value={status}>{status}</TabsTrigger>
          ))}
        </TabsList>
        {/* We still render all TabsContent, and Tabs component handles showing the active one. */}
        {orderStatusFlow.map(status => (
          <TabsContent key={status} value={status} className="space-y-4">
            <OrderList
              orders={getVisibleOrdersForRole(currentUser.role, status)}
              currentUser={currentUser}
              onUpdateStatus={handleUpdateOrderStatus}
            />
          </TabsContent>
        ))}
      </Tabs>
    );
  };

  return (
    <>
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">{getRoleSpecificTitle(currentUser.role)}</h2>
        <div className="w-full md:w-auto">
           <div className="grid w-full items-center gap-1.5 md:w-[280px]">
            <Label>Viewing as (for demo)</Label>
            <Select
              value={currentUser.id}
              onValueChange={(userId) => {
                const user = users.find(u => u.id === userId);
                if (user) setCurrentUser(user);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role to view as" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name} ({user.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
           </div>
        </div>
      </div>

      {currentUser.role === 'Admin' ? renderAdminView() : (
        <OrderList
          orders={getVisibleOrdersForRole(currentUser.role)}
          currentUser={currentUser}
          onUpdateStatus={handleUpdateOrderStatus}
        />
      )}
    </>
  );
}
