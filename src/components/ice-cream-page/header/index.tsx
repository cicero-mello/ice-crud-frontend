"use client"

import { ChangeEvent, useCallback, useLayoutEffect, useState, useTransition } from "react"
import { RenameIceCreamRequest } from "@/app/api/rename-ice-cream/types"
import { useQueryClient } from "@tanstack/react-query"
import { debounce } from "@/utils/debounce"
import { colors } from "@/utils/js-styles"
import { HeaderProps } from "./types"
import { knewave } from "@/fonts"

export const Header = ({
    editMode,
    iceCreamName,
    iceCreamId
}: HeaderProps) => {
    const [name, setName] = useState(iceCreamName ?? "")
    const [apiError, setApiError] = useState(false)
    const [isPending, startTransition] = useTransition()
    const queryClient = useQueryClient()

    const tryUpdateName = useCallback((newIceCreamName: string) => {
        startTransition(async () => {
            setApiError(false)
            const response = await fetch("/api/rename-ice-cream", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    iceCreamId,
                    newIceCreamName
                } as RenameIceCreamRequest)
            })

            if (response.status !== 200) {
                setApiError(true)
                return
            }

            await queryClient.invalidateQueries({
                queryKey: ["get-customer-ice-creams"]
            })
        })
    }, [])

    const tryUpdateNameDebounced = useCallback(
        debounce(tryUpdateName, 400), []
    )

    const handleInputNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value
        setName(newName)
        tryUpdateNameDebounced(newName)
    }

    useLayoutEffect(() => {
        setName(iceCreamName)
    }, [iceCreamName])

    return (
        <header className="pt-8 flex flex-col items-center gap-1">
            {!editMode && (
                <h1 className={
                    "text-linen text-2xl text-center " +
                    `text-3xl ${knewave.className}`
                }>
                    {name}
                </h1>
            )}
            {editMode && (
                <div className="focus-left text-linen relative">
                    <input
                        value={name}
                        onChange={handleInputNameChange}
                        spellCheck={false}
                        aria-label="Ice Cream Name"
                        className={
                            "border-transparent border-b-4 border-b-linen text-linen text-center " +
                            `${knewave.className} text-3xl pb-2 mb-2 outline-none`
                        }
                        style={{
                            borderBottomColor: apiError ? colors.brick : colors.linen
                        }}
                    />
                    {isPending && (
                        <div className={
                            "absolute spinner spinner-linen " +
                            "right-[-2.4rem] top-3"
                        } />
                    )}
                </div>
            )}
            <p className={
                "text-linen text-2xl text-center " +
                `text-2xl text-stroke-1-linen`
            }>
                Cone + 4 balls
            </p>
        </header>
    )
}
