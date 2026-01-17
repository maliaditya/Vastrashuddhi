import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import { Inter as FontSans } from "next/font/google"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const title = 'VastraShuddhi';
const description = 'A WhatsApp-first laundry management system.';
// NOTE: You should replace this with your actual production URL
const url = 'https://vastrashuddhi.com'; 
const ogImage = 'https://images.unsplash.com/photo-1655041448985-f6666cba2d6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxsYXVuZHJ5JTIwcm9vbXxlbnwwfHx8fDE3Njg2MDkxNDR8MA&ixlib=rb-4.1.0&q=80&w=1080';


export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
    url: url,
    siteName: title,
    images: [
      {
        url: ogImage,
        width: 1080,
        height: 720,
        alt: 'A modern and clean laundry room.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
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
