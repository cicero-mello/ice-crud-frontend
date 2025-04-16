"use server"

import { LoginForm } from "./login-form"

const Login = async () => {

    return (
        <main className={
            "flex flex-col items-center justify-center " +
            "flex-1 pb-24"
        }>
            <LoginForm />
        </main >
    )
}

export default Login
