"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useTransition } from "react"
import { UpdateIceCreamBaseRequest } from "@/app/api/update-ice-cream-base/types"
import { ConeSVG, CupSVG, TriangleSVG } from "@/components/svg"
import { useQueryClient } from "@tanstack/react-query"
import { IceCreamBaseType, Size } from "@/enums"
import { BaseEditModeProps } from "./types"
import { debounce } from "@/utils/debounce"
import { colors } from "@/utils/js-styles"
import { bgByBallFlavor } from "../core"

export const BaseEditMode = ({
    allBallsHeight,
    ballDiameter,
    coneOffsetTop,
    cupOffsetTop,
    isCone: isConeProps,
    flavors,
    iceCreamId
}: BaseEditModeProps) => {
    const isConeRef = useRef(false)
    const [isCone, setIsCone] = useState(isConeProps)
    isConeRef.current = isCone

    const isConePropsRef = useRef(isConeProps)

    const [isPending, startTransition] = useTransition()
    const [apiError, setApiError] = useState(false)
    const lastClickedButtonRef = useRef<HTMLButtonElement>(null)

    const queryClient = useQueryClient()

    const handleSwitchBase = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        if (isPending || apiError) return
        lastClickedButtonRef.current = event.currentTarget
        setIsCone(state => !state)
    }

    const changeBase = useCallback(() => startTransition(async () => {
        if (isConePropsRef.current == isConeRef.current) {
            setTimeout(() => {
                lastClickedButtonRef.current?.focus()
            }, 200)
            return
        }

        setApiError(false)

        const response = await fetch("/api/update-ice-cream-base", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                iceCreamId,
                baseType: isConeRef.current ? IceCreamBaseType.Cone : IceCreamBaseType.Cup,
                base: {
                    size: Size.Medium,
                    color: isConeRef.current ? "#FFFFFF" : undefined
                }
            } as UpdateIceCreamBaseRequest)
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
    }), [])

    const changeBaseDebounced = useCallback(
        debounce(changeBase, 400),
        []
    )

    useLayoutEffect(() => {
        isConePropsRef.current = isConeProps
    }, [isConeProps])

    useEffect(() => {
        if (isCone != isConeProps) {
            changeBaseDebounced()
        }
    }, [isCone])

    return (
        <div
            className="absolute"
            style={{
                top: allBallsHeight - (isCone ? coneOffsetTop : cupOffsetTop) + "rem",
            }}
        >
            <span
                className={
                    "absolute bg-linen rounded-3xl " +
                    "top-[3.7rem] h-[0.36rem] "
                }
                style={{
                    left: flavors.length % 2 === 0 ? isCone ? "10rem" : "9rem" : "",
                    right: flavors.length % 2 !== 0 ? isCone ? "10rem" : "8.6rem" : "",
                    width: isCone ? "36%" : "40%"
                }}
            />
            <p
                children={isCone ? "Cone" : "Cup"}
                className={
                    "text-stroke-2-linen text-3xl text-linen " +
                    "absolute text-nowrap top-[2.4rem]"
                }
                style={{
                    left: flavors.length % 2 === 0 ? ballDiameter + (isCone ? 7 : 5) + "rem" : "",
                    right: flavors.length % 2 !== 0 ? ballDiameter + (isCone ? 7 : 5) + "rem" : "",
                }}
            />
            <div
                className={
                    "flex gap-5 text-linen " +
                    "absolute text-nowrap top-[5.2rem]"
                }
                style={{
                    left: flavors.length % 2 === 0 ? ballDiameter + (isCone ? 8 : 6) + "rem" : "",
                    right: flavors.length % 2 !== 0 ? ballDiameter + (isCone ? 8 : 6) + "rem" : "",
                }}
            >
                {isPending && (
                    <div
                        className={"spinner spinner-linen absolute"}
                        style={{
                            left: flavors.length % 2 !== 0 ? 4.4 + "rem" : "",
                            right: flavors.length % 2 === 0 ? 4.4 + "rem" : "",
                        }}
                    />
                )}
                <button
                    type="button"
                    disabled={isPending || apiError}
                    onClick={handleSwitchBase}
                    children={
                        <TriangleSVG
                            fillPath={colors.linen}
                        />
                    }
                    className={
                        "disabled:opacity-50 disabled:pointer-events-none " +
                        "focus-left"
                    }
                />
                <button
                    type="button"
                    disabled={isPending || apiError}
                    onClick={handleSwitchBase}
                    children={
                        <TriangleSVG
                            fillPath={colors.linen}
                            className="transform: rotate-180"
                        />
                    }
                    className={
                        "disabled:opacity-50 disabled:pointer-events-none " +
                        "focus-right"
                    }
                />
            </div>
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
