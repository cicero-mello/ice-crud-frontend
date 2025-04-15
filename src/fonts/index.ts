import { Knewave, Klee_One } from "next/font/google"

export const knewave = Knewave({
    style: "normal",
    weight: ["400"],
    variable: "--font-knewave",
    subsets: ["latin", "latin-ext"],
    preload: true,
    display: "swap",
    adjustFontFallback: true,
    fallback: ["system-ui", "Helvetica", "Arial", "sans-serif"],
})

export const kleeOne = Klee_One({
    style: "normal",
    weight: ["400"],
    variable: "--font-klee-one",
    subsets: ["latin", "latin-ext"],
    preload: true,
    display: "swap",
    adjustFontFallback: true,
    fallback: ["system-ui", "Helvetica", "Arial", "sans-serif"],
})
