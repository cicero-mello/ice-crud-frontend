import type { Metadata } from "next"
import "./globals.css"
import { kleeOne, knewave } from "@/fonts"

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
                {children}
            </body>
        </html>
    )
}
