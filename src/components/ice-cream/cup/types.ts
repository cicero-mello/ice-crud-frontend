import { BallFlavor } from "@/enums"

export interface CupProps {
    allBallsHeight: number
    cupOffsetTop: number
    withText: boolean
    flavors: BallFlavor[]
    ballDiameter: number
}
