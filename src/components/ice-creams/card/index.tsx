"use client"

import { DeleteIceCreamRequest, DeleteIceCreamResponse } from "@/app/api/delete-ice-cream/types"
import { FC, MouseEvent, useState, useTransition } from "react"
import { IceCreamCardProps } from "./types"
import { IceCreamBaseType } from "@/enums"
import Link from "next/link"

export const IceCreamCard: FC<IceCreamCardProps> = ({
    id,
    name,
    balls,
    baseType
}) => {
    const [isDeletingIceCream, deleteIceCream] = useTransition()
    const [errorMessage, setErrorMessage] = useState("")

    const handleDeleteIceCream = (
        event: MouseEvent<HTMLButtonElement>,
        iceCreamId: string
    ) => deleteIceCream(async () => {
        event.stopPropagation()

        const response = await fetch("api/delete-ice-cream", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                iceCreamId
            } as DeleteIceCreamRequest)
        })

        if (response.status === 200) {
            setErrorMessage("")
            location.reload()
            return
        }

        const data = await response.json() as DeleteIceCreamResponse
        setErrorMessage(data.message)
    })

    return (
        <li
            className={
                "border border-white p-4 m-4 relative " +
                "cursor-pointer"
            }
        >
            <Link href={`/ice-creams/${id}`}>
                <p>Name: {name}</p>
                <p>Balls: {balls.length}</p>
                <p>Base: {baseType === IceCreamBaseType.Cone ? "Cone" : "Cup"}</p>
            </Link>
            <button
                onClick={(e) => handleDeleteIceCream(e, id)}
                disabled={!!errorMessage || isDeletingIceCream}
                className={
                    "disabled:opacity-30 disabled:pointer-events-none " +
                    "absolute right-0 top-0 mr-3 mt-3 " +
                    "cursor-pointer " +
                    "hover:underline"
                }
            >
                {errorMessage ? errorMessage : isDeletingIceCream ? "Deleting . . ." : "Delete"}
            </button>
        </li>
    )
}
