import { BallSVGProps } from "./types"

export const BallSVG = ({
    height = "10rem",
    baseColor = "#4D4539",
    borderColor = "#AE5D40",
    borderTopColor = "#D2C9A5",
    style
}: BallSVGProps) => (
    <svg
        height={height}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={style}
    >
        <circle
            cx="79.9107"
            cy="80.5203"
            r="75.7846"
            fill={baseColor}
            stroke={borderColor}
            strokeWidth="7.35772"
        />
        {borderTopColor != "no-border" && (
            <path
                d="M148 47.2626C113.081 -20.6399 26.8962 5.4773 15.0084 42.7866"
                stroke={borderTopColor}
                strokeWidth="10"
                strokeLinecap="round"
            />
        )}
    </svg>

)