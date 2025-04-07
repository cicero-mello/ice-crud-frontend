"use client"

import { IceCreamBaseType } from "@/enums"
import { IceCreamBall } from "@/types"

export interface IceCreamCardProps {
    id: string
    name: string
    balls: IceCreamBall[]
    baseType: IceCreamBaseType
}
