"use server"

import {
    IceCreamList,
    CreateIceCreamButton
} from "@/components/ice-creams"

const IceCreams = () => {

    return (
        <main>
            <CreateIceCreamButton />
            <h1>Ice Creams: </h1>
            <IceCreamList />
        </main>
    )
}

export default IceCreams
