"use client"

import { CreateIceCreamRequest, CreateIceCreamResponse } from "@/app/api/create-ice-cream/types"
import { BallFlavor, Size } from "@/enums"
import { onClickBackdrop } from "@/utils/dialog"
import { FormEvent, useRef, useState, useTransition } from "react"

export const CreateIceCreamButton = () => {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [isPending, startTransition] = useTransition()

    const closeDialog = () => {
        dialogRef.current?.close()
        formRef.current?.reset()
        setErrorMessage("")
    }

    const onSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => startTransition(async () => {
        const formData = new FormData(event.currentTarget)
        const iceCream = {
            name: formData.get("name"),
            balls: formData.get("balls"),
            base: formData.get("base")
        }

        if (!iceCream.name || !iceCream.balls || !iceCream.base) {
            setErrorMessage("Invalid Field Values")
            event.preventDefault()
            return
        }

        const response = await fetch("api/create-ice-cream", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: iceCream.name,
                balls: Array.from({ length: +iceCream.balls }).map(() => ({
                    flavor: BallFlavor.chocolate,
                    size: Size.medium
                })),
                cone: iceCream.base != "cone" ? undefined : {
                    color: "#FFFFFF",
                    size: Size.medium
                },
                cup: iceCream.base != "cup" ? undefined : {
                    size: Size.medium
                },
            } as CreateIceCreamRequest)
        })
        const data = await response.json() as CreateIceCreamResponse

        if (response.status != 201) {
            setErrorMessage(data.message)
            event.preventDefault()
            return
        }

    })

    return (
        <>
            <button
                children="Create Ice Cream"
                onClick={() => dialogRef.current!.showModal()}
                className={
                    "disabled:opacity-30 disabled:pointer-events-none " +
                    "transition duration-150 " +
                    "cursor-pointer underline w-fit " +
                    "hover:text-blue-400"
                }
            />
            <dialog
                ref={dialogRef}
                onClick={(e) => onClickBackdrop(e, closeDialog)}
                className={
                    "backdrop:bg-blue-500 backdrop:blur-md backdrop:opacity-40 " +
                    "bg-blue-100 " +
                    "self-center justify-self-center " +
                    "max-w-2xl p-6 rounded-xl"
                }
            >
                <form
                    ref={formRef}
                    onSubmit={onSubmit}
                    className={
                        "flex flex-col gap-3"
                    }
                >
                    <label className="flex flex-col">
                        Name:
                        <input
                            type="text"
                            name="name"
                            placeholder="My IceCream"
                            className="border border-black"
                        />
                    </label>
                    <label
                        className="flex flex-col"
                    >
                        Base:
                        <select name="base">
                            <option value="cup"> Cup </option>
                            <option value="cone"> Cone </option>
                        </select>
                    </label>
                    <label className="flex flex-col">
                        Balls:
                        <input
                            name="balls"
                            type="number"
                            min={0}
                            placeholder="1"
                            className="border-black border"
                        />
                    </label>
                    {errorMessage && (
                        <p> {errorMessage} </p>
                    )}
                    <button
                        type="submit"
                        disabled={isPending}
                        className={
                            "disabled:opacity-30 disabled:pointer-events-none " +
                            "cursor-pointer underline w-fit"
                        }
                    >
                        {isPending ? "Loading" : "Create"}
                    </button>
                </form>
            </dialog>
        </>
    )
}
