"use client"

import { useCallback, useRef, useState, useTransition } from "react"
import { AddBallRequest } from "@/app/api/add-ball/types"
import { useQueryClient } from "@tanstack/react-query"
import { AddBallButtonProps } from "./types"
import { colors } from "@/utils/js-styles"
import { knewave } from "@/fonts"
import { Size } from "@/enums"

export const AddBallButton = ({
    iceCreamId
}: AddBallButtonProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [isPending, startTransition] = useTransition()
    const [apiError, setApiError] = useState(false)

    const queryClient = useQueryClient()

    const addBall = useCallback(() => startTransition(async () => {
        setApiError(false)
        const response = await fetch("/api/add-ball", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                iceCreamId,
                ball: {
                    size: Size.Medium,
                    flavor: Math.floor(Math.random() * 4)
                }
            } as AddBallRequest)
        })

        setTimeout(() => {
            buttonRef.current?.focus()
        }, 300)

        if (response.status != 201) {
            setApiError(true)
            return
        }

        await queryClient.invalidateQueries({
            queryKey: ["get-customer-ice-creams"]
        })
        await queryClient.invalidateQueries({
            queryKey: [`get-ice-cream-${iceCreamId}`]
        })

    }), [])

    return (
        <button
            ref={buttonRef}
            type="button"
            disabled={isPending || apiError}
            onClick={addBall}
            aria-label="Add Ball"
            className={
                "disabled:opacity-50 disabled:pointer-events-none " +
                `${knewave.className} text-5xl text-linen w-fit h-fit ` +
                "self-center mt-[1.875rem] mb-[-1.875rem] focus-left " +
                "relative transition duration-200"
            }
            style={{
                color: apiError ? colors.brick : colors.linen
            }}
        >
            +
            {isPending && (
                <span
                    className={
                        "spinner spinner-linen absolute " +
                        "right-[-200%] top-2"
                    }
                />
            )}
        </button>
    )
}
