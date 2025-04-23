import { BallFlavor, IceCreamBaseType } from "@/enums"

export interface IceCreamProps {
    balls: BallFlavor[]
    base: IceCreamBaseType,
    withText?: boolean
    className?: string
}
