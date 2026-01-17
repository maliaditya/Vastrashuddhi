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
  icons: {
    icon: "data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2724%27%20height=%2724%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27currentColor%27%20stroke-width=%272%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3e%3cpath%20d=%27M3%206h3%27/%3e%3cpath%20d=%27M17%206h.01%27/%3e%3crect%20width=%2718%27%20height=%2720%27%20x=%273%27%20y=%272%27%20rx=%272%27/%3e%3ccircle%20cx=%2712%27%20cy=%2713%27%20r=%275%27/%3e%3cpath%20d=%27M12%2018a2.5%202.5%200%200%200%200-5%202.5%202.5%200%200%201%200-5%27/%3e%3c/svg%3e",
  },
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
