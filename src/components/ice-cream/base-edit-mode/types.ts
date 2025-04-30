import { BallFlavor } from "@/enums"

export interface BaseEditModeProps {
    allBallsHeight: number
    ballDiameter: number
    coneOffsetTop: number
    cupOffsetTop: number
    isCone: boolean
    flavors: BallFlavor[]
    iceCreamId: string
}
