"use client"

import { CardErrorListProps } from "./types"

const bgByTheme = new Map<string, string>([
    ["olive", " bg-olive"],
    ["brick", " bg-brick"],
    ["rust", " bg-rust"]
])

const colorByTheme = new Map<string, string>([
    ["olive", " text-linen"],
    ["brick", " text-linen"],
    ["rust", " text-sand"]
])

export const CardErrorList = ({
    className,
    messages,
    theme
}: CardErrorListProps) => {
    const bg = bgByTheme.get(theme) ?? ""
    const color = colorByTheme.get(theme) ?? ""

    return (
        <ul className={
            (className ?? "") + bg + color +
            " list-disc rounded-xl text-lg " +
            "w-fit pr-7 pl-10 pt-3 pb-4"
        }>
            {messages.map((message, i) => (
                <li
                    key={i + "-error-item"}
                    className="leading-[140%]"
                    children={message}
                />
            ))}
        </ul>
    )
}
