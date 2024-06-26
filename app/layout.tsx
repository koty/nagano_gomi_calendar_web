'use client'
import { Inter } from "next/font/google"
import "./globals.css"
import Providers from "./providers"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <title>長野市ごみ収集非公式カレンダー</title>
        <meta name="description" content="長野市ごみ収集非公式カレンダーです。" />
      </head>
      <body style={{'margin': '0.5em'}}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
