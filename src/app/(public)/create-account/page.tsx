"use server"

import { CreateAccountForm } from "./create-account-form"

const CreateAccount = () => {

    return (
        <main className={
            "flex flex-col items-center justify-center " +
            "flex-1 pb-24"
        }>
            <CreateAccountForm />
        </main>
    )
}

export default CreateAccount
