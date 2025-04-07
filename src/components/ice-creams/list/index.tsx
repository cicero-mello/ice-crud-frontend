"use client"

import { GetCustomerIceCreamsResponse } from "@/app/api/get-customer-ice-creams/types"
import { IceCreamBaseType } from "@/enums"
import { IceCream } from "@/types"
import { useLayoutEffect, useState, useTransition } from "react"

export const IceCreamList = () => {
    const [isPending, startTransition] = useTransition()
    const [iceCreams, setIceCreams] = useState<IceCream[]>([])

    useLayoutEffect(() => {
        startTransition(async () => {
            const response = await fetch("/api/get-customer-ice-creams", {
                method: "GET"
            })


            if (response.status === 200) {
                const data = await response.json() as GetCustomerIceCreamsResponse
                setIceCreams(data.iceCreams)
            }
        })
    }, [])

    if (isPending) return <p> Loading . . .</p>

    if (iceCreams.length === 0) return <p>No Ice Creams</p>

    return isPending ? <p> Loading . . .</p> : (
        <ul>
            {iceCreams.map(iceCream => (
                <li
                    key={`i=${iceCream.id}`}
                    className={
                        "border border-white p-4 m-4"
                    }
                >
                    <p>Name: {iceCream.name}</p>
                    <p>Balls: {iceCream.balls.length}</p>
                    <p>Base: {iceCream.baseType === IceCreamBaseType.Cone ? "Cone" : "Cup"}</p>
                </li>
            ))}
        </ul>
    )
}
