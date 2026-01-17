import { OrderCard } from "./order-card";
import type { Order, User } from "@/lib/types";

interface OrderListProps {
  orders: Order[];
  currentUser: User;
  onUpdateStatus: (orderId: string, newStatus: Order['status']) => void;
}

export function OrderList({ orders, currentUser, onUpdateStatus }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg bg-card">
        <p className="text-muted-foreground">No orders in this category.</p>
      </div>
    );
  }
  return (
    <div className="grid items-start justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          currentUser={currentUser}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
}
