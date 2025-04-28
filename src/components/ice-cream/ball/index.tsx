import { bgByBallFlavor, borderByBallFlavor, nameByBallFlavor } from "../core"
import { BallSVG } from "../../svg/ball"
import { BallProps } from "./types"

export const Ball = ({
    flavor,
    ballDiameter,
    ballsArray,
    index,
    ballOffsetStep,
    withText
}: BallProps) => (
    <div
        style={{
            position: "absolute",
            top: (ballOffsetStep * index) + "rem",
        }}>
        {withText && (<>
            <span
                className={
                    "absolute bg-linen rounded-3xl " +
                    "top-[3.7rem] h-[0.36rem] w-[66%] "
                }
                style={{
                    left: index % 2 === 0 ? "7.4rem" : "",
                    right: index % 2 !== 0 ? "7.4rem" : "",
                }}
            />
            <p
                children={nameByBallFlavor.get(flavor)}
                className={
                    "text-stroke-2-linen text-3xl text-linen " +
                    "absolute text-nowrap top-[2.4rem]"
                }
                style={{
                    left: index % 2 === 0 ? ballDiameter + 5 + "rem" : "",
                    right: index % 2 !== 0 ? ballDiameter + 5 + "rem" : "",
                }}
            />
        </>)}
        <BallSVG
            baseColor={bgByBallFlavor.get(flavor)}
            borderColor={borderByBallFlavor.get(flavor)}
            borderTopColor={index === 0 ?
                "no-border" : bgByBallFlavor.get(ballsArray[index - 1])
            }
        />
    </div>
)
