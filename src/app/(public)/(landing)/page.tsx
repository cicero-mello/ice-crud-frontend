"use server"

import { knewave } from "@/fonts"
import * as serverCookies from "@/utils/server-cookies"
import Link from "next/link"

const Landing = async () => {
    const { accessToken } = await serverCookies.getCookiesLogin()

    return (
        <main className={
            "flex flex-1 flex-col items-center justify-center " +
            "gap-8 p-12 pb-24"
        }>
            <h1
                children="Ice-CRUD"
                className={
                    knewave.className +
                    " text-8xl mb-10 text-center"
                }
            />
            <p className={
                "flex items-center justify-center flex-wrap text-center " +
                "text-3xl gap-3"
            }>
                <img
                    src="/emojis/ice-cream.png"
                    className="h-8 pointer-events-none select-none"
                    alt="Ice Cream"
                /> Build your perfect ice cream!
            </p>
            <p className="text-3xl max-w-4xl text-center leading-[148%]">
                Create, customize, and manage your collection
                of sweet treats with ease. Whether you're
                dreaming up wild combos or crafting the
                classics, the freezer is yours to command.
            </p>
            {!accessToken && (
                <Link
                    href={"/create-account"}
                    className="button-moss mt-10"
                >
                    Create Account
                </Link>
            )}
        </main>
    )
}

export default Landing
