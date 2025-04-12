"use server"

import { knewave } from "@/fonts"

const Landing = () => {

    return (
        <main className={
            "flex flex-col items-center justify-center " +
            "gap-8 pt-30 p-6 pb-30"
        }>
            <h1
                children="Ice-CRUD"
                className={
                    knewave.className +
                    " text-8xl mb-6 text-center"
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
        </main>
    )
}

export default Landing
