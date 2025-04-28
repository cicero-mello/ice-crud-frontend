import { CupSVG, TriangleSVG } from "@/components/svg"
import { CupEditModeProps } from "./types"
import { colors } from "@/utils/js-styles"

export const CupEditMode = ({
    allBallsHeight,
    cupOffsetTop,
    balls,
    ballDiameter
}: CupEditModeProps) => {

    // TODO - API Integration

    return (
        <div
            className="absolute"
            style={{
                top: allBallsHeight - cupOffsetTop + "rem"
            }}
        >
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
            <div
                className={
                    "flex gap-5 text-linen " +
                    "absolute text-nowrap top-[5.2rem]"
                }
                style={{
                    left: balls.length % 2 === 0 ? ballDiameter + 8 + "rem" : "",
                    right: balls.length % 2 !== 0 ? ballDiameter + 8 + "rem" : "",
                }}
            >
                <button
                    type="button"
                    className="focus-left"
                    children={<TriangleSVG fillPath={colors.linen} />}
                    onClick={() => console.log(`previous`)}
                />
                <button
                    type="button"
                    className="focus-right"
                    children={<TriangleSVG fillPath={colors.linen} className="transform: rotate-180" />}
                    onClick={() => console.log(`next`)}
                />
            </div>
            <CupSVG />
        </div>
    )
}