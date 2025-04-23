"use client"

import { IceCream } from "@/components/ice-cream"
import { BallFlavor, IceCreamBaseType } from "@/enums"
import { onClickBackdrop } from "@/utils/dialog"
import { useRef } from "react"
import { CreateIceCreamButtonProps } from "./types"

export const CreateIceCreamButton = ({
    className = "",
    text,
}: CreateIceCreamButtonProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const closeDialog = () => {
        dialogRef.current?.close()
        formRef.current?.reset()
    }

    const balls = [
        BallFlavor.Strawberry,
        BallFlavor.Grape,
        BallFlavor.Vanilla,
        BallFlavor.Chocolate
    ]

    return (
        <>
            <button
                children={text}
                onClick={() => dialogRef.current!.showModal()}
                className={className + " button-moss-s"}
            />
            <dialog
                ref={dialogRef}
                onClick={(e) => onClickBackdrop(e, closeDialog)}
                className={
                    "backdrop:bg-mud backdrop:opacity-93 " +
                    "self-center justify-self-center bg-transparent " +
                    "w-full max-w-166 "
                }
            >
                <IceCream balls={balls} base={IceCreamBaseType.Cone} withText />
            </dialog>
        </>
    )
}
