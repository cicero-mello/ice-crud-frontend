"use server"

import { DeleteAccountButton, LogoutButton } from "@/components/customer"

const CustomerSettings = () => {

    return (
        <div className="flex flex-col gap-4 pt-10 items-center">
            <LogoutButton />
            <DeleteAccountButton />
        </div>
    )
}

export default CustomerSettings
