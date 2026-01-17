# **App Name**: LaundryBot

## Core Features:

- WhatsApp Order Creation: Automatically create orders from incoming WhatsApp messages via webhook.
- Automated Status Updates: Send automatic WhatsApp status updates to customers via approved message templates.
- Role-Based Staff Panels: Web-based admin and staff panels with role-based dashboards, showing only relevant orders and actions.
- Order Status Workflow: Implement a state machine to manage the order status workflow, with status changes triggering visibility updates in staff panels.
- Public Order Tracking: Allow customers to track their order status via a public tracking page using either Order ID or phone number.
- WhatsApp Template Selector tool: A generative AI tool that provides a suggestion for which WhatsApp message template to send based on the order status. It provides this output when the automated status updaters need to send messages to clients
- Admin Override: Allows administrators to override any status for an order.

## Style Guidelines:

- Primary color: Soft teal (#66CDAA), evoking cleanliness and efficiency.
- Background color: Light pale teal (#E0FFFF), a gentle and clean backdrop.
- Accent color: Warm coral (#FF7F50), used sparingly to draw attention to key actions and updates.
- Body and headline font: 'PT Sans' (sans-serif) for a modern, accessible look in the staff panel and customer website.
- Use simple, clear icons representing each laundry process stage (washing machine, iron, etc.)
- Clean, mobile-first design with clear calls to action on the staff panels.
- Subtle animations for status transitions, providing visual feedback to users.