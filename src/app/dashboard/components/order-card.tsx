'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import type { Order, User, OrderStatus } from "@/lib/types";
import { orderStatusFlow } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { StatusUpdateDialog } from "./status-update-dialog";
import { Badge } from "@/components/ui/badge";

interface OrderCardProps {
  order: Order;
  currentUser: User;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
}

const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
  const currentIndex = orderStatusFlow.indexOf(currentStatus);
  if (currentIndex < orderStatusFlow.length - 1) {
    return orderStatusFlow[currentIndex + 1];
  }
  return null;
};

const canUpdateStatus = (role: User['role'], currentStatus: OrderStatus): boolean => {
  if (role === 'Admin') return currentStatus !== 'Delivered';
  
  switch (currentStatus) {
    case 'New Request': return false; // Only admin can assign pickup, but we'll allow it for demo
    case 'Pickup Assigned': return role === 'Pickup Staff';
    case 'Picked Up': return role === 'Laundry Worker';
    case 'In Laundry': return role === 'Laundry Worker';
    case 'Laundry Completed': return role === 'Ironing Worker';
    case 'In Ironing': return role === 'Ironing Worker';
    case 'Ready for Delivery': return role === 'Delivery Staff';
    case 'Delivered': return false;
    default: return false;
  }
};


export function OrderCard({ order, currentUser, onUpdateStatus }: OrderCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const nextStatus = getNextStatus(order.status);
  const canUpdate = nextStatus && canUpdateStatus(currentUser.role, order.status);

  const StatusIcon = Icons[order.status];

  return (
    <>
      <Card className="flex flex-col w-full max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{order.id}</CardTitle>
              <CardDescription>{order.customerName}</CardDescription>
            </div>
            <Badge variant="outline" className="flex items-center gap-2">
              <StatusIcon className="h-4 w-4" />
              <span>{order.status}</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Separator />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Phone</span>
            <span className="font-medium">{order.customerPhone}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Items</span>
            <span className="font-medium">{order.itemCount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Received</span>
            <span className="font-medium">
              {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          {canUpdate ? (
            <Button
              className="w-full"
              variant="default"
              onClick={() => setIsDialogOpen(true)}
            >
              Update to "{nextStatus}"
            </Button>
          ) : (
            <Button className="w-full" variant="outline" disabled>
              {order.status === 'Delivered' ? 'Completed' : 'Awaiting next step'}
            </Button>
          )}
        </CardFooter>
      </Card>
      {canUpdate && nextStatus && (
        <StatusUpdateDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          order={order}
          nextStatus={nextStatus}
          onUpdateStatus={onUpdateStatus}
        />
      )}
    </>
  );
}
