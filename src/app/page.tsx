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
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";

export default function LandingPage() {
  const [orderId, setOrderId] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [isPickupDialogOpen, setIsPickupDialogOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const { toast } = useToast();

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const order = allOrders.find(o => o.id.toLowerCase() === orderId.toLowerCase() || o.customerPhone === orderId);
    setFoundOrder(order || null);
  };
  
  const clearCustomerForm = () => {
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
  }

  const handleNewOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      // Very basic validation for demo purposes
      alert("Please fill out all fields.");
      return;
    }

    const newOrderId = `VS-${Math.floor(1000 + Math.random() * 9000)}`;
    const businessName = 'VastraShuddhi';
    const messageTemplate = `Hello ${customerName} 👋  
We have received your laundry request.

🧾 Order ID: ${newOrderId}

Our team will contact you shortly for pickup details.  
– ${businessName}`;
    
    // IMPORTANT: Replace with your actual WhatsApp Business phone number, including country code, without '+' or '00'.
    const businessPhoneNumber = '1234567890'; 
    const whatsappUrl = `https://wa.me/${businessPhoneNumber}?text=${encodeURIComponent(messageTemplate)}`;

    window.open(whatsappUrl, '_blank');

    setIsOrderDialogOpen(false);
    clearCustomerForm();
  };

  const handleSchedulePickupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert("Please fill out all fields.");
      return;
    }

    // In a real app, you would submit this data to a backend API.
    // For this demo, we'll just show a success message.
    toast({
      title: "Pickup Scheduled!",
      description: "Our team will connect with you shortly.",
    });

    setIsPickupDialogOpen(false);
    clearCustomerForm();
  };


  const getStatusIcon = (status: OrderStatus) => {
    const Icon = Icons[status];
    return <Icon className="h-5 w-5" />;
  };
  
  const services = [
    {
      title: "Wash & Fold",
      description: "Crisp, clean, and folded laundry, ready to be put away. We handle your everyday items with care.",
      icon: "In Laundry",
      image: placeholderImages.find(p => p.id === "service-wash-fold")
    },
    {
      title: "Ironing",
      description: "Perfectly pressed shirts, trousers, and linens for a sharp, professional look.",
      icon: "In Ironing",
      image: placeholderImages.find(p => p.id === "service-ironing")
    },
    {
      title: "Dry Cleaning",
      description: "Specialized care for your delicate and valuable garments, ensuring they last longer.",
      icon: "Ready for Delivery",
      image: placeholderImages.find(p => p.id === "service-dry-cleaning")
    }
  ]

  const howItWorksSteps = [
    {
      title: "Bag Up Your Laundry",
      description: "Place your clothes in any bag. Don't worry about sorting, we'll do it for you.",
      icon: Icons.howItWorks.step1,
    },
    {
      title: "We Pick It Up",
      description: "Schedule a pickup and our driver will collect your laundry right from your doorstep.",
      icon: Icons.howItWorks.step2,
    },
    {
      title: "We Clean & Care",
      description: "Our experts wash, fold, iron, or dry clean your items with the utmost attention to quality.",
      icon: Icons.howItWorks.step3,
    },
    {
      title: "We Deliver",
      description: "Get your fresh, clean laundry delivered back to you, ready for your wardrobe.",
      icon: Icons.howItWorks.step4,
    }
  ]
  
  const testimonials = [
      {
          name: "Sarah J.",
          review: "VastraShuddhi is a lifesaver! The pickup and delivery are always on time, and my clothes come back perfectly clean and folded. I have so much more free time now."
      },
      {
          name: "Mark T.",
          review: "The quality of the ironing service is top-notch. My shirts have never looked better. The app is also super easy to use for tracking my orders."
      },
      {
          name: "Emily R.",
          review: "As a busy mom, I can't imagine my week without VastraShuddhi. It's reliable, convenient, and the customer service is excellent. Highly recommended!"
      }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="h-8 w-8 text-primary" />
            <span className="font-bold text-lg">VastraShuddhi</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="#services" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Services</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">How It Works</Link>
            <Link href="#testimonials" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Testimonials</Link>
            <Link href="#track" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Track Order</Link>
          </nav>
          <Button asChild>
            <Link href="/dashboard">Staff Panel</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[70vh] flex items-center justify-center text-center bg-cover bg-center" style={{backgroundImage: `url('${placeholderImages.find(p => p.id === 'hero')?.imageUrl}')`}}>
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 space-y-4 px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white">The Last Laundry Day You'll Ever Have</h1>
                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">Get your laundry and dry cleaning done with the tap of a button. We pick up, clean, and deliver, so you can get back to doing what you love.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                  <Dialog open={isOrderDialogOpen} onOpenChange={(open) => { setIsOrderDialogOpen(open); if (!open) clearCustomerForm();}}>
                    <DialogTrigger asChild>
                        <Button size="lg" className="bg-[#25D366] text-white hover:bg-[#25D366]/90">
                          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 fill-current"><title>WhatsApp</title><path d="M12.04 2.02c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.02 22l5.25-1.38c1.45.79 3.08 1.21 4.77 1.21 5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zm0 18.02c-1.6 0-3.15-.4-4.52-1.15l-.32-.19-3.36.88.89-3.28-.21-.33c-.8-1.29-1.22-2.79-1.22-4.34 0-4.52 3.69-8.21 8.21-8.21 4.52 0 8.21 3.69 8.21 8.21s-3.69 8.21-8.21 8.21zm4.52-6.15c-.25-.12-1.47-.72-1.7-.81-.22-.09-.38-.12-.54.12-.16.25-.64.81-.79.97-.15.16-.3.18-.54.06s-1.02-.38-1.94-1.2c-.72-.63-1.19-1.4-1.34-1.64s-.03-.21.09-.33c.11-.11.25-.29.38-.43.12-.15.16-.25.25-.41.09-.17.04-.31-.02-.43s-.54-1.29-.74-1.77c-.2-.48-.4-.41-.54-.42-.14-.01-.3 0-.46 0s-.42.06-.64.31c-.22.25-.86.84-.86 2.05 0 1.21.88 2.37 1 2.53s1.75 2.67 4.23 3.74c.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.12-.25-.19-.5-.31z"/></svg>
                          Chat on WhatsApp
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>New Laundry Request</DialogTitle>
                            <DialogDescription>
                                Enter your details to start a new order on WhatsApp.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleNewOrderSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        placeholder="Your full name"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        type="tel"
                                        id="phone"
                                        placeholder="Your phone number"
                                        value={customerPhone}
                                        onChange={(e) => setCustomerPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="address">Pickup Address</Label>
                                    <Textarea
                                        id="address"
                                        placeholder="Your full pickup address"
                                        value={customerAddress}
                                        onChange={(e) => setCustomerAddress(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="w-full bg-[#25D366] text-white hover:bg-[#25D366]/90">
                                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 fill-current"><title>WhatsApp</title><path d="M12.04 2.02c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.02 22l5.25-1.38c1.45.79 3.08 1.21 4.77 1.21 5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zm0 18.02c-1.6 0-3.15-.4-4.52-1.15l-.32-.19-3.36.88.89-3.28-.21-.33c-.8-1.29-1.22-2.79-1.22-4.34 0-4.52 3.69-8.21 8.21-8.21 4.52 0 8.21 3.69 8.21 8.21s-3.69 8.21-8.21 8.21zm4.52-6.15c-.25-.12-1.47-.72-1.7-.81-.22-.09-.38-.12-.54.12-.16.25-.64.81-.79.97-.15.16-.3.18-.54.06s-1.02-.38-1.94-1.2c-.72-.63-1.19-1.4-1.34-1.64s-.03-.21.09-.33c.11-.11.25-.29.38-.43.12-.15.16-.25.25-.41.09-.17.04-.31-.02-.43s-.54-1.29-.74-1.77c-.2-.48-.4-.41-.54-.42-.14-.01-.3 0-.46 0s-.42.06-.64.31c-.22.25-.86.84-.86 2.05 0 1.21.88 2.37 1 2.53s1.75 2.67 4.23 3.74c.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.12-.25-.19-.5-.31z"/></svg>
                                    Send Request via WhatsApp
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isPickupDialogOpen} onOpenChange={(open) => { setIsPickupDialogOpen(open); if (!open) clearCustomerForm();}}>
                    <DialogTrigger asChild>
                      <Button size="lg" variant="secondary">
                        Schedule a Pickup
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Schedule a Pickup</DialogTitle>
                        <DialogDescription>
                          Enter your details and we'll arrange a pickup for you.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSchedulePickupSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="pickup-name">Name</Label>
                                <Input
                                    type="text"
                                    id="pickup-name"
                                    placeholder="Your full name"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="pickup-phone">Phone Number</Label>
                                <Input
                                    type="tel"
                                    id="pickup-phone"
                                    placeholder="Your phone number"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="pickup-address">Pickup Address</Label>
                                <Textarea
                                    id="pickup-address"
                                    placeholder="Your full pickup address"
                                    value={customerAddress}
                                    onChange={(e) => setCustomerAddress(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="w-full">
                            Request Pickup
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
            </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 lg:py-24">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight lg:text-4xl mb-2">Our Services</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">From everyday laundry to special care items, we've got you covered.</p>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map(service => {
                  const Icon = Icons[service.icon as keyof typeof Icons];
                  return (
                    <Card key={service.title} className="text-left overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        {service.image && <Image src={service.image.imageUrl} alt={service.title} width={600} height={400} className="rounded-t-lg object-cover h-48 w-full" data-ai-hint={service.image.imageHint} />}
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Icon className="h-6 w-6 text-primary" />
                                {service.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{service.description}</p>
                        </CardContent>
                    </Card>
                  )
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 lg:py-24 bg-muted/50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight lg:text-4xl mb-2">How It Works</h2>
            <p className="text-muted-foreground mb-12">Four simple steps to laundry freedom.</p>
            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {howItWorksSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                     <div key={index} className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4 ring-8 ring-background">
                            <Icon className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  )
              })}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 lg:py-24">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight lg:text-4xl mb-2">What Our Customers Say</h2>
                <p className="text-muted-foreground mb-12">We're proud to be trusted by our amazing customers.</p>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map(testimonial => (
                        <Card key={testimonial.name} className="bg-card">
                            <CardContent className="pt-6">
                                <p className="italic text-muted-foreground">"{testimonial.review}"</p>
                                <p className="font-semibold mt-4 text-foreground">— {testimonial.name}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>


        {/* Track Order Section */}
        <section id="track" className="py-16 lg:py-24 bg-muted/50">
          <div className="flex flex-col items-center justify-center gap-6">
            <Card className="w-full max-w-md shadow-lg">
              <CardHeader className="text-center">
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
              <Card className="w-full max-w-md shadow-lg animate-in fade-in-50">
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
                        <Badge className="text-sm px-3 py-1 flex items-center gap-2" variant="default">
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
          </div>
        </section>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container text-center text-muted-foreground text-sm">
            <p>&copy; {new Date().getFullYear()} VastraShuddhi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
