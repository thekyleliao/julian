import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Current Julian Date | Military Time Converter | Real-time UTC",
  description: "Get the current Julian Date, Modified Julian Date (MJD), and real-time UTC time. Military time converter with Zulu time display and SINCGARS date calculator.",
  keywords: ["Current Julian Date", "Military Time Converter", "Real-time UTC", "Julian Date Calculator", "UTC Clock", "Zulu Time", "MJD", "SINCGARS Date"],
  authors: [{ name: "UTC Time Tools" }],
  openGraph: {
    title: "Current Julian Date | Military Time Converter | Real-time UTC",
    description: "Get the current Julian Date, Modified Julian Date (MJD), and real-time UTC time. Military time converter with Zulu time display and SINCGARS date calculator.",
    type: "website",
    locale: "en_US",
    siteName: "UTC Time Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Current Julian Date | Military Time Converter | Real-time UTC",
    description: "Get the current Julian Date, Modified Julian Date (MJD), and real-time UTC time. Military time converter with Zulu time display and SINCGARS date calculator.",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'UTC Time Tools',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web Browser',
  description: 'Real-time UTC clock with Julian Date calculator and 24-hour military time converter. Get current Julian Date, Modified Julian Date (MJD), Zulu time, and SINCGARS date.',
  featureList: [
    'Julian Date',
    '24-hour Military Time',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistMono.variable} font-mono`}>
        {children}
      </body>
    </html>
  );
}
