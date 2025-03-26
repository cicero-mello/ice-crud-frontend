"use server"

import { PublicHeader, PrivateHeader } from "@/components"
import { getCookiesLogin } from "@/utils/cookies"

const PublicRouteLayout = async (
    { children }: Readonly<{ children: React.ReactNode }>
) => {
    const { accessToken } = await getCookiesLogin()
    console.log(accessToken)

    return (
        <>
            {!!accessToken ? <PrivateHeader/> : <PublicHeader />}
            <main> {children} </main>
        </>
    )
}

export default PublicRouteLayout
