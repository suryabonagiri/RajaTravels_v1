import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#00479E",
};

export const metadata: Metadata = {
  title: "Raja Travels | AP Tourism Authorized Agent | Bus Rental & Papikondalu Tourism",
  description:
    "Raja Travels - AP Tourism Authorized Tours and Travels in Rajahmundry. Premium bus rental services, Papikondalu boat tourism, Maredumilli eco tours, and APTDC Haritha Hotels & Resorts bookings. Book your journey today!",
  keywords: [
    "Raja Travels",
    "AP Tourism",
    "Papikondalu",
    "Maredumilli",
    "APTDC Haritha Hotels",
    "Haritha Resorts",
    "Bus Rental Rajahmundry",
    "Tourism Andhra Pradesh",
    "Godavari Boat Tour",
    "Bus Hire",
    "Group Tours AP",
  ],
  openGraph: {
    title: "Raja Travels | AP Tourism Authorized Agent",
    description:
      "Premium bus rental & AP Tourism packages. Papikondalu, Maredumilli, APTDC Haritha Hotels & Resorts. Book now!",
    type: "website",
    locale: "en_IN",
    siteName: "Raja Travels",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Raja Travels",
  },
  formatDetection: {
    telephone: true,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen font-[family-name:var(--font-inter)] antialiased">
        {children}
      </body>
    </html>
  );
}
