"use server"

import { Header } from "@/components/private"

const PrivateRouteLayout = (
    { children }: Readonly<{ children: React.ReactNode}>
) => {

    return (
        <>
            <Header />
            <main> {children} </main>
        </>
    )
}

export default PrivateRouteLayout
