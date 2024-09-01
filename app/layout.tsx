import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
import Head from "next/head";


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
        <Head>
          <link rel="icon" href="/epic-games-2.svg" />
          <link rel="apple-touch-icon" href="/epic-games-2.svg" />
        </Head>
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
