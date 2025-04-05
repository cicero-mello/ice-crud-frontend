"use server"

import { PublicHeader, PrivateHeader } from "@/components"
import * as serverCookies from "@/utils/server-cookies"

const PublicRouteLayout = async (
    { children }: Readonly<{ children: React.ReactNode }>
) => {
    const { accessToken } = await serverCookies.getCookiesLogin()

    return (
        <>
            {!!accessToken ? <PrivateHeader /> : <PublicHeader />}
            {children}
        </>
    )
}

export default PublicRouteLayout
