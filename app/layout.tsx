import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import QueryProvider from "@/components/query-provider"
import Header from "@/components/header"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mylink.app"
  ),
  title: {
    default: "MyLink — 나만의 멀티 링크 프로필",
    template: "%s | MyLink",
  },
  description:
    "GitHub, 블로그, SNS, 포트폴리오 등 흩어진 링크를 하나의 URL로 모아 공유하세요.",
  openGraph: {
    siteName: "MyLink",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        "font-sans",
        inter.variable
      )}
    >
      <body className="select-text">
        <QueryProvider>
          <ThemeProvider>
            <div className="relative flex min-h-svh flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
