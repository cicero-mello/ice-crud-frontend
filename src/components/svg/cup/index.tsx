import { CupSVGProps } from "./types"

export const CupSVG = ({
    height = "7.25rem",
    style
}: CupSVGProps) => (
    <svg
        height={height}
        viewBox="0 0 199 116"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={style}
    >
        <path
            d="M21.2661 5.67065H178.633V94.9871C178.633 104.383 171.016 112 161.621 112H38.2788C28.8829 112 21.2661 104.383 21.2661 94.9871V5.67065Z"
            fill="#8CABA1"
            stroke="#4B726E"
            strokeWidth="7.08861"
        />
        <rect
            width="198.481"
            height="11.3418"
            rx="5.67089"
            fill="#4B726E"
        />
    </svg>
)
