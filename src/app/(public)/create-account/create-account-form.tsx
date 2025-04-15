"use client"

import { CreateCustomerRequest, CreateCustomerResponse } from "@/app/api/create-customer/types"
import { createCustomerObject, CreateCustomerFields } from "@/zod/create-customer"
import { useQueryClient } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Avatar } from "@/enums"

export const CreateAccountForm = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const {
        handleSubmit,
        register,
        formState: { errors, dirtyFields, isSubmitting },
        setError,
        clearErrors
    } = useForm({
        resolver: zodResolver(createCustomerObject)
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
                avatar: fields.avatar
            } as CreateCustomerRequest)
        })
        const data = await response.json() as CreateCustomerResponse

        if (response.status !== 201) {
            setError("root.serverError", {
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
        if (!!errors.root?.serverError) {
            clearErrors(["root.serverError"] as any)
        }
    }

    const haveVisibleErrors = !!errors.name || !!errors.pass || !!errors.avatar
    const isAllFieldsDirty = dirtyFields.name && dirtyFields.pass && dirtyFields.avatar
    const formSubmitEnable = (
        !haveVisibleErrors
        && isAllFieldsDirty
        && !isSubmitting
        && !isPending
    )

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="gap-8 flex flex-col m-8 max-w-56 w-full"
        >
            <label className="flex flex-col">
                Name:
                <input
                    className="border-amber-50 border-2"
                    onKeyDown={onKeyDownInputName}
                    {...register("name")}
                />
                {errors.name &&
                    <p
                        className="text-red-300"
                        children={errors.name.message}
                    />
                }
            </label>

            <label className="flex flex-col">
                Pass:
                <input
                    className="border-amber-50 border-2"
                    {...register("pass")}
                    type="password"
                    autoComplete="off"
                />
                {errors.pass &&
                    <p
                        className="text-red-300"
                        children={errors.pass.message}
                    />
                }
            </label>

            <label className="flex flex-col">
                Avatar:
                <input
                    className="border-amber-50 border-2"
                    {...register("avatar", { valueAsNumber: true })}
                    type="number"
                    min={0}
                    max={Avatar.YoungMan}
                    autoComplete="off"
                />
                {errors.avatar &&
                    <p
                        className="text-red-300"
                        children={errors.avatar.message}
                    />
                }
            </label>

            {!!errors.root?.serverError &&
                <p
                    className="text-red-300 text-center"
                    children={errors.root.serverError.message}
                />
            }

            <button
                type="submit"
                disabled={!formSubmitEnable}
                className={
                    "disabled:opacity-40 disabled:pointer-events-none " +
                    "w-fit cursor-pointer self-center border-2 border-amber-50 p-2.5 rounded-md " +
                    "hover:border-indigo-500 " +
                    "transition duration-100"
                }
            >
                {(isSubmitting || isPending) ? "Loading..." : "Create Account"}
            </button>
        </form>
    )
}
