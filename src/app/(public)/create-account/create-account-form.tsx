"use client"

import { CreateCustomerRequest, CreateCustomerResponse } from "@/app/api/create-customer/types"
import { createCustomerObject, CreateCustomerFields } from "@/zod/create-customer"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Avatar } from "@/enums"

export const CreateAccountForm = () => {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [backendError, setBackendError] = useState("")

    const { handleSubmit, register, formState } = useForm({
        resolver: zodResolver(createCustomerObject)
    })

    const { errors, dirtyFields, isSubmitting } = formState

    const onSubmit = async (fields: CreateCustomerFields) => {
        setBackendError("")
        setIsLoading(true)

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
            setBackendError(data.message ?? "Next Server Error")
            setIsLoading(false)
            return
        }

        router.push("/ice-creams")
    }

    const haveVisibleErrors = !!errors.name || !!errors.pass || !!errors.avatar
    const isAllFieldsDirty = dirtyFields.name && dirtyFields.pass && dirtyFields.avatar
    const formSubmitEnable = !haveVisibleErrors && isAllFieldsDirty && !isSubmitting && !isLoading

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="gap-8 flex flex-col m-8 max-w-56 w-full"
        >
            <label className="flex flex-col">
                Name:
                <input
                    className="border-amber-50 border-2"
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

            {backendError &&
                <p
                    className="text-red-300 text-center"
                    children={backendError}
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
                {(isSubmitting || isLoading) ? "Loading..." : "Create Account"}
            </button>
        </form>
    )
}
