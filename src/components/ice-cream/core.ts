import { BallFlavor, IceCreamBaseType } from "@/enums"

export const bgByBall = new Map<BallFlavor, string>([
    [BallFlavor.chocolate, "#4d4539"],
    [BallFlavor.vanilla, "#d2c9a5"]
])

export const borderByBall = new Map<BallFlavor, string>([
    [BallFlavor.chocolate, "#ae5d40"],
    [BallFlavor.vanilla, "#d1b187"]
])

export const nameByBall = new Map<BallFlavor, string>([
    [BallFlavor.chocolate, "Chocolate"],
    [BallFlavor.vanilla, "Vanilla"]
])

export const bgByBaseType = new Map<IceCreamBaseType, string>([
    [IceCreamBaseType.Cone, "#8caba1"],
    [IceCreamBaseType.Cup, "#c77b58"]
])
