"use client"

import { LoginRequest, LoginResponse } from "@/app/api/login/types"
import { InputRow, ButtonTitle, CardErrorList } from "@/components"
import { useQueryClient } from "@tanstack/react-query"
import { LoginFields, loginObject } from "@/zod/login"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export const LoginForm = () => {
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
    } = useForm({ resolver: zodResolver(loginObject) })

    const onSubmit = async (
        field: LoginFields
    ) => startTransition(async () => {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: field.name,
                pass: field.pass
            } as LoginRequest)
        })

        if (response.status != 200) {
            setFocus("name")
            const data = await response.json() as LoginResponse
            setError("root.loginServerError", {
                type: "custom",
                message: data.message
            })
            return
        }

        queryClient.clear()
        router.push("/ice-creams")
        router.refresh()
    })

    const handleKeyDownName = () => {
        if (!!errors.root?.loginServerError) {
            clearErrors(["root.loginServerError"] as any)
        }
    }

    const haveVisibleErrors = !!errors.name || !!errors.pass
    const isAllFieldsDirty = dirtyFields.name && dirtyFields.pass
    const formSubmitEnable = (
        !haveVisibleErrors &&
        isAllFieldsDirty &&
        !isSubmitting &&
        !isPending
    )

    const errorMessages = [
        errors.name?.message,
        errors.pass?.message,
        errors.root?.loginServerError.message
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
                        <div className="focus-left">
                            <InputRow.Input
                                onKeyDown={handleKeyDownName}
                                placeholder="John Doe"
                                haveError={!!errors.name}
                                {...register("name")}
                            />
                        </div>
                    </InputRow.Label>
                    <InputRow.Label>
                        password
                        <div className="focus-left">
                            <InputRow.Input
                                type="password"
                                autoComplete="off"
                                placeholder="********"
                                haveError={!!errors.pass}
                                {...register("pass")}
                            />
                        </div>
                    </InputRow.Label>
                </div>
                <ButtonTitle
                    text="Login"
                    type="submit"
                    disabled={!formSubmitEnable}
                    isLoading={(isSubmitting || isPending)}
                    className="focus-right"
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
