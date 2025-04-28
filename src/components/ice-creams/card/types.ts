"use client"

import { BallFlavor, IceCreamBaseType } from "@/enums"

export interface IceCreamCardProps {
    id: string
    name: string
    flavors: BallFlavor[]
    baseType: IceCreamBaseType
}
