"use client"

import { bgByBaseType } from "@/components/ice-cream/core"
import { IceCream } from "@/components/ice-cream"
import { IceCreamCardProps } from "./types"
import Link from "next/link"

export const IceCreamCard = ({
    id,
    name,
    balls,
    baseType
}: IceCreamCardProps) => (
    <li className={
        "flex flex-col items-center max-w-46 gap-2 w-full " +
        "focus-top focus-color-linen text-xs"
    }>
        <div
            className={
                "relative h-50 w-36 overflow-hidden pb-4 " +
                "border-[0.375rem] border-linen rounded-lg"
            }
            style={{
                backgroundColor: bgByBaseType.get(baseType)
            }}
        >
            <Link
                href={`/ice-creams/${id}`}
                aria-label={name}
                className="flex absolute bottom-0 w-full"
            >
                <IceCream
                    balls={balls.map((ball) => ball.flavor)}
                    base={baseType}
                    className={
                        "transform: scale-[40%] origin-bottom bottom-2"
                    }
                />
            </Link>
        </div>
        <Link
            tabIndex={-1}
            href={`/ice-creams/${id}`}
            className={
                "text-xl text-center line-clamp-2 text-stone"
            }
        >
            {name}
        </Link>
    </li>
)
