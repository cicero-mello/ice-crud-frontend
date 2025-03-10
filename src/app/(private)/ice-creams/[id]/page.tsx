"use client"

import { useParams } from "next/navigation"

const IceCream = () => {
    const { id } = useParams<{ id: string }>()

    return (
        <div>
            IceCreamId: {id}
        </div>
    )
}

export default IceCream
