import { colors } from "@/utils/js-styles"
import { TrashSVGProps } from "./types"

export const TrashSVG = ({
    stroke = colors.linen,
    ...rest
}: TrashSVGProps) => (
    <svg
        width="1.875rem" // 30px
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
    >
        <path
            d="M3.75 7.5H26.25"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M23.75 7.5V25C23.75 26.25 22.5 27.5 21.25 27.5H8.75C7.5 27.5 6.25 26.25 6.25 25V7.5"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M10 7.5V5C10 3.75 11.25 2.5 12.5 2.5H17.5C18.75 2.5 20 3.75 20 5V7.5"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M12.5 13.75V21.25"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M17.5 13.75V21.25"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)
