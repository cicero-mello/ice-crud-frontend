import { useCallback, useEffect, useLayoutEffect, useRef, useState, useTransition } from "react"
import { UpdateIceCreamBallRequest } from "@/app/api/update-ice-cream-ball/types"
import { bgByBallFlavor, borderByBallFlavor, nameByBallFlavor } from "../core"
import { DeleteBallRequest } from "@/app/api/delete-ball/types"
import { TrashSVG, TriangleSVG } from "@/components/svg"
import { useQueryClient } from "@tanstack/react-query"
import { getLastEnumValue } from "@/utils/enums"
import { BallEditModeProps } from "./types"
import { debounce } from "@/utils/debounce"
import { colors } from "@/utils/js-styles"
import { BallSVG } from "../../svg/ball"
import { BallFlavor } from "@/enums"

export const BallEditMode = ({
    ball,
    ballDiameter,
    ballsArray,
    index,
    ballOffsetStep,
    iceCreamId
}: BallEditModeProps) => {
    const lastBallFlavor = getLastEnumValue(BallFlavor)
    const firstBallFlavor = 0

    const queryClient = useQueryClient()

    const lastClickedButtonRef = useRef<HTMLButtonElement>(null)
    const currentBallFlavorRef = useRef(ball.flavor)
    const propsCurrentBallFlavorRef = useRef(ball.flavor)

    const [currentBallFlavor, setCurrentBallFlavor] = useState(ball.flavor)
    const [apiError, setApiError] = useState(false)
    const [isPending, startTransition] = useTransition()

    currentBallFlavorRef.current = currentBallFlavor

    const handleNextFlavor = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        if (isPending) return
        lastClickedButtonRef.current = event.currentTarget

        if (currentBallFlavor === lastBallFlavor) {
            setCurrentBallFlavor(firstBallFlavor)
            return
        }
        setCurrentBallFlavor(state => state + 1)
    }

    const handlePreviousFlavor = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        if (isPending) return
        lastClickedButtonRef.current = event.currentTarget

        if (currentBallFlavor === firstBallFlavor) {
            setCurrentBallFlavor(lastBallFlavor)
            return
        }
        setCurrentBallFlavor(state => state - 1)
    }

    const changeBallFlavor = useCallback(() => startTransition(async () => {
        if (currentBallFlavorRef.current === propsCurrentBallFlavorRef.current) {
            setTimeout(() => {
                lastClickedButtonRef.current?.focus()
            }, 200)
            return
        }

        setApiError(false)

        const response = await fetch("/api/update-ice-cream-ball", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                iceCreamId: iceCreamId,
                ball: {
                    id: ball.id,
                    size: ball.size,
                    flavor: currentBallFlavorRef.current
                }
            } as UpdateIceCreamBallRequest)
        })

        if (response.status != 200) {
            setApiError(true)
            return
        }

        await queryClient.invalidateQueries({
            queryKey: ["get-customer-ice-creams"]
        })
        await queryClient.invalidateQueries({
            queryKey: [`get-ice-cream-${iceCreamId}`]
        })

        setTimeout(() => {
            lastClickedButtonRef.current?.focus()
        }, 200)
    }), [ball])

    const changeBallFlavorDebounced = useCallback(
        debounce(changeBallFlavor, 500),
        [changeBallFlavor]
    )

    useEffect(() => {
        if (currentBallFlavor != ball.flavor) {
            changeBallFlavorDebounced()
        }
    }, [currentBallFlavor])

    useLayoutEffect(() => {
        setCurrentBallFlavor(ball.flavor)
        propsCurrentBallFlavorRef.current = ball.flavor
    }, [ball])

    const handleDeleteBall = () => startTransition(async () => {
        if (isPending) return
        setApiError(false)
        const response = await fetch("/api/delete-ball", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                iceCreamBallId: ball.id
            } as DeleteBallRequest)
        })
        if (response.status != 200) {
            setApiError(true)
            return
        }

        await queryClient.invalidateQueries({
            queryKey: ["get-customer-ice-creams"]
        })
        await queryClient.invalidateQueries({
            queryKey: [`get-ice-cream-${iceCreamId}`]
        })
    })

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
                children={nameByBallFlavor.get(currentBallFlavor)}
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
                    {isPending && (
                        <div className={
                            "spinner spinner-linen absolute left-[-2.4rem]"
                        } />
                    )}
                    <button
                        type="button"
                        children={<TrashSVG />}
                        disabled={isPending || apiError}
                        onClick={handleDeleteBall}
                        className={
                            "disabled:opacity-50 disabled:pointer-events-none " +
                            "transition duration-200 focus-left"
                        }
                    />
                    <button
                        type="button"
                        disabled={isPending || apiError}
                        children={<TriangleSVG fillPath={colors.linen} />}
                        onClick={handlePreviousFlavor}
                        className={
                            "disabled:opacity-50 disabled:pointer-events-none " +
                            "transition duration-200 focus-bottom"
                        }
                    />
                    <button
                        type="button"
                        disabled={isPending || apiError}
                        onClick={handleNextFlavor}
                        children={
                            <TriangleSVG
                                fillPath={colors.linen}
                                className="transform: rotate-180"
                            />
                        }
                        className={
                            "disabled:opacity-50 disabled:pointer-events-none " +
                            "transition duration-200 focus-right ml-2"
                        }
                    />
                </>)}
                {index % 2 != 0 && (<>
                    <button
                        type="button"
                        disabled={isPending || apiError}
                        children={<TriangleSVG fillPath={colors.linen} />}
                        onClick={handlePreviousFlavor}
                        className={
                            "disabled:opacity-50 disabled:pointer-events-none " +
                            "transition duration-200 focus-left"
                        }
                    />
                    <button
                        type="button"
                        disabled={isPending || apiError}
                        onClick={handleNextFlavor}
                        children={
                            <TriangleSVG
                                fillPath={colors.linen}
                                className="transform: rotate-180"
                            />
                        }
                        className={
                            "disabled:opacity-50 disabled:pointer-events-none " +
                            "transition duration-200 focus-bottom ml-2"
                        }
                    />
                    <button
                        type="button"
                        disabled={isPending || apiError}
                        children={<TrashSVG />}
                        onClick={handleDeleteBall}
                        className={
                            "disabled:opacity-50 disabled:pointer-events-none " +
                            "transition duration-200 focus-right"
                        }
                    />
                    {isPending && (
                        <div className={
                            "spinner spinner-linen absolute right-[-2.4rem]"
                        } />
                    )}
                </>)}
            </div>
            <BallSVG
                baseColor={bgByBallFlavor.get(currentBallFlavor)}
                borderColor={borderByBallFlavor.get(currentBallFlavor)}
                borderTopColor={index === 0 ?
                    "no-border" : bgByBallFlavor.get(ballsArray[index - 1].flavor)
                }
            />
        </div>
    )
}
