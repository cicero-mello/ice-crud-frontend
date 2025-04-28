import { bgByBallFlavor, borderByBallFlavor, nameByBallFlavor } from "../core"
import { BallSVG } from "../../svg/ball"
import { BallEditModeProps } from "./types"
import { TrashSVG, TriangleSVG } from "@/components/svg"
import { colors } from "@/utils/js-styles"

export const BallEditMode = ({
    ball,
    ballDiameter,
    ballsArray,
    index,
    ballOffsetStep
}: BallEditModeProps) => {

    // TODO - API Integration

    return (
        <div
            style={{
                position: "absolute",
                top: (ballOffsetStep * index) + "rem",
            }}>
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
                children={nameByBallFlavor.get(ball.flavor)}
                className={
                    "text-stroke-2-linen text-3xl text-linen " +
                    "absolute text-nowrap top-[2.4rem]"
                }
                style={{
                    left: index % 2 === 0 ? ballDiameter + 5 + "rem" : "",
                    right: index % 2 !== 0 ? ballDiameter + 5 + "rem" : "",
                }}
            />
            <div
                className={
                    "flex gap-3 text-linen " +
                    "absolute text-nowrap top-[5.2rem]"
                }
                style={{
                    left: index % 2 === 0 ? ballDiameter + 8 + "rem" : "",
                    right: index % 2 !== 0 ? ballDiameter + 8 + "rem" : "",
                }}
            >
                {index % 2 === 0 && (<>
                    <button
                        type="button"
                        className="focus-left"
                        children={<TrashSVG />}
                        onClick={() => console.log(`delete`)}
                    />
                    <button
                        type="button"
                        className="focus-bottom"
                        children={<TriangleSVG fillPath={colors.linen} />}
                        onClick={() => console.log(`previous`)}
                    />
                    <button
                        type="button"
                        className="focus-right ml-2"
                        children={<TriangleSVG fillPath={colors.linen} className="transform: rotate-180" />}
                        onClick={() => console.log(`next`)}
                    />
                </>)}
                {index % 2 != 0 && (<>
                    <button
                        type="button"
                        className="focus-left"
                        children={<TriangleSVG fillPath={colors.linen} />}
                        onClick={() => console.log(`previous`)}
                    />
                    <button
                        type="button"
                        className="focus-bottom ml-2"
                        children={<TriangleSVG fillPath={colors.linen} className="transform: rotate-180" />}
                        onClick={() => console.log(`next`)}
                    />
                    <button
                        type="button"
                        className="focus-right"
                        children={<TrashSVG />}
                        onClick={() => console.log(`delete`)}
                    />
                </>)}
            </div>
            <BallSVG
                baseColor={bgByBallFlavor.get(ball.flavor)}
                borderColor={borderByBallFlavor.get(ball.flavor)}
                borderTopColor={index === 0 ?
                    "no-border" : bgByBallFlavor.get(ballsArray[index - 1].flavor)
                }
            />
        </div>
    )
}
