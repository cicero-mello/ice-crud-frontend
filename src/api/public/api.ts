"use server"

import axios from "axios"

const baseURL = "http://localhost:8080"

export const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    }
})
