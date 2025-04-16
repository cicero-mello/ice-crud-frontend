"use client"

import { CreateCustomerRequest, CreateCustomerResponse } from "@/app/api/create-customer/types"
import { createCustomerObject, CreateCustomerFields } from "@/zod/create-customer"
import { ButtonTitle, CardErrorList, InputRow, RadioImage } from "@/components"
import { useQueryClient } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { radioImageAvatars } from "@/utils/avatars"

export const CreateAccountForm = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const {
        handleSubmit,
        register,
        formState: { errors, dirtyFields, isSubmitting },
        setError,
        clearErrors,
        setFocus
    } = useForm({
        resolver: zodResolver(createCustomerObject),
        mode: "onChange"
    })

    const onSubmit = async (
        fields: CreateCustomerFields
    ) => startTransition(async () => {
        const response = await fetch("/api/create-customer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: fields.name,
                pass: fields.pass,
                avatar: +fields.avatar
            } as CreateCustomerRequest)
        })
        const data = await response.json() as CreateCustomerResponse

        if (response.status !== 201) {
            setFocus("name")
            setError("root.createAccountServerError", {
                type: "custom",
                message: data.message ?? "Next Server Error"
            })

            return
        }

        queryClient.invalidateQueries({ queryKey: ["get-customer-data"] })
        router.push("/ice-creams")
        router.refresh()
    })

    const onKeyDownInputName = () => {
        if (!!errors.root?.createAccountServerError) {
            clearErrors(["root.createAccountServerError"] as any)
        }
    }

    const haveVisibleErrors = !!errors.name || !!errors.pass || !!errors.avatar
    const isAllFieldsDirty = dirtyFields.name && dirtyFields.pass
    const formSubmitEnable = (
        !haveVisibleErrors
        && isAllFieldsDirty
        && !isSubmitting
        && !isPending
    )

    const errorMessages = [
        errors.name?.message,
        errors.pass?.message,
        errors.avatar?.message,
        errors.root?.createAccountServerError.message
    ].filter(item => item !== undefined)

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={
                    "flex flex-row-reverse flex-wrap justify-center " +
                    "bg-linen rounded-xl " +
                    "pt-12 pl-8 pr-8 pb-14 gap-18 m-8"
                }
            >
                <div className="flex flex-col gap-8">
                    <InputRow.Label>
                        username
                        <InputRow.Input
                            onKeyDown={onKeyDownInputName}
                            placeholder="John Doe"
                            haveError={!!errors.name}
                            inputWrapperClassName="focus-left"
                            {...register("name")}
                        />
                    </InputRow.Label>
                    <InputRow.Label>
                        password
                        <InputRow.Input
                            type="password"
                            autoComplete="off"
                            placeholder="********"
                            haveError={!!errors.pass}
                            inputWrapperClassName="focus-left"
                            {...register("pass")}
                        />
                    </InputRow.Label>
                    <RadioImage
                        label="avatar"
                        formRegister={register("avatar")}
                        items={radioImageAvatars}
                        className="focus-left focus-color-taupe"
                    />
                </div>
                <ButtonTitle
                    text="Create Account"
                    type="submit"
                    disabled={!formSubmitEnable}
                    isLoading={(isSubmitting || isPending)}
                    className="focus-bottom"
                />
            </form>
            {errorMessages.length > 0 && (
                <CardErrorList
                    theme="olive"
                    messages={errorMessages}
                    className="mr-8 ml-8"
                />
            )}
        </>
    )
}
