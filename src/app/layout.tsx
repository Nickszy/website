import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nickszy.com"),
  title: {
    default: "探长的 AI 实践主页 | nickszy.com",
    template: "%s | 探长的 AI 实践主页",
  },
  description: "探长 - AI开发者，关注投资理财、大模型应用与效率工具开发记录",
  keywords: ["投资", "理财", "AI", "独立开发", "大语言模型"],
  authors: [{ name: "探长" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "探长的 AI 实践主页",
    url: "https://nickszy.com",
  },
};

import { getBlogMetadata } from "@/lib/blog";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const blogMetadata = getBlogMetadata();

  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header blogMetadata={blogMetadata} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
