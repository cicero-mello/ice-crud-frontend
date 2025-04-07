"use client"

import { MouseEvent } from "react"

export const onClickBackdrop = (
    event: MouseEvent<HTMLDialogElement>,
    onClick: () => void | Promise<void>
) => {
    const element = event.currentTarget as HTMLElement
    const rect = element.getBoundingClientRect()
    const isClickInBackdrop = (
        rect.left > event.clientX ||
        rect.right < event.clientX ||
        rect.top > event.clientY ||
        rect.bottom < event.clientY
    )

    if (isClickInBackdrop) {
        onClick()
    }
}
