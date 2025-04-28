import { CupSVG } from "@/components/svg"
import { CupProps } from "./types"

export const Cup = ({
    allBallsHeight,
    cupOffsetTop,
    withText,
    flavors,
    ballDiameter
}: CupProps) => (
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
                    left: flavors.length % 2 === 0 ? "9rem" : "",
                    right: flavors.length % 2 !== 0 ? "8.6rem" : "",
                }}
            />
            <p
                children="Cup"
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
        <CupSVG />
    </div>
)
