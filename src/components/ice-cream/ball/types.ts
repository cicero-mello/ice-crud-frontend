import { BallFlavor } from "@/enums"

export interface BallProps {
    flavor: BallFlavor,
    ballDiameter: number,
    ballsArray: BallFlavor[],
    index: number,
    ballOffsetStep: number,
    withText: boolean
}
