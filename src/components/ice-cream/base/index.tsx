"use client"

import { ConeSVG, CupSVG } from "@/components/svg"
import { BaseProps } from "./types"
import { bgByBallFlavor } from "../core"

export const Base = ({
    allBallsHeight,
    ballDiameter,
    coneOffsetTop,
    cupOffsetTop,
    isCone,
    withText,
    flavors,
}: BaseProps) => {
    const offsetTop = isCone ? coneOffsetTop : cupOffsetTop

    return (
        <div
            className="absolute"
            style={{
                top: allBallsHeight - offsetTop + "rem",
            }}
        >
            {withText && (<>
                <span
                    className={
                        "absolute bg-linen rounded-3xl " +
                        "top-[3.7rem] h-[0.36rem] "
                    }
                    style={{
                        left: flavors.length % 2 === 0 ? isCone ? "10rem" : "9rem" : "",
                        right: flavors.length % 2 !== 0 ? isCone ? "10rem" : "8.6rem" : "",
                        width: isCone ? "36%" : "60%"
                    }}
                />
                <p
                    children={isCone ? "Cone" : "Cup"}
                    className={
                        "text-stroke-2-linen text-3xl text-linen " +
                        "absolute text-nowrap top-[2.4rem]"
                    }
                    style={{
                        left: flavors.length % 2 === 0 ? ballDiameter + 7 + "rem" : "",
                        right: flavors.length % 2 !== 0 ? ballDiameter + 7 + "rem" : "",
                    }}
                />
            </>)}
            {!isCone ? <CupSVG /> : (
                <ConeSVG
                    borderTopColor={
                        bgByBallFlavor.get(flavors[flavors.length - 1])
                    }
                />
            )}
        </div>
    )
}
