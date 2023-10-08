import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "LWJ Habit Tracker",
  description:
    "Use this app to collaborate with friends and track your habits together",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignInUrl="/dashboard">
      <html lang="en">
        <body className="overflow-hidden">{children}</body>
      </html>
    </ClerkProvider>
  );
}
