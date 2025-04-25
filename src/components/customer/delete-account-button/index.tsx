"use client"

import { DeleteCustomerRequest, DeleteCustomerResponse } from "@/app/api/delete-customer/types"
import { DeleteCustomerFields, deleteCustomerObject } from "@/zod/delete-customer"
import { zodResolver } from "@hookform/resolvers/zod"
import * as serverCookies from "@/utils/server-cookies"
import { DeleteAccountButtonProps } from "./types"
import { onClickBackdrop } from "@/utils/dialog"
import { useRef, useTransition } from "react"
import { CardErrorList } from "@/components"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { knewave } from "@/fonts"

export const DeleteAccountButton = ({
    className = ""
}: DeleteAccountButtonProps) => {
    const router = useRouter()
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [isPending, startTransition] = useTransition()

    const {
        handleSubmit,
        register,
        formState: { errors, dirtyFields, isSubmitting },
        reset,
        setError,
        clearErrors,
        setFocus
    } = useForm({ resolver: zodResolver(deleteCustomerObject) })

    const closeDialog = () => {
        if (isPending || isSubmitting) return
        dialogRef.current!.close()
        reset()
    }

    const onSubmit = async (
        field: DeleteCustomerFields
    ) => startTransition(async () => {
        const response = await fetch("api/delete-customer", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                pass: field.pass
            } as DeleteCustomerRequest)
        })

        if (response.status != 200) {
            const data = await response.json() as DeleteCustomerResponse
            setError("root.serverError", {
                type: "custom",
                message: data.message
            })
            return
        }

        await serverCookies.deleteCookiesLogin()
        router.push("/login")
    })

    const handleKeyDownPass = () => {
        if (!!errors.root?.serverError) {
            clearErrors(["root.serverError"] as any)
        }
    }

    const handleButtonClick = () => {
        dialogRef.current?.showModal()
        setFocus("pass")
    }

    const errorList = [
        errors.pass?.message,
        errors.root?.serverError.message
    ].filter(error => error != undefined)

    return (
        <>
            <button
                children="Delete Account"
                onClick={handleButtonClick}
                className={className + " button-rust"}
            />
            <dialog
                ref={dialogRef}
                onClick={(e) => onClickBackdrop(e, closeDialog)}
                className={
                    "backdrop:bg-coal backdrop:opacity-93 " +
                    "self-center justify-self-center bg-transparent " +
                    "w-full max-w-166 "
                }
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={
                        "flex flex-col bg-rust text-sand rounded-xl " +
                        "pt-1 pb-9 pr-6 pl-6 m-6"
                    }
                >
                    <button
                        children="✖"
                        type="button"
                        aria-label="Close Dialog"
                        onClick={closeDialog}
                        className={
                            "cursor-pointer self-end items-end mr-[-0.5rem] " +
                            "text-xl focus-left"
                        }
                    />
                    <label className="flex flex-col gap-7 pt-2">
                        <span
                            className={
                                "text-3xl h-fit self-center text-center " +
                                "text-stroke-2-clay"
                            }
                        >
                            Confirm Your Password
                        </span>
                        <div className="focus-left self-center">
                            <input
                                id="pass_input"
                                type="password"
                                onKeyDown={handleKeyDownPass}
                                autoComplete="on"
                                {...register("pass")}
                                placeholder="**********"
                                className={
                                    " border-b-[0.1875rem] border-b-sand " +
                                    "placeholder-sand caret-sand text-xl " +
                                    "outline-none p-2 pb-1 max-w-50 w-full"
                                }
                            />
                        </div>
                    </label>
                    <div className="flex justify-between mt-11 flex-wrap gap-4">
                        <button
                            children="Cancel"
                            type="button"
                            onClick={closeDialog}
                            disabled={isPending || isSubmitting}
                            className={
                                `${knewave.className} ` +
                                "cursor-pointer text-[1.625rem] ml-4 " +
                                "focus-right"
                            }
                        />
                        <button
                            type="submit"
                            onClick={(e) => e.stopPropagation()}
                            disabled={
                                !dirtyFields.pass ||
                                !!errors.pass ||
                                isPending ||
                                isSubmitting
                            }
                            className={
                                "disabled:opacity-30 disabled:pointer-events-none " +
                                "button-rust-sand focus-left " +
                                "max-w-[14.125rem] min-h-[3.4375rem] w-full " +
                                "flex justify-center"
                            }
                        >
                            {!isPending ? "Delete Account" :
                                <div className="spinner spinner-sand" />
                            }
                        </button>
                    </div>
                </form>
                {errorList.length > 0 && (
                    <CardErrorList
                        theme="rust"
                        messages={errorList}
                        className="m-auto"
                    />
                )}
            </dialog>
        </>
    )
}
