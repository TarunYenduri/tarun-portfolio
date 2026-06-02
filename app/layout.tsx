import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tarun Siva Krishna Yenduri | AI Engineer",
  description:
    "Ultra-premium cinematic portfolio for Tarun Siva Krishna Yenduri, Machine Learning Engineer, AI Systems Builder, and Automation Architect."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="noise">{children}</body>
    </html>
  );
}
