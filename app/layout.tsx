import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title:
    "IDTAI2024 - Innovation and Digital Transformation Across Industries Conference",
  description:
    "Join us in Valencia, Spain from November 27-29, 2024 for IDTAI2024. Explore how AI, blockchain, IoT, and more are driving innovation and reshaping industries. Learn to adapt and thrive in an increasingly digital world.",
  keywords:
    "digital transformation, innovation, AI, blockchain, IoT, conference, Valencia, Spain",
  openGraph: {
    title: "IDTAI2024 - Innovation and Digital Transformation Conference",
    description:
      "Explore the future of digital transformation across industries in Valencia, Spain. Nov 27-29, 2024.",
    images: ["https://admin.idtaievents.com/uploads/android_chrome_512x512_bc65dc8d11.png"], // Replace with actual image path
  },
  twitter: {
    card: "summary_large_image",
    title: "IDTAI2024 Conference",
    description:
      "Join industry leaders in Valencia for the latest in digital transformation. Nov 27-29, 2024.",
    images: ["https://admin.idtaievents.com/uploads/android_chrome_512x512_bc65dc8d11.png"], // Replace with actual image path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
