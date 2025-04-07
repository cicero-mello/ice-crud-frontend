"use client"

import { DeleteCustomerRequest, DeleteCustomerResponse } from "@/app/api/delete-customer/types"
import { DeleteCustomerFields, deleteCustomerObject } from "@/zod/delete-customer"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as serverCookies from "@/utils/server-cookies"
import { onClickBackdrop } from "@/utils/dialog"

export const DeleteAccountButton = () => {
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

    return (
        <>
            <button
                children="Delete Account"
                onClick={() => dialogRef.current!.showModal()}
                className={
                    "disabled:opacity-30 disabled:pointer-events-none " +
                    "transition duration-150 " +
                    "cursor-pointer underline w-fit " +
                    "hover:text-red-400"
                }
            />
            <dialog
                ref={dialogRef}
                onClick={(e) => onClickBackdrop(e, closeDialog)}
                className={
                    "backdrop:bg-red-500 backdrop:blur-md backdrop:opacity-40 " +
                    "bg-red-100 " +
                    "self-center justify-self-center " +
                    "max-w-2xl p-6 rounded-xl"
                }
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        Confirm your password:
                        <input
                            id="pass_input"
                            type="password"
                            onKeyDown={handleKeyDownPass}
                            {...register("pass")}
                            className="border-1 border-black rounded-sm ml-4  p-1 pl-2 pr-2"
                        />
                    </label>
                    {errors.pass &&
                        <p>{errors.pass.message}</p>
                    }
                    {errors.root?.serverError &&
                        <p>{errors.root.serverError.message}</p>
                    }
                    <div className="flex justify-between mt-7">
                        <button
                            children="Cancel"
                            type="button"
                            onClick={closeDialog}
                            disabled={isPending || isSubmitting}
                            className={
                                "disabled:opacity-30 disabled:pointer-events-none " +
                                "cursor-pointer underline"
                            }
                        />
                        <button
                            type="submit"
                            onClick={(e) => e.stopPropagation()}
                            children="DELETE ACCOUNT"
                            disabled={
                                !dirtyFields.pass ||
                                !!errors.pass ||
                                isPending ||
                                isSubmitting
                            }
                            className={
                                "disabled:opacity-30 disabled:pointer-events-none " +
                                "cursor-pointer underline font-bold text-red-950"
                            }
                        />
                    </div>
                </form>
            </dialog>
        </>
    )
}
