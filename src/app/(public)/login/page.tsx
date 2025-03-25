"use server"

import { LoginForm } from "./login-form"

const Login = async () => {

    return (
        <div className="items-center flex flex-col">
            <h1> Login </h1>
            <LoginForm />
        </div>
    )
}

export default Login
