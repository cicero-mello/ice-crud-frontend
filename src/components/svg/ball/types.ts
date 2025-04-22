import { CSSProperties } from "react"

export interface BallSVGProps {
    height?: string
    baseColor?: string
    borderColor?: string
    borderTopColor?: string | "no-border"
    style?: CSSProperties
}
