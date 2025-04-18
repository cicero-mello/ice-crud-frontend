"use client"

import { Triangle } from "../svg"
import { RadioImageProps } from "./types"
import { useLayoutEffect, useState } from "react"

export const RadioImage = ({
    label, items, formRegister,
    className = " ",
    defaultCheckedIndex
}: RadioImageProps) => {
    const [currentItemIndex, setCurrentItemIndex] = useState(defaultCheckedIndex ?? 0)

    const nextItemIndex = (
        currentItemIndex === items.length - 1 ? 0 : currentItemIndex + 1
    )

    const previousItemIndex = (
        currentItemIndex === 0 ? items.length - 1 : currentItemIndex - 1
    )

    useLayoutEffect(() => {
        setCurrentItemIndex(defaultCheckedIndex ?? 0)
    }, [defaultCheckedIndex])

    return (
        <div className={
            className +
            " flex flex-col"
        }>
            <span className={
                " flex flex-col text-center " +
                " text-taupe text-2xl max-w-60 " +
                "mb-4"
            }>
                {label}
            </span>
            <div className="flex select-none items-center justify-center">
                <label
                    htmlFor={`input-radio-${formRegister.name}-${previousItemIndex}`}
                    className={"h-fit self-center cursor-pointer"}
                    tabIndex={-1}
                >
                    <Triangle />
                </label>
                <img
                    src={items[currentItemIndex].imageUrl}
                    alt={items[currentItemIndex].imageName}
                    className={"h-20 w-fit ml-4 mr-4"}
                />
                <div className="appearance-none w-0 h-0 overflow-hidden">
                    {items.map((item, index) => (
                        <label key={`ri-${formRegister.name}-${index}`}>
                            {item.imageName} {label}
                            <input
                                type="radio"
                                value={item.value + ""}
                                {...formRegister}
                                id={`input-radio-${formRegister.name}-${index}`}
                                defaultChecked={index === currentItemIndex ? true : undefined}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                    if (formRegister.onChange) formRegister.onChange(e)
                                    setCurrentItemIndex(index)
                                }}
                            />
                        </label>
                    ))}
                </div>
                <label
                    htmlFor={`input-radio-${formRegister.name}-${nextItemIndex}`}
                    className={"h-fit self-center cursor-pointer"}
                    tabIndex={-1}
                >
                    <Triangle className="transform rotate-180" />
                </label>
            </div>
            <span className="w-full h-[0.1875rem] bg-dune mt-2" />
        </div>
    )
}
