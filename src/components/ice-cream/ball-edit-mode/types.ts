import { IceCreamBall } from "@/types"

export interface BallEditModeProps {
    ball: IceCreamBall,
    ballDiameter: number,
    ballsArray: IceCreamBall[],
    index: number,
    ballOffsetStep: number
}
