"use client"

import { useRef, useState, useTransition } from "react"
import { RadioImage, ButtonTitle, CardErrorList, InputRow } from "@/components"
import { EditAccountButtonProps } from "./types"
import { onClickBackdrop } from "@/utils/dialog"
import { radioImageAvatars } from "@/utils/avatars"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { GetCustomerDataResponse } from "@/app/api/get-customer-data/types"
import { CreateCustomerFields, createCustomerObject } from "@/zod/create-customer"
import { UpdateCustomerRequest, UpdateCustomerResponse } from "@/app/api/update-customer/types"

export const EditAccountButton = ({
    className = ""
}: EditAccountButtonProps) => {
    const queryClient = useQueryClient()
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [isPending, startTransition] = useTransition()
    const [
        radioImageCheckedIndexDefault,
        setRadioImageCheckedIndexDefault
    ] = useState(0)

    const { data } = useQuery<GetCustomerDataResponse>({
        queryKey: ["get-customer-data"],
        staleTime: Infinity,
        queryFn: async () => {
            const response = await fetch("api/get-customer-data", {
                method: "GET"
            })
            return await response.json()
        }
    })

    const {
        handleSubmit,
        register,
        reset,
        setError,
        clearErrors,
        setFocus,
        setValue,
        formState: { errors, dirtyFields, isSubmitting }
    } = useForm({
        resolver: zodResolver(createCustomerObject)
    })

    const closeDialog = () => {
        dialogRef.current?.close()
        clearErrors()
        reset()
        setRadioImageCheckedIndexDefault(0)
    }

    const openDialog = () => {
        dialogRef.current?.showModal()

        setRadioImageCheckedIndexDefault(data?.avatar ?? 0)
        setValue("name", data?.name ?? "", { shouldDirty: true })
        setFocus("name", {
            shouldSelect: true
        })
    }

    const onSubmit = async (
        field: CreateCustomerFields
    ) => startTransition(async () => {
        const response = await fetch("/api/update-customer", {
            method: "PATCH",
            body: JSON.stringify({
                newAvatar: +field.avatar,
                newName: field.name,
                pass: field.pass
            } as UpdateCustomerRequest)
        })

        if (response.status != 200) {
            const data = await response.json() as UpdateCustomerResponse
            setError("root.editAccountServerError", {
                type: "custom",
                message: data.message
            })
            return
        }

        await queryClient.refetchQueries({ queryKey: ["get-customer-data"] })
        closeDialog()
    })

    const haveVisibleErrors = !!errors.name || !!errors.pass || !!errors.avatar
    const isAllFieldsDirty = dirtyFields.name && dirtyFields.pass
    const formSubmitEnable = (
        !haveVisibleErrors
        && isAllFieldsDirty
        && !isSubmitting
        && !isPending
    )

    const clearServerError = () => {
        if (!!errors.root?.editAccountServerError) {
            clearErrors(["root.editAccountServerError"] as any)
        }
    }

    const errorList = [
        errors.name?.message,
        errors.pass?.message,
        errors.root?.editAccountServerError.message
    ].filter(error => error != undefined)

    return (
        <>
            <button
                children="Edit Account"
                className={className + " button-moss"}
                onClick={openDialog}
            />
            <dialog
                ref={dialogRef}
                onClick={(e) => onClickBackdrop(e, closeDialog)}
                className={
                    "backdrop:bg-mud backdrop:opacity-93 " +
                    "self-center justify-self-center bg-transparent"
                }
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={
                        "flex flex-row-reverse flex-wrap justify-center " +
                        "bg-linen rounded-xl relative " +
                        "pt-12 pl-8 pr-8 pb-14 gap-18 m-8"
                    }
                >
                    <div className="absolute top-1 right-5">
                        <button
                            children="✖"
                            type="button"
                            aria-label="Close Dialog"
                            onClick={closeDialog}
                            className={
                                "cursor-pointer self-end items-end mr-[-0.5rem] " +
                                "text-xl focus-left text-stone " +
                                "focus-within:text-taupe"
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-8">
                        <InputRow.Label>
                            new username
                            <div className="focus-left">
                                <InputRow.Input
                                    placeholder="John Doe"
                                    haveError={!!errors.name}
                                    onKeyDown={clearServerError}
                                    {...register("name")}
                                />
                            </div>
                        </InputRow.Label>
                        <RadioImage
                            label="new avatar"
                            formRegister={register("avatar")}
                            items={radioImageAvatars}
                            className="focus-left focus-color-taupe"
                            defaultCheckedIndex={radioImageCheckedIndexDefault}
                        />
                        <InputRow.Label>
                            password
                            <div className="focus-left">
                                <InputRow.Input
                                    type="password"
                                    autoComplete="on"
                                    placeholder="********"
                                    haveError={!!errors.pass}
                                    onKeyDown={clearServerError}
                                    {...register("pass")}
                                />
                            </div>
                        </InputRow.Label>
                    </div>
                    <ButtonTitle
                        text="Edit Account"
                        type="submit"
                        disabled={!formSubmitEnable}
                        isLoading={(isSubmitting || isPending)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                        className="focus-bottom"
                    />
                </form>
                {errorList.length > 0 && (
                    <CardErrorList
                        messages={errorList}
                        theme="olive"
                        className="m-auto"
                    />
                )}
            </dialog>
        </>
    )
}
