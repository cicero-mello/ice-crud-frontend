"use client"

import { noScriptPattern } from "./regex"
import { z } from "zod"

export const deleteCustomerObject = z.object({
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
        })
})

export type DeleteCustomerFields = z.infer<typeof deleteCustomerObject>
