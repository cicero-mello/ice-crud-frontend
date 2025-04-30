import { BallFlavor } from "@/enums"

export interface BaseProps {
    allBallsHeight: number
    ballDiameter: number
    coneOffsetTop: number
    cupOffsetTop: number
    isCone: boolean
    withText: boolean
    flavors: BallFlavor[]
}
