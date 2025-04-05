"use server"

import { CreateAccountForm } from "./create-account-form"

const CreateAccount = () => {

    return (
        <main className="items-center flex flex-col">
            <h1> Create Account </h1>
            <CreateAccountForm />
        </main>
    )
}

export default CreateAccount
