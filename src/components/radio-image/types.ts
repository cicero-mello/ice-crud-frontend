import { InputHTMLAttributes } from "react"

export interface RadioImageProps {
    label: string
    items: RadioImageItem[]
    formRegister: InputHTMLAttributes<HTMLInputElement>
    className?: string
    defaultCheckedIndex?: number
}

export interface RadioImageItem {
    imageName: string
    imageUrl: string
    value: number
}
