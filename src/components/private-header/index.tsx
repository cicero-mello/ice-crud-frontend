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
            <nav className={
                "grid grid-cols-[1fr_auto_1fr] items-center " +
                "w-full max-w-7xl"
            }>
                <Link
                    href={"/"}
                    children={isInLanding ? "Ice-CRUD" : "ic"}
                    className={
                        (isInLanding ? knewave.className : "") +
                        "  justify-self-start w-fit " +
                        "focus-right"
                    }
                />
                <Link
                    href={"/ice-creams"}
                    children={"Ice Creams"}
                    className={
                        (isInIceCreams ? `${knewave.className} ` : "") +
                        "transform justify-self-center text-nowrap w-fit " +
                        "focus-left"
                    }
                />
                <Link
                    href={"/customer"}
                    className={
                        "flex h-full justify-self-end w-fit " +
                        "focus-left "
                    }
                >
                    {isFetching ? <div className="spinner" /> :
                        <img
                            src={getSvgUrlByAvatar(data?.avatar ?? 0)}
                            className={
                                (isInProfile ? "opacity-80 " : "opacity-50 ") +
                                "h-8 rounded-[50%]"
                            }
                        />
                    }
                </Link>
            </nav>
        </header>
    )
}
