"use client"

import { bgByBall, bgByBaseType, borderByBall, nameByBall } from "./core"
import { IceCreamBaseType } from "@/enums"
import { ConeSVG, CupSVG } from "../svg"
import { BallSVG } from "../svg/ball"
import { IceCreamProps } from "./types"

export const IceCream = ({
    balls,
    base,
    withText
}: IceCreamProps) => {

    const ballDiameter = 10
    const ballOffsetStep = 4
    const allBallsHeight = (balls.length - 1) * ballOffsetStep + ballDiameter

    const coneHeight = 14
    const coneOffsetTop = 4.6
    const coneBottomExceed = 1.8

    const cupHeight = 14
    const cupOffsetTop = 4.6
    const cupBottomExceed = 11.2

    const wrapperHeight = (
        base === IceCreamBaseType.Cone ?
            allBallsHeight + coneHeight - coneOffsetTop - coneBottomExceed :
            allBallsHeight + cupHeight - cupBottomExceed
    )

    return (
        <div
            className={
                "flex flex-col relative w-full " +
                "justify-center items-center"
            }
            style={{
                height: wrapperHeight + "rem",
                backgroundColor: bgByBaseType.get(base),
            }}
        >
            {balls.map((ball, index, array) => (
                <div
                    key={`ball-${index}`}
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
                            children={nameByBall.get(ball)}
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
                        baseColor={bgByBall.get(ball)}
                        borderColor={borderByBall.get(ball)}
                        borderTopColor={index === 0 ?
                            "no-border" : bgByBall.get(array[index - 1])
                        }
                    />
                </div>
            ))}
            {base === IceCreamBaseType.Cone && (
                <div
                    className="absolute"
                    style={{
                        top: allBallsHeight - coneOffsetTop + "rem",
                    }}
                >
                    {withText && (<>
                        <span
                            className={
                                "absolute bg-linen rounded-3xl " +
                                "top-[3.7rem] h-[0.36rem] w-[36%] "
                            }
                            style={{
                                left: balls.length % 2 === 0 ? "10rem" : "",
                                right: balls.length % 2 !== 0 ? "10rem" : "",
                            }}
                        />
                        <p
                            children="Cone"
                            className={
                                "text-stroke-2-linen text-3xl text-linen " +
                                "absolute text-nowrap top-[2.4rem]"
                            }
                            style={{
                                left: balls.length % 2 === 0 ? ballDiameter + 7 + "rem" : "",
                                right: balls.length % 2 !== 0 ? ballDiameter + 7 + "rem" : "",
                            }}
                        />
                    </>)}
                    <ConeSVG
                        borderTopColor={
                            bgByBall.get(balls[balls.length - 1])
                        }
                    />
                </div>
            )}
            {base === IceCreamBaseType.Cup && (
                <div
                    className="absolute"
                    style={{
                        top: allBallsHeight - cupOffsetTop + "rem"
                    }}
                >
                    {withText && (<>
                        <span
                            className={
                                "absolute bg-linen rounded-3xl " +
                                "top-[3.7rem] h-[0.36rem] w-[60%] "
                            }
                            style={{
                                left: balls.length % 2 === 0 ? "9rem" : "",
                                right: balls.length % 2 !== 0 ? "8.6rem" : "",
                            }}
                        />
                        <p
                            children="Cup"
                            className={
                                "text-stroke-2-linen text-3xl text-linen " +
                                "absolute text-nowrap top-[2.4rem]"
                            }
                            style={{
                                left: balls.length % 2 === 0 ? ballDiameter + 7 + "rem" : "",
                                right: balls.length % 2 !== 0 ? ballDiameter + 7 + "rem" : "",
                            }}
                        />
                    </>)}
                    <CupSVG />
                </div>
            )}
        </div>
    )
}
