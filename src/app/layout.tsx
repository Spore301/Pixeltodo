import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PixelTodo - CLI To-Do Tracker",
  description: "A retro terminal-inspired to-do tracker with analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
