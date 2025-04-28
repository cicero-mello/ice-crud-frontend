import { colors } from "@/utils/js-styles"
import { ArrowReturnSVGProps } from "./types"

export const ArrowReturnSVG = ({
    stroke = colors.stone,
    ...rest
}: ArrowReturnSVGProps) => (
    <svg
        width="2.375rem" // 38px
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
    >
        <path
            d="M14.2497 22.1666L6.33301 14.25L14.2497 6.33331"
            stroke={stroke}
            strokeWidth="3.16667"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M6.33301 14.25H22.958C24.1016 14.25 25.234 14.4752 26.2905 14.9129C27.3471 15.3505 28.3071 15.992 29.1157 16.8006C29.9244 17.6093 30.5658 18.5693 31.0035 19.6258C31.4411 20.6823 31.6663 21.8147 31.6663 22.9583C31.6663 24.1019 31.4411 25.2343 31.0035 26.2909C30.5658 27.3474 29.9244 28.3074 29.1157 29.1161C28.3071 29.9247 27.3471 30.5661 26.2905 31.0038C25.234 31.4414 24.1016 31.6667 22.958 31.6667H17.4163"
            stroke={stroke}
            strokeWidth="3.16667"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)
