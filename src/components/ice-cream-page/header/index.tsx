import { knewave } from "@/fonts"
import { HeaderProps } from "./types"
import { useState } from "react"

export const Header = ({
    editMode,
    iceCreamName
}: HeaderProps) => {
    const [name, setName] = useState(iceCreamName ?? "")

    return (
        <header className="pt-8 flex flex-col items-center gap-1">
            {!editMode && (
                <h1 className={
                    "text-linen text-2xl text-center " +
                    `text-3xl ${knewave.className}`
                }>
                    {name}
                </h1>
            )}
            {editMode && (
                <div className="focus-left text-linen">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        spellCheck={false}
                        aria-label="Ice Cream Name"
                        className={
                            "border-transparent border-b-4 border-b-linen text-linen text-center " +
                            `${knewave.className} text-3xl pb-2 mb-2 outline-none`
                        }
                    />
                </div>
            )}
            <p className={
                "text-linen text-2xl text-center " +
                `text-2xl text-stroke-1-linen`
            }>
                Cone + 4 balls
            </p>
        </header>
    )
}
