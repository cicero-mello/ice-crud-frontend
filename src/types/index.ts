import { BallFlavor, IceCreamBaseType, Size } from "@/enums"

export interface IceCream {
    id: string
    name: string
    balls: IceCreamBall[]
    base: IceCreamCone | IceCreamCup
    baseType: IceCreamBaseType
}

export interface IceCreamBall {
    id: string
    flavor: BallFlavor
    size: Size
}

export interface IceCreamCone {
    id: string
    color: string
    size: Size
}

export interface IceCreamCup {
    id: string
    size: Size
}