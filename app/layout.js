// Description: This file contains the layout of the application.
// created by: AnotherProject-Team {ColdByDefault}
// Date: 18/12/2024
// CopyRight: All rights reserved
// Version: 3.1.1
// NOT TO BE USED WITHOUT PERMISSION FROM THE AUTHOR (www.coldbydefault.com {ColdByDefault})

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import "./styles/transitions.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://berichlibrary.coldbydefault.com"),
  title: "beRich.Library",
  description: "Personal Hub Created by ColdByDefault",
  openGraph: {
    title: "beRich.Library",
    description: "This is my own personal Hub where I share resources, docs, scripts, and all my stuff.",
    url: "https://berichlibrary.coldbydefault.com",
    siteName: "beRich.Library",
    images: [
      {
        url: "/beRich.png",
        width: 1200,
        height: 630,
        alt: "BeRich Library",
      },
    ],
    locale: "en_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "beRich.Library",
    description: "Discover and manage your books effortlessly with BeRich Library.",
    images: ["/beRich.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <div id="page-content">{children}</div>
      </body>
    </html>
  );
}
