"use client"

import { bgByBaseType } from "./core"
import { IceCreamBaseType } from "@/enums"
import { IceCreamProps } from "./types"
import { Ball } from "./ball"
import { BallEditMode } from "./ball-edit-mode"
import { Cone } from "./cone"
import { Cup } from "./cup"
import { ConeEditMode } from "./cone-edit-mode"
import { IceCreamBall } from "@/types"
import { CupEditMode } from "./cup-edit-mode"

export const IceCream = ({
    balls,
    flavors,
    base,
    withText,
    editMode,
    className = ""
}: IceCreamProps) => {

    const ballDiameter = 10
    const ballOffsetStep = 4
    const allBallsHeight = (flavors.length - 1) * ballOffsetStep + ballDiameter

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
                className +
                " flex flex-col relative w-full " +
                "justify-center items-center"
            }
            style={{
                transition: "height 300ms ease-out",
                height: wrapperHeight + "rem",
                backgroundColor: bgByBaseType.get(base),
            }}
        >
            {editMode && balls!.map((ball, index, array) => (
                <BallEditMode
                    key={`ball-em-${index}`}
                    ball={ball}
                    ballDiameter={ballDiameter}
                    ballsArray={array}
                    index={index}
                    ballOffsetStep={ballOffsetStep}
                />
            ))}

            {!editMode && flavors.map((flavor, index, array) => (
                <Ball
                    key={`ball-${index}`}
                    flavor={flavor}
                    ballDiameter={ballDiameter}
                    ballsArray={array}
                    index={index}
                    ballOffsetStep={ballOffsetStep}
                    withText={!!withText}
                />
            ))}
            {base === IceCreamBaseType.Cone && (editMode ?
                <ConeEditMode
                    allBallsHeight={allBallsHeight}
                    ballDiameter={ballDiameter}
                    coneOffsetTop={coneOffsetTop}
                    balls={balls as IceCreamBall[]}
                />
                :
                <Cone
                    allBallsHeight={allBallsHeight}
                    ballDiameter={ballDiameter}
                    coneOffsetTop={coneOffsetTop}
                    withText={!!withText}
                    flavors={flavors}
                />
            )}
            {base === IceCreamBaseType.Cup && (editMode ?
                <CupEditMode
                    allBallsHeight={allBallsHeight}
                    cupOffsetTop={cupOffsetTop}
                    ballDiameter={ballDiameter}
                    balls={balls as IceCreamBall[]}
                />
                :
                <Cup
                    allBallsHeight={allBallsHeight}
                    cupOffsetTop={cupOffsetTop}
                    withText={!!withText}
                    ballDiameter={ballDiameter}
                    flavors={flavors}
                />
            )}
        </div>
    )
}
