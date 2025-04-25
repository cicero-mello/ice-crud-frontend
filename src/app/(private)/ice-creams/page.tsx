"use client"

import { GetCustomerIceCreamsResponse } from "@/app/api/get-customer-ice-creams/types"
import { CreateIceCreamButton, IceCreamCard } from "@/components/ice-creams"
import { useQuery } from "@tanstack/react-query"

const IceCreams = () => {
    const { data, isFetching } = useQuery({
        queryKey: ["get-customer-ice-creams"],
        staleTime: Infinity,
        queryFn: async () => {
            const response = await fetch("/api/get-customer-ice-creams", {
                method: "GET"
            })
            return await response.json() as GetCustomerIceCreamsResponse
        }
    })

    const iceCreams = data?.iceCreams ?? []
    const haveIceCreams = iceCreams.length > 0

    return (
        <main className={
            "flex flex-col flex-1 p-6 pt-8 " +
            "self-center max-w-6xl w-full"
        }
        >
            {isFetching && (
                <div className="spinner mt-20" />
            )}
            {!isFetching && !haveIceCreams && (
                <>
                    <p
                        children="You don't have any Ice Creams"
                        className={
                            "mt-10 self-center text-2xl text-center p-6 fade-in"
                        }
                    />
                    <CreateIceCreamButton
                        text="Create Now!"
                        className={
                            "w-fit self-center focus-bottom " +
                            "transform: scale-[90%] fade-in"
                        }
                    />
                </>
            )}
            {!isFetching && haveIceCreams && (
                <>
                    <header className={
                        "flex w-full justify-between items-center " +
                        "mb-10 mt-2 fade-in"
                    }>
                        <p className="text-xl text-stroke-1-stone">
                            You have {iceCreams.length} Ice Creams:
                        </p>
                        <CreateIceCreamButton
                            text="Create Ice Cream"
                            className={
                                "focus-left fade-in " +
                                "transform: scale-[76%] origin-right"
                            }
                        />
                    </header>
                    <ul
                        className={
                            "flex flex-wrap pt-4 justify-center " +
                            "gap-x-10 gap-y-16 pb-8 fade-in"
                        }
                    >
                        {iceCreams.toReversed().map(iceCream => (
                            <IceCreamCard
                                key={`icc-${iceCream.id}`}
                                id={iceCream.id}
                                name={iceCream.name}
                                balls={iceCream.balls.map(({ flavor }) => flavor)}
                                baseType={iceCream.baseType}
                            />
                        ))}
                    </ul>
                </>
            )}
        </main>
    )
}

export default IceCreams
