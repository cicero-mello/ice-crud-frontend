"use server"

import { CustomerInfo, DeleteAccountButton, LogoutButton } from "@/components/customer"

const CustomerSettings = async () => {
    return (
        <main className="flex flex-col gap-4 pt-10 items-center">
            <CustomerInfo />
            <LogoutButton />
            <DeleteAccountButton />
        </main>
    )
}

export default CustomerSettings
