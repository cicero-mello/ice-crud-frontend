import { ButtonHTMLAttributes } from "react"

export interface ButtonTitleProps extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children"
> {
    isLoading?: boolean
    text: string
}
