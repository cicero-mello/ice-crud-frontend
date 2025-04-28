"use client"

import { DeleteIceCreamButtonProps } from "./types"
import { onClickBackdrop } from "@/utils/dialog"
import { TrashSVG } from "@/components/svg"
import { colors } from "@/utils/js-styles"
import { knewave } from "@/fonts"
import { useRef } from "react"

export const DeleteIceCreamButton = ({
}: DeleteIceCreamButtonProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null)

    const closeDialog = () => {
        dialogRef.current!.close()
    }

    const openDialog = () => {
        dialogRef.current?.showModal()
    }

    return (
        <>
            <button
                type="button"
                aria-label="Delete Ice Cream"
                onClick={openDialog}
                children={<TrashSVG stroke={colors.stone} />}
                className={
                    "bg-line w-fit bg-linen p-[0.375rem] " +
                    "border-4 border-stone rounded-xl " +
                    "focus-bottom text-linen"
                }
            />
            <dialog
                ref={dialogRef}
                onClick={(e) => onClickBackdrop(e, closeDialog)}
                className={
                    "backdrop:bg-coal backdrop:opacity-93 " +
                    "self-center justify-self-center bg-transparent "
                }
            >
                <div className={
                    "flex flex-col bg-rust text-sand " +
                    "relative p-4 rounded-xl"
                }>
                    <button
                        children="✖"
                        type="button"
                        aria-label="Close Dialog"
                        onClick={closeDialog}
                        className={
                            "cursor-pointer self-end items-end " +
                            "text-xl focus-left mt-[-0.625rem]"
                        }
                    />
                    <b className={
                        "text-xl p-4 max-w-[23.75rem] text-center " +
                        "mb-5"
                    }>
                        Are you sure you want to DELETE your ice cream?
                    </b>
                    <footer className="flex w-full justify-between">
                        <button
                            type="button"
                            onClick={closeDialog}
                            children="Cancel"
                            className={
                                "cursor-pointer " +
                                `text-xl focus-right ${knewave.className} ` +
                                "ml-3"
                            }
                        />
                        <button
                            type="button"
                            onClick={closeDialog}
                            children="Delete"
                            className={
                                "disabled:opacity-30 disabled:pointer-events-none " +
                                "button-rust-sand focus-left " +
                                "max-w-[8.125rem] min-h-[3.4375rem] w-full " +
                                "flex justify-center mr-1"
                            }
                        />
                    </footer>
                </div>
            </dialog>
        </>
    )
}
