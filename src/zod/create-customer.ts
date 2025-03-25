"use client"

import { Avatar } from "@/enums"
import { noScriptPattern, usernameSpecialCharacters } from "./regex"
import { z } from "zod"

export const createCustomerObject = z.object({
    name: z
        .string({ message: "Name must be string" })
        .min(1, { message: "Name must have at least 1 char" })
        .max(32, { message: "Name exceed max length (32)" })
        .regex(usernameSpecialCharacters, {
            message:
                "You can't use special characters" +
                " (except '-', '.' and space between letters)"
        })
        .regex(noScriptPattern, {
            message: "Name has a suspicious script pattern"
        }),
    pass: z
        .string({ message: "Password must be string" })
        .min(8, {
            message: "Password need to have at least 8 characters"
        })
        .max(32, {
            message: "Password exceed max length (32)"
        })
        .regex(noScriptPattern, {
            message: "Password has a suspicious script pattern"
        }),
    avatar: z
        .number({ message: "Invalid Avatar" })
        .min(0, { message: "Invalid Avatar" })
        .max(Avatar.YoungMan, { message: "Invalid Avatar" })
})

export type CreateCustomerFields = z.infer<typeof createCustomerObject>
