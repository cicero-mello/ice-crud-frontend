"use server"

import { Header as PublicHeader } from "@/components/public"
import { Header as PrivateHeader } from "@/components/private"
import { getCookiesLogin } from "@/utils/cookies"

const PublicRouteLayout = async (
    { children }: Readonly<{ children: React.ReactNode }>
) => {
    const { accessToken } = await getCookiesLogin()

    return (
        <>
            {!!accessToken ? <PrivateHeader/> : <PublicHeader />}
            <main> {children} </main>
        </>
    )
}

export default PublicRouteLayout
