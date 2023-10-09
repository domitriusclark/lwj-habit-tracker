import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Everybody Poops 🚽 Wipe Tracker by Dude Wipes (Not Really)",
  description:
    "Track your wipes & realize when you need to buy new Dude Wipes 👀",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignInUrl="/dashboard">
      <html lang="en">
        <body className="overflow-hidden">
          {children}
          {modal}
        </body>
      </html>
    </ClerkProvider>
  );
}
