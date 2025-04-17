"use client"

import { GetCustomerDataResponse } from "@/app/api/get-customer-data/types"
import { getSvgUrlByAvatar } from "@/utils/avatars"
import { useQuery } from "@tanstack/react-query"

export const CustomerInfo = () => {
    const { data } = useQuery<GetCustomerDataResponse>({
        queryKey: ["get-customer-data"],
        staleTime: Infinity,
        queryFn: async () => {
            const response = await fetch("api/get-customer-data", {
                method: "GET"
            })
            return await response.json()
        }
    })

    return (
        <div
            className={
                "flex flex-col bg-linen rounded-xl justify-center " +
                " p-10 pt-6 pb-6 w-60 min-h-60"
            }
        >
            {!data && <div className="spinner" />}
            {!!data && (<>
                <img
                    src={getSvgUrlByAvatar(data.avatar)}
                    className="h-40 w-40"
                />
                <p className="text-2xl text-center text-taupe">
                    {data.name}
                </p>
            </>)}
        </div>
    )
}
