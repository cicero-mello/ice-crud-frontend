"use client"

import { kleeOne, knewave } from "@/fonts"
import { ButtonTitleProps } from "./types"

export const ButtonTitle = ({
    disabled,
    isLoading,
    className,
    text,
    ...rest
}: ButtonTitleProps) => (
    <button
        {...rest}
        disabled={disabled}
        className={
            className +
            " disabled:pointer-events-none disabled:text-stroke-1-taupe " +
            "disabled:border-none " +
            (!!isLoading ? "pointer-events-none " : "border-6 ") +
            (disabled ? kleeOne.className : knewave.className) +
            " cursor-pointer text-3xl text-taupe self-center " +
            "rounded-xl h-fit pt-1 pb-2 pr-3 pl-3 " +
            "outline-none justify-center flex"
        }
    >
        {!!isLoading ? <div className="spinner" /> : text}
    </button>
)
