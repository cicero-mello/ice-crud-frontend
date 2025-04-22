import { colors } from "@/utils/js-styles"
import { TriangleProps } from "./types"

export const Triangle = ({
    fillPath = colors.dune,
    ...rest
}: TriangleProps) => (
    <svg
        width="1.125rem"    // 18px
        height="1.5rem"     // 24px
        viewBox="0 0 18 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
    >
        <path
            d="M-5.68248e-07 12L18 0.741668L18 23.2583L-5.68248e-07 12Z"
            fill={fillPath}
        />
    </svg>
)
