"use client"

import { bgByBaseType } from "./core"
import { IceCreamBaseType } from "@/enums"
import { IceCreamProps } from "./types"
import { Ball } from "./ball"
import { BallEditMode } from "./ball-edit-mode"
import { Base } from "./base"
import { BaseEditMode } from "./base-edit-mode"

export const IceCream = ({
    iceCreamId,
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
                    iceCreamId={iceCreamId}
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
            {!editMode && (
                <Base
                    allBallsHeight={allBallsHeight}
                    ballDiameter={ballDiameter}
                    coneOffsetTop={coneOffsetTop}
                    cupOffsetTop={cupOffsetTop}
                    isCone={base === IceCreamBaseType.Cone}
                    flavors={flavors}
                    withText={!!withText}
                />
            )}
            {editMode && (
                <BaseEditMode
                    allBallsHeight={allBallsHeight}
                    ballDiameter={ballDiameter}
                    coneOffsetTop={coneOffsetTop}
                    cupOffsetTop={cupOffsetTop}
                    isCone={base === IceCreamBaseType.Cone}
                    flavors={flavors}
                    iceCreamId={iceCreamId}
                />
            )}
        </div>
    )
}
