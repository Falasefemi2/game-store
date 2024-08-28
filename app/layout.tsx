import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Game Store",
  description: "Demo game store made with NEXTJS",
};

const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: "white",
    colorText: "white",
  },
  elements: {
    formButtonPrimary: {
      color: "black",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
      <html lang="en" suppressHydrationWarning className="bg-epic-500">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
