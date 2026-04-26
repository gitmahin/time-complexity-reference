import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout";
import { ThemeProvider } from "next-themes";

const geistHeading = Geist({ subsets: ["latin"], variable: "--font-heading" });

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Time Complexity",
    template: "%s | Time Complexity",
  },
  description:
    "A comprehensive guide to time complexity and performance characteristics across different programming languages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        jetbrainsMono.variable,
        "font-sans",
        inter.variable,
        geistHeading.variable
      )}
    >
      <ThemeProvider attribute="class" forcedTheme="dark" defaultTheme="dark">
        <body className="min-h-full flex flex-col">
          <div className="flex justify-center items-start">
            <Sidebar />
            <div className="w-full ">{children}</div>
          </div>
        </body>
      </ThemeProvider>
    </html>
  );
}
