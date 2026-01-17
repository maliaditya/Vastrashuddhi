import { orders, users } from "@/lib/data";
import { DashboardClient } from "./components/dashboard-client";

export default function DashboardPage() {
  // In a real app, you'd fetch this data from your database
  const allOrders = orders;
  const allUsers = users;

  return (
    <DashboardClient initialOrders={allOrders} users={allUsers} />
  );
}
