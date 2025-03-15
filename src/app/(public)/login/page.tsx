"use server"

import { LoginForm } from "./(form)/login-form"

const Login = () => {

    console.log("Page Re-render")

    return (
        <div className="items-center flex flex-col">
            <h1> Login </h1>
            <LoginForm />
        </div>
    )
}

export default Login
