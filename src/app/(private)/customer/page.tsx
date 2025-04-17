"use server"

import { CustomerInfo, DeleteAccountButton, EditAccountButton, LogoutButton } from "@/components/customer"

const Customer = async () => {
    return (
        <main
            className={
                "flex flex-1 items-center justify-center " +
                "gap-12 p-10 pb-24 flex-wrap"
            }
        >
            <CustomerInfo />
            <div className="grid grid-rows-2 gap-5">
                <EditAccountButton
                    className="row-start-1 col-span-2 w-fit focus-right"
                />
                <LogoutButton
                    className="row-start-2 w-fit focus-bottom"
                />
                <DeleteAccountButton
                    className="row-start-2 w-fit focus-bottom"
                />
            </div>
        </main>
    )
}

export default Customer
