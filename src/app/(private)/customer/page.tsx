"use server"

import { CustomerInfo, DeleteAccountButton, LogoutButton } from "@/components/customer"

const CustomerSettings = async () => {
    return (
        <div className="flex flex-col gap-4 pt-10 items-center">
            <CustomerInfo />
            <LogoutButton />
            <DeleteAccountButton />
        </div>
    )
}

export default CustomerSettings
