import { BallFlavor, IceCreamBaseType } from "@/enums"

export const radioImageItems = [
    {
        imageName: "Cone",
        imageUrl: "/ice-cream-base/cone.svg",
        value: IceCreamBaseType.Cone
    },
    {
        imageName: "Cup",
        imageUrl: "/ice-cream-base/cup.svg",
        value: IceCreamBaseType.Cup
    },
]

export const ballOptions = [
    { text: "chocolate", value: BallFlavor.Chocolate },
    { text: "vanilla", value: BallFlavor.Vanilla },
    { text: "strawberry", value: BallFlavor.Strawberry },
    { text: "grape", value: BallFlavor.Grape },
]
