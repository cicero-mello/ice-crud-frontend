import { BallFlavor } from "@/enums"

export interface ConeProps {
    allBallsHeight: number
    coneOffsetTop: number
    ballDiameter: number
    flavors: BallFlavor[]
    withText: boolean
}
