import "./globals.css"
import type { Metadata } from "next"
import { kleeOne, knewave } from "@/fonts"
import ReactQueryProvider from "@/utils/tanstack-query/provider"

export const metadata: Metadata = {
    title: "Ice CRUD",
    description: "Build your perfect ice cream!",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    return (
        <html lang="en">
            <body
                className={
                    `${knewave.variable} ${kleeOne.variable} antialiased p-7 ` +
                    `${kleeOne.className} ` +
                    "flex flex-col"
                }
            >
                <ReactQueryProvider>
                    {children}
                </ReactQueryProvider>
            </body>
        </html>
    )
}
