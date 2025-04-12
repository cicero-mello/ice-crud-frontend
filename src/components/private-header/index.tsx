"use client"

import Link from "next/link"
import { knewave } from "@/fonts"
import { usePathname } from "next/navigation"

export const PrivateHeader = () => {
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
                    className={isInProfile ? knewave.className : undefined}
                >
                    <img
                        src="http://localhost:3000/avatars/afro-man.svg"
                        className={
                            (isInProfile ? "opacity-80 " : "opacity-50 ") +
                            "h-full bg-mud rounded-[50%]"
                        }
                    />
                </Link>
            </div>
        </header>
    )
}
