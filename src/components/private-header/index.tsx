"use client"

import Link from "next/link"
import { knewave } from "@/fonts"
import { usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getSvgUrlByAvatar } from "@/utils/avatars"
import { GetCustomerDataResponse } from "@/app/api/get-customer-data/types"

export const PrivateHeader = () => {
    const { data, isFetching } = useQuery<GetCustomerDataResponse>({
        queryKey: ["get-customer-data"],
        staleTime: Infinity,
        queryFn: async () => {
            const response = await fetch("/api/get-customer-data", {
                method: "GET"
            })
            return await response.json()
        }
    })

    const pathName = usePathname()
    const isInLanding = pathName === "/"
    const isInIceCreams = pathName.includes("/ice-creams")
    const isInProfile = pathName === "/customer"

    return (
        <header
            className={
                "flex w-full justify-center " +
                "pt-3 pb-4 pl-6 pr-6 " +
                "bg-linen text-2xl"
            }
        >
            <div className="flex justify-between w-full max-w-7xl relative">
                <Link
                    href={"/"}
                    children={isInLanding ? "Ice-CRUD" : "ic"}
                    className={isInLanding ? knewave.className : undefined}
                />
                <Link
                    href={"/ice-creams"}
                    children={"Ice Creams"}
                    className={
                        (isInIceCreams ? `${knewave.className} ` : "") +
                        "absolute left-[50%] transform translate-x-[-50%] text-nowrap"
                    }
                />
                <Link
                    href={"/customer"}
                    className={
                        (isInProfile ? "opacity-80 " : "opacity-50 ") +
                        "flex h-full"
                    }
                >
                    {isFetching ? <div className="spinner" /> :
                        <img
                            src={getSvgUrlByAvatar(data?.avatar ?? 0)}
                            className={"h-full rounded-[50%]"}
                        />
                    }
                </Link>
            </div>
        </header>
    )
}
