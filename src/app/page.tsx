'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import type { Order, OrderStatus } from '@/lib/types';
import { orders as allOrders } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const order = allOrders.find(o => o.id.toLowerCase() === orderId.toLowerCase() || o.customerPhone === orderId);
    setFoundOrder(order || null);
  };

  const getStatusIcon = (status: OrderStatus) => {
    const Icon = Icons[status];
    return <Icon className="h-5 w-5" />;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-background to-primary/20">
      <div className="absolute top-4 right-4">
        <Button asChild variant="outline">
          <Link href="/dashboard">Staff Panel</Link>
        </Button>
      </div>
      <div className="flex items-center gap-3 mb-8">
        <Icons.logo className="h-12 w-12 text-primary" />
        <h1 className="text-5xl font-headline font-bold" style={{color: 'hsl(var(--primary-foreground))'}}>LaundryBot</h1>
      </div>
      <Card className="w-full max-w-md shadow-2xl bg-card">
        <CardHeader>
          <CardTitle className="text-2xl">Track Your Order</CardTitle>
          <CardDescription>Enter your Order ID or Phone Number to see the status.</CardDescription>
        </CardHeader>
        <form onSubmit={handleTrackOrder}>
          <CardContent>
            <Input
              placeholder="e.g., LB-101 or +15551234567"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="text-base"
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full text-base py-6" variant="default">
              Track Order
            </Button>
          </CardFooter>
        </form>
      </Card>

      {searched && (
        <Card className="w-full max-w-md mt-6 shadow-2xl bg-card animate-in fade-in-50">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            {foundOrder ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">Order ID</span>
                  <span className="font-bold">{foundOrder.id}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">Customer</span>
                  <span className="font-bold">{foundOrder.customerName}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">Status</span>
                  <Badge className="text-sm px-3 py-1 flex items-center gap-2" style={{ 
                    backgroundColor: `hsl(var(--primary))`,
                    color: `hsl(var(--primary-foreground))`
                  }}>
                    {getStatusIcon(foundOrder.status)}
                    <span>{foundOrder.status}</span>
                  </Badge>
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No order found with that ID or phone number.</p>
            )}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
