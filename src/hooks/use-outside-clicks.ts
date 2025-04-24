"use client"

import { RefObject, useCallback, useEffect } from "react"

/**
 * Call a function when the user clicks outside **all** given refs.
 *
 * @param refs - Array of RefObjects to elements to ignore
 * @param callback - Function to call when clicked outside
 * @param disabled - Optional flag to disable the listener
 */
export const useOutsideClicks = (
    refs: RefObject<any>[],
    callback: () => void,
    disabled?: boolean
) => {
    const handleClick = useCallback(
        (event: MouseEvent) => {
            if (disabled) return

            const clickedInsideAny = refs.some(
                (ref) => ref.current && ref.current.contains(event.target)
            )

            if (!clickedInsideAny) {
                callback()
            }
        },
        [refs, callback, disabled]
    )

    useEffect(() => {
        document.addEventListener("mousedown", handleClick)

        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    }, [handleClick])
}
