"use client"

import { IceCream, InputRow, RadioImage, SelectRow } from "@/components"
import { CreateIceCreamFields, createIceCreamObject } from "@/zod/create-ice-cream"
import { CreateIceCreamRequest } from "@/app/api/create-ice-cream/types"
import { BallFlavor, IceCreamBaseType, Size } from "@/enums"
import { bgByBaseType } from "@/components/ice-cream/core"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateIceCreamButtonProps } from "./types"
import { useEffect, useRef, useState } from "react"
import { useOutsideClicks } from "@/hooks"
import { radioImageItems } from "./core"
import { kleeOne, knewave } from "@/fonts"
import { colors } from "@/utils/js-styles"
import { useQueryClient } from "@tanstack/react-query"
import { scrollPageToTop } from "@/utils/scroll"
import { delay } from "@/utils/delay"

export const CreateIceCreamButton = ({
    className = "",
    text,
}: CreateIceCreamButtonProps) => {
    const buttonCreateRef = useRef<HTMLButtonElement>(null)
    const dialogRef = useRef<HTMLDialogElement>(null)
    const scrollableFormDivRef = useRef<HTMLDivElement>(null)
    const scrollableIceCreamDivRef = useRef<HTMLDivElement>(null)

    const queryClient = useQueryClient()

    const [
        radioImageCheckedIndexDefault,
        setRadioImageCheckedIndexDefault
    ] = useState<number | undefined>(undefined)

    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        setValue,
        setFocus,
        setError,
        clearErrors,
        formState: { errors, isSubmitting }
    } = useForm<any>({
        resolver: zodResolver(createIceCreamObject)
    })
    const { fields, remove, append } = useFieldArray({
        name: "balls",
        control: control
    })

    const balls = watch("balls") as string[]
    const base = watch("base")

    const closeDialog = () => {
        dialogRef.current?.close()
        reset()
        remove()
        setRadioImageCheckedIndexDefault(undefined)
        setTimeout(() => {
            setValue("base", "0")
        }, 100)
    }

    const openDialog = () => {
        dialogRef.current!.showModal()
        setRadioImageCheckedIndexDefault(0)
    }

    const scrollIceCreamToTop = () => {
        scrollableIceCreamDivRef.current?.scrollTo({
            top: -scrollableIceCreamDivRef.current.scrollHeight,
            behavior: "smooth"
        })
    }

    const scrollIceCreamToBottom = () => {
        scrollableIceCreamDivRef.current?.scrollTo({
            top: scrollableIceCreamDivRef.current.scrollHeight,
            behavior: "smooth"
        })
    }

    const scrollFormToBottom = () => {
        scrollableFormDivRef.current?.scrollTo({
            top: scrollableFormDivRef.current.scrollHeight,
            behavior: "smooth"
        })
    }

    const handleAddBall = () => {
        append("" + Math.floor(Math.random() * 4), {
            shouldFocus: true
        })
        setTimeout(() => {
            scrollFormToBottom()
            scrollIceCreamToTop()
        }, 120)
    }

    const onSubmit = async ({
        balls, base, name
    }: CreateIceCreamFields) => {
        const cone = +base === IceCreamBaseType.Cone ? {
            color: colors.moss,
            size: Size.Medium
        } : undefined

        const cup = +base === IceCreamBaseType.Cup ? {
            size: Size.Medium
        } : undefined

        const response = await fetch("/api/create-ice-cream", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name, cone, cup,
                balls: balls.map(item => ({
                    flavor: +item,
                    size: Size.Medium
                })).toReversed()
            } as CreateIceCreamRequest)
        })

        const data = await response.json()

        if (response.status !== 201) {
            setError("root.createIceCreamServerError", {
                type: "custom",
                message: data.message
            })
            setFocus("name", { shouldSelect: true })
            return
        }

        await queryClient.invalidateQueries({
            queryKey: ["get-customer-ice-creams"]
        })

        await Promise.all([
            scrollPageToTop(),
            delay(500)
        ])

        closeDialog()
    }

    const onKeyDownInputName = () => {
        if (!!errors.root?.createIceCreamServerError) {
            clearErrors(["root.createIceCreamServerError"] as any)
        }
    }

    useEffect(() => {
        scrollIceCreamToBottom()
    }, [base])

    useOutsideClicks([
        scrollableFormDivRef,
        scrollableIceCreamDivRef,
        buttonCreateRef
    ], closeDialog)

    const errorMessages: string[] = [
        errors.name?.message as string,
        errors.balls?.message as string,
        errors.base?.message as string,
        errors.root?.createIceCreamServerError.message
    ].filter(item => item != undefined)

    return (
        <>
            <button
                children={text}
                onClick={openDialog}
                className={className + " button-moss-s"}
            />
            <dialog
                ref={dialogRef}
                className={
                    "backdrop:bg-mud backdrop:opacity-93 " +
                    "self-center justify-self-center bg-transparent " +
                    "w-full h-full outline-none"
                }
            >
                <section className={
                    "flex w-full h-full justify-center items-center " +
                    " gap-16"
                }>
                    <div
                        tabIndex={-1}
                        ref={scrollableIceCreamDivRef}
                        style={{ backgroundColor: bgByBaseType.get(+base) }}
                        className={
                            "flex w-100 max-h-[68svh] outline-none " +
                            " rounded-xl overflow-y-auto py-10 mb-16 " +
                            "scrollbar-transparent border-8 border-linen " +
                            "overflow-x-hidden"
                        }
                    >
                        <IceCream
                            balls={balls?.map(ball => +ball).toReversed() ?? []}
                            base={base ? + base : 0}
                        />
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col max-w-115 w-full"
                    >
                        <div
                            ref={scrollableFormDivRef}
                            className={
                                "flex flex-col bg-linen " +
                                "py-10 pt-9 px-15 rounded-xl h-fit " +
                                "items-center relative " +
                                "max-h-[71svh] scrollbar-1"
                            }
                        >
                            <div className="absolute top-2 right-6">
                                <button
                                    children="✖"
                                    type="button"
                                    aria-label="Close Dialog"
                                    onClick={closeDialog}
                                    className={
                                        "cursor-pointer self-end items-end mr-[-0.5rem] " +
                                        "text-xl focus-left text-stone " +
                                        "focus-within:text-taupe "
                                    }
                                />
                            </div>
                            <h1 className={
                                knewave.className +
                                " text-taupe text-3xl text-center"
                            }>
                                New Ice Cream
                            </h1>
                            <InputRow.Label className={
                                "flex flex-row max-w-[unset] " +
                                "justify-between w-full focus-left mt-10 gap-7"
                            }>
                                name:
                                <InputRow.Input
                                    haveError={!!errors?.name}
                                    placeholder="Made in Heaven"
                                    className="max-w-full pt-0 w-full"
                                    onKeyDown={onKeyDownInputName}
                                    {...register("name")}
                                />
                            </InputRow.Label>
                            <RadioImage
                                formRegister={register("base")}
                                label="base:"
                                items={radioImageItems}
                                defaultCheckedIndex={radioImageCheckedIndexDefault}
                                className={
                                    "flex-row items-center mt-10 " +
                                    "w-full gap-[2.2rem] focus-left focus-color-taupe"
                                }
                            />
                            <div className="flex flex-col gap-4 mt-10 w-full">
                                {fields.map((field, index) => (
                                    <div className="flex gap-2" key={field.id}>
                                        <SelectRow.Label className={
                                            "focus-left select-none"
                                        }>
                                            ball:
                                            <SelectRow.Select
                                                {...register(`balls.${index}`)}
                                            >
                                                <SelectRow.Option
                                                    children="chocolate"
                                                    value={"" + BallFlavor.Chocolate}
                                                />
                                                <SelectRow.Option
                                                    children="vanilla"
                                                    value={"" + BallFlavor.Vanilla}
                                                />
                                                <SelectRow.Option
                                                    children="grape"
                                                    value={"" + BallFlavor.Grape}
                                                />
                                                <SelectRow.Option
                                                    children="strawberry"
                                                    value={"" + BallFlavor.Strawberry}
                                                />
                                            </SelectRow.Select>
                                        </SelectRow.Label>
                                        <div className="focus-right h-full text-taupe">
                                            <button
                                                children="-"
                                                type="button"
                                                aria-label="Remove Ball"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    remove(index)
                                                    scrollableIceCreamDivRef.current?.scrollTo({
                                                        top: -scrollableIceCreamDivRef.current.scrollHeight,
                                                        behavior: "smooth"
                                                    })
                                                }}
                                                className={
                                                    className + " " + knewave.className +
                                                    " hover:opacity-100 focus:opacity-100 " +
                                                    "transition duration-100 " +
                                                    "px-3 py-1 rounded-lg text-xl " +
                                                    "bg-rust opacity-50 text-linen " +
                                                    "text-center items-center justify-center " +
                                                    "cursor-pointer select-none"
                                                }
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    children="Add Ball +"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleAddBall()
                                    }}
                                    className={
                                        "button-moss text-lg " +
                                        "focus-left focus-color-taupe " +
                                        "w-fit self-center mt-4 select-none"
                                    }
                                />
                            </div>
                        </div>
                        <button
                            ref={buttonCreateRef}
                            tabIndex={errorMessages.length > 0 ? -1 : 0}
                            disabled={errorMessages.length > 0 || isSubmitting}
                            className={
                                `disabled:cursor-[unset] ` +
                                "button-moss mt-4 min-h-[3.125rem] min-w-[7.375rem] " +
                                "focus-left select-none flex items-center" +
                                " self-center"
                            }
                            style={{
                                backgroundColor: errorMessages.length > 0 ? colors.rust : colors.moss,
                                borderColor: errorMessages.length > 0 ? colors.rust : colors.linen
                            }}
                        >
                            {isSubmitting && <div className="spinner spinner-linen mx-auto w-fit" />}
                            {!isSubmitting && errorMessages.length === 0 && "Create"}
                            {!isSubmitting && errorMessages.length > 0 && (
                                <ul className="list-disc pl-4">
                                    {errorMessages.map((message, index) => (
                                        <li
                                            key={`em-cic-${index}`}
                                            children={message}
                                            className={`${kleeOne.className} text-base`}
                                        />
                                    ))}
                                </ul>
                            )}
                        </button>
                    </form>
                </section>
            </dialog >
        </>
    )
}
