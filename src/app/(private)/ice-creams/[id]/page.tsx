"use client"

import { AddBallButton, DeleteIceCreamButton, Header } from "@/components/ice-cream-page"
import { GetIceCreamResponse } from "@/app/api/get-ice-cream/types"
import { IceCream, ArrowReturnSVG, EditSVG } from "@/components"
import { bgByBaseType } from "@/components/ice-cream/core"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useState } from "react"

const IceCreamPage = () => {
    const [isEditMode, setIsEditMode] = useState(false)

    const { id } = useParams<{ id: string }>()
    const { data } = useQuery({
        queryKey: [`get-ice-cream-${id}`],
        queryFn: async () => {
            const result = await fetch(
                `/api/get-ice-cream?iceCreamId=${id}`, {
                method: "GET"
            })
            return await result.json() as GetIceCreamResponse
        }
    })

    if (!data) return (
        <main className="flex flex-1 justify-center align-center">
            <div className="spinner" />
        </main>
    )

    return (
        <main className={
            "fade-in flex flex-1 max-w-7xl w-full h-full " +
            "justify-center items-center self-center relative"
        }>
            <div className={
                "flex flex-col absolute w-30 mt-9 " +
                "h-[80svh] right-0 gap-4 pl-4"
            }>
                {isEditMode && (
                    <button
                        type="button"
                        aria-label="Exit from Edit Mode"
                        onClick={() => setIsEditMode(false)}
                        children={<ArrowReturnSVG />}
                        className={
                            "bg-line w-fit bg-linen p-1 " +
                            "border-5 border-stone rounded-xl " +
                            "focus-top text-linen"
                        }
                    />
                )}
                {!isEditMode && (<>
                    <button
                        type="button"
                        aria-label="Enter on Edit Mode"
                        onClick={() => setIsEditMode(true)}
                        children={<EditSVG />}
                        className={
                            "bg-line w-fit bg-linen p-2 " +
                            "border-5 border-stone rounded-xl " +
                            "focus-top text-linen"
                        }
                    />
                    <DeleteIceCreamButton iceCreamId={id} />
                </>)}
            </div>
            <div
                className={
                    "border-10 border-linen rounded-2xl " +
                    "overflow-y-scroll overflow-x-hidden " +
                    "w-full h-[80svh] scrollbar-2 mx-30 flex flex-col "
                }
                style={{
                    backgroundColor: bgByBaseType.get(data.iceCream.baseType),
                }}
            >
                <Header
                    iceCreamId={id}
                    editMode={isEditMode}
                    iceCreamName={data.iceCream.name}
                    ballsNumber={data.iceCream.balls.length}
                />
                {isEditMode && <AddBallButton iceCreamId={id} />}
                <div className="flex flex-1 my-12 items-center">
                    <IceCream
                        flavors={data.iceCream.balls.map(({ flavor }) => flavor)}
                        balls={data.iceCream.balls}
                        base={data.iceCream.baseType}
                        editMode={isEditMode}
                        iceCreamId={id}
                        withText
                    />
                </div>
            </div>
        </main>
    )
}

export default IceCreamPage
