'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OrderList } from "./order-list";
import type { Order, User, Role, OrderStatus } from "@/lib/types";
import { orderStatusFlow } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface DashboardClientProps {
  initialOrders: Order[];
  users: User[];
}

export function DashboardClient({ initialOrders, users }: DashboardClientProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [currentUser, setCurrentUser] = useState<User>(users[0]); // Default to Admin

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

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{getRoleSpecificTitle(currentUser.role)}</h2>
        <div className="flex items-center space-x-2">
           <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Viewing as (for demo)</Label>
            <Select
              value={currentUser.id}
              onValueChange={(userId) => {
                const user = users.find(u => u.id === userId);
                if (user) setCurrentUser(user);
              }}
            >
              <SelectTrigger className="w-[280px]">
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

      {currentUser.role === 'Admin' ? (
        <Tabs defaultValue="New Request" className="space-y-4">
          <TabsList className="overflow-x-auto whitespace-nowrap h-auto justify-start">
            {orderStatusFlow.map(status => (
              <TabsTrigger key={status} value={status}>{status}</TabsTrigger>
            ))}
          </TabsList>
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
      ) : (
        <OrderList
          orders={getVisibleOrdersForRole(currentUser.role)}
          currentUser={currentUser}
          onUpdateStatus={handleUpdateOrderStatus}
        />
      )}
    </>
  );
}
