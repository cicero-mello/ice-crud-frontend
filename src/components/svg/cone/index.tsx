import { ConeSVGProps } from "./types"

export const ConeSVG = ({
    borderTopColor = "#4D4539",
    height = "14rem",
    style
}: ConeSVGProps) => (
    <svg
        height={height}
        viewBox="0 0 267 225"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={style}
    >
        <path
            d="M57.8572 23.8774C58.0878 23.0553 59.1486 23.2003 59.9679 23.4404C109.185 37.8646 158.401 37.8646 207.618 23.4404C208.438 23.2003 209.498 23.0553 209.729 23.8774C211.711 30.9449 189.06 84.6902 141.775 185.113C138.601 191.854 128.985 191.854 125.811 185.113C78.5263 84.6902 55.8749 30.9449 57.8572 23.8774Z"
            fill="#927441"
            stroke="#D1B187"
            strokeWidth="5.88618"
            strokeLinejoin="round"
        />
        <path
            d="M58.7314 23.0748C108.773 37.9865 158.814 37.9865 208.856 23.0748"
            stroke={borderTopColor}
            strokeWidth="7.35772"
            strokeLinecap="round"
        />
    </svg>
)
