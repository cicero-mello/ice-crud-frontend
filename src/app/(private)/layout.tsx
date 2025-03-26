"use server"

import { PrivateHeader } from "@/components"

const PrivateRouteLayout = (
    { children }: Readonly<{ children: React.ReactNode}>
) => {

    return (
        <>
            <PrivateHeader />
            <main> {children} </main>
        </>
    )
}

export default PrivateRouteLayout
