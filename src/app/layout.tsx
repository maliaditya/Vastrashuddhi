import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import { Inter as FontSans } from "next/font/google"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const title = 'Vastrashuddhi – Professional Laundry & Dry Cleaning';
const description = 'Professional laundry and dry cleaning service with free pickup and delivery. Book easily on WhatsApp. Clean, hygienic, and reliable service.';
const ogDescription = 'Professional laundry and dry cleaning with free pickup and delivery. Book easily on WhatsApp.';
const url = 'https://vastrashuddhi.vercel.app';
const ogImage = 'https://placehold.co/1200x630/25D366/FFFFFF/png?text=VastraShuddhi';


export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: ogDescription,
    url: url,
    siteName: 'Vastrashuddhi',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Vastrashuddhi Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: ogDescription,
    images: [ogImage],
  },
  metadataBase: new URL(url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
