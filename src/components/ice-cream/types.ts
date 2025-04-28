import { BallFlavor, IceCreamBaseType } from "@/enums"
import { IceCreamBall } from "@/types"

export interface IceCreamProps {
    flavors: BallFlavor[],
    balls?: IceCreamBall[]
    base: IceCreamBaseType,
    withText?: boolean
    className?: string
    editMode?: boolean
}
