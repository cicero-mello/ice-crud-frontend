"use client"

import { DeleteCustomerFields, deleteCustomerObject } from "@/zod/delete-customer"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef, MouseEvent } from "react"
import { useForm } from "react-hook-form"

export const DeleteAccountButton = () => {
    const { handleSubmit, register, formState, reset } = useForm({
        resolver: zodResolver(deleteCustomerObject)
    })
    const { errors, dirtyFields } = formState

    const dialogRef = useRef<HTMLDialogElement>(null)

    const closeDialog = () => {
        dialogRef.current!.close()
        reset()
    }

    const handleClickDialog = (event: MouseEvent<HTMLDialogElement>) => {

        const element = event.target as HTMLElement
        const rect = element.getBoundingClientRect()
        const isClickInBackdrop = (
            rect.left > event.clientX ||
            rect.right < event.clientX ||
            rect.top > event.clientY ||
            rect.bottom < event.clientY
        )
        if (isClickInBackdrop) closeDialog()
    }

    const onSubmit = async (data: DeleteCustomerFields) => {
        console.log(data)
        // TODO backend submit
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
                onClick={handleClickDialog}
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
                            type="password"
                            {...register("pass")}
                            className="border-1 border-black rounded-sm ml-4  p-1 pl-2 pr-2"
                        />
                    </label>
                    {errors.pass &&
                        <p>{errors.pass.message}</p>
                    }
                    <div className="flex justify-between mt-7">
                        <button
                            children="Cancel"
                            type="button"
                            onClick={closeDialog}
                            className={
                                "cursor-pointer underline"
                            }
                        />
                        <button
                            type="submit"
                            onClick={(e) => e.stopPropagation()}
                            disabled={!dirtyFields.pass || !!errors.pass}
                            children="DELETE ACCOUNT"
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
