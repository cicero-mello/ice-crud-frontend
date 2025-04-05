"use server"

import { LoginForm } from "./login-form"

const Login = async () => {

    return (
        <main className="items-center flex flex-col">
            <h1> Login </h1>
            <LoginForm />
        </main>
    )
}

export default Login
