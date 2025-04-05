"use server"

import { PrivateHeader } from "@/components"

const PrivateRouteLayout = (
    { children }: Readonly<{ children: React.ReactNode }>
) => {

    return (
        <>
            <PrivateHeader />
            {children}
        </>
    )
}

export default PrivateRouteLayout
