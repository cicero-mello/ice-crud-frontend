"use client"

import { BallFlavor, IceCreamBaseType } from "@/enums"

export interface IceCreamCardProps {
    id: string
    name: string
    balls: BallFlavor[]
    baseType: IceCreamBaseType
}
