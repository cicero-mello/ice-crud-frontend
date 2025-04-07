"use client"

import { GetCustomerIceCreamsResponse } from "@/app/api/get-customer-ice-creams/types"
import { useLayoutEffect, useState, useTransition } from "react"
import { IceCreamCard } from "../card"
import { IceCream } from "@/types"

export const IceCreamList = () => {
    const [isLoadingIceCreams, loadIceCreams] = useTransition()
    const [iceCreams, setIceCreams] = useState<IceCream[]>([])

    useLayoutEffect(() => {
        loadIceCreams(async () => {
            const response = await fetch("/api/get-customer-ice-creams", {
                method: "GET"
            })

            if (response.status === 200) {
                const data = await response.json() as GetCustomerIceCreamsResponse
                setIceCreams(data.iceCreams)
            }
        })
    }, [])

    if (isLoadingIceCreams) return <p> Loading . . .</p>
    if (iceCreams.length === 0) return <p>No Ice Creams</p>

    return isLoadingIceCreams ? <p> Loading . . .</p> : (
        <ul>
            {iceCreams.map(iceCream => (
                <IceCreamCard
                    key={`icc-${iceCream.id}`}
                    id={iceCream.id}
                    name={iceCream.name}
                    balls={iceCream.balls}
                    baseType={iceCream.baseType}
                />
            ))}
        </ul>
    )
}
