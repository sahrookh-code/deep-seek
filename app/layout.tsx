import type { Metadata } from "next";
import "./globals.css";
import "./styles/fonts.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "../context/AppContext";

export const metadata: Metadata = {
  title: "Deep-Seek",
  description: "Full-Stack-Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClass = "font-inter";

  return (
    <ClerkProvider>
      <AppContextProvider>
        <html lang="en">
          <body
            className={`${fontClass} antialiased`}
          >
            {children}
          </body>
        </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
