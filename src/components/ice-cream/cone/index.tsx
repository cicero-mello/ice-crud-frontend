import { ConeSVG } from "@/components/svg"
import { ConeProps } from "./types"
import { bgByBallFlavor } from "../core"

export const Cone = ({
    allBallsHeight,
    coneOffsetTop,
    ballDiameter,
    withText,
    flavors
}: ConeProps) => (
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
                    left: flavors.length % 2 === 0 ? "10rem" : "",
                    right: flavors.length % 2 !== 0 ? "10rem" : "",
                }}
            />
            <p
                children="Cone"
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
        <ConeSVG
            borderTopColor={
                bgByBallFlavor.get(flavors[flavors.length - 1])
            }
        />
    </div>
)
