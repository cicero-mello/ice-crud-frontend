"use client"

import { HTMLAttributes } from "react"
import { InputProps } from "./types"

const Input = ({
    className,
    haveError,
    spellCheck,
    ...rest
}: InputProps) => (
    <input
        spellCheck={false}
        {...rest}
        className={
            className +
            " border-b-3 " +
            (haveError ? "border-b-brick " : "border-b-dune ") +
            "text-taupe placeholder-stone caret-stone text-xl " +
            "outline-none p-2 pb-1 "
        }
    />
)

const Label = ({
    className,
    ...rest
}: HTMLAttributes<HTMLLabelElement>) => (
    <label
        {...rest}
        className={
            className +
            " flex flex-col text-center gap-1 " +
            " text-taupe text-2xl max-w-60"
        }
    />
)

export const InputRow = {
    Input,
    Label
}
