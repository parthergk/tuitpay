import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthProviders from "../components/AuthProviders";
import Script from "next/script";

const forum = localFont({
  src: "./fonts/Forum-Regular.ttf",
  variable: "--font-forum",
});


export const metadata: Metadata = {
  title: "Create Next App",

  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${forum.variable}`}>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
        <AuthProviders>{children}</AuthProviders>
      </body>
    </html>
  );
}
