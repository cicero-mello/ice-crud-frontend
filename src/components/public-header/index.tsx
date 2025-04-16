"use client"

import { knewave } from "@/fonts"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const PublicHeader = () => {
    const pathName = usePathname()
    const isInLanding = pathName === "/"
    const isInLogin = pathName === "/login"
    const isInCreateAccount = pathName === "/create-account"

    return (
        <header
            className={
                "flex w-full justify-center " +
                "pt-3 pb-4 pl-6 pr-6 " +
                "bg-linen text-2xl"
            }
        >
            <div className="flex justify-between w-full max-w-7xl">
                <Link
                    href={"/"}
                    children={isInLanding ? "Ice-CRUD" : "ic"}
                    className={
                        (isInLanding ? knewave.className : "") +
                        " focus-right"
                    }
                />
                <div className="flex gap-3">
                    <Link
                        href={"/login"}
                        children={"Login"}
                        className={
                            (isInLogin ? knewave.className : "") +
                            " focus-left"
                        }
                    />
                    /
                    <Link
                        href={"/create-account"}
                        children={"Create Account"}
                        className={
                            (isInCreateAccount ? knewave.className : "") +
                            " focus-bottom"
                        }
                    />
                </div>
            </div>
        </header>
    )
}
