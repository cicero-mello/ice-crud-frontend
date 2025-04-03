"use client"

import { GetCustomerDataResponse } from "@/app/api/get-customer-data/types"
import { useLayoutEffect, useState, useTransition } from "react"

export const CustomerInfo = () => {
    const [isPending, startTransition] = useTransition()
    const [data, setData] = useState<GetCustomerDataResponse>()

    useLayoutEffect(() => {
        startTransition(async () => {
            const response = await fetch("/api/get-customer-data", {
                method: "GET"
            })
            if (response.status === 200) {
                const data = await response.json() as GetCustomerDataResponse
                setData(data)
            }
        })
    }, [])

    return (
        <div className="border border-white p-4">
            {(!!data || !!isPending) && (<>
                <p>Avatar: {data?.avatar ?? "Loading . . ."}</p>
                <p>Username: {data?.name ?? "Loading . . ."}</p>
            </>)}
            {!data && !isPending && (
                <p> Error to get Customer Data</p>
            )}
        </div>
    )
}
