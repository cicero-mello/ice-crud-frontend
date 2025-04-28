import { BallFlavor, IceCreamBaseType } from "@/enums"
import { colors } from "@/utils/js-styles"

export const bgByBallFlavor = new Map<BallFlavor, string>([
    [BallFlavor.Chocolate, colors.mud],
    [BallFlavor.Vanilla, colors.linen],
    [BallFlavor.Grape, colors.coal],
    [BallFlavor.Strawberry, colors.rust]
])

export const borderByBallFlavor = new Map<BallFlavor, string>([
    [BallFlavor.Chocolate, colors.brick],
    [BallFlavor.Vanilla, colors.sand],
    [BallFlavor.Grape, colors.rust],
    [BallFlavor.Strawberry, colors.sand]
])

export const nameByBallFlavor = new Map<BallFlavor, string>([
    [BallFlavor.Chocolate, "Chocolate"],
    [BallFlavor.Vanilla, "Vanilla"],
    [BallFlavor.Grape, "Grape"],
    [BallFlavor.Strawberry, "Strawberry"]
])

export const bgByBaseType = new Map<IceCreamBaseType, string>([
    [IceCreamBaseType.Cone, colors.sage],
    [IceCreamBaseType.Cup, colors.clay]
])
