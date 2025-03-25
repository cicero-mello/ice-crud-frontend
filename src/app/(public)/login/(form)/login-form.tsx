"use client"

import { login } from "@/api/public"
import { LoginFields, loginObject } from "@/zod/login"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { redirect } from "next/navigation"

export const LoginForm = () => {
    const [backendError, setBackendError] = useState("")

    const { handleSubmit, register, formState } = useForm({
        resolver: zodResolver(loginObject)
    })

    const { errors, dirtyFields, isSubmitting } = formState

    const onSubmit = async (data: LoginFields) => {
        setBackendError("")

        const resp = await login({
            name: data.name,
            pass: data.pass
        })
        if (resp.error) {
            setBackendError(resp.error.message)
            return
        }
        document.cookie = `refresh_token=${resp.data.refreshToken}`
        document.cookie = `access_token=${resp.data.accessToken}`
        redirect("/ice-creams")
    }

    const haveVisibleErrors = !!errors.name || !!errors.pass
    const isAllFieldsDirty = dirtyFields.name && dirtyFields.pass
    const formSubmitEnable = !haveVisibleErrors && isAllFieldsDirty && !isSubmitting

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
                {isSubmitting ? "Loading..." : "Login"}
            </button>
        </form>
    )
}
