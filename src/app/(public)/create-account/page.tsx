"use server"

import { CreateAccountForm } from "./(form)"

const CreateAccount = () => {

    return (
        <div className="items-center flex flex-col">
            <h1> Create Account </h1>
            <CreateAccountForm />
        </div>
    )
}

export default CreateAccount
