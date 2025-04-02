"use client"

import { LoginRequest, LoginResponse } from "@/app/api/login/types"
import { LoginFields, loginObject } from "@/zod/login"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export const LoginForm = () => {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [backendError, setBackendError] = useState("")

    const { handleSubmit, register, formState } = useForm({
        resolver: zodResolver(loginObject)
    })

    const { errors, dirtyFields, isSubmitting } = formState

    const onSubmit = async (field: LoginFields) => {
        setBackendError("")
        setIsLoading(true)

        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: field.name,
                pass: field.pass
            } as LoginRequest)
        })
        const data = await response.json() as LoginResponse

        if (response.status !== 200) {
            setBackendError(data.message ?? "Next Server Error")
            setIsLoading(false)
            return
        }

        router.push("/ice-creams")
    }

    const haveVisibleErrors = !!errors.name || !!errors.pass
    const isAllFieldsDirty = dirtyFields.name && dirtyFields.pass
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
                {(isSubmitting || isLoading) ? "Loading..." : "Login"}
            </button>
        </form>
    )
}
