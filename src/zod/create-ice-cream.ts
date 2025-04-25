"use client"

import { noScriptPattern } from "./regex"
import { z } from "zod"

export const iceCreamNameZod = z
    .string({ message: "Name must be string" })
    .min(1, { message: "Name must have at least 1 char" })
    .max(32, { message: "Name exceed max length (32)" })
    .regex(noScriptPattern, {
        message: "Name has a suspicious script pattern"
    })

export const createIceCreamObject = z.object({
    name: iceCreamNameZod,
    balls: z
        .array(z.string({
            message: "Invalid Balls! 1"
        }))
        .refine((arr) => arr.every(str => !isNaN(+str)), {
            message: "Invalid Balls! 2"
        })
        .refine((arr) => arr.every(str => !(+str < 0 || +str > 3)), {
            message: "Invalid Balls! 3"
        }),
    base: z
        .string({ message: "Invalid Base!" })
        .refine(value => !isNaN(+value), {
            message: "Invalid Base!"
        })
        .refine(value => !(+value < 0 || +value > 1), {
            message: "Invalid Base!"
        })
})

export type CreateIceCreamFields = z.infer<typeof createIceCreamObject>
