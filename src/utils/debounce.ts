type CallbackFunction = (...params: any[]) => void
type DebouncedFunction<T extends CallbackFunction> = (...params: Parameters<T>) => void

/**
 * Creates a debounced function based in a callback function.
 * @param callbackFunction function with no return that you want to avoid multiple calls
 * @param delay time to await another call before execute the callback
 * @returns a debounced version of the callback function
 */
export const debounce = <T extends CallbackFunction>(
    callbackFunction: T, delay: number
): DebouncedFunction<T> => {
    let timeoutId: ReturnType<typeof setTimeout>

    const debouncedFunction = (...params: Parameters<T>) => {
        if (timeoutId) clearTimeout(timeoutId)

        timeoutId = setTimeout(() => {
            callbackFunction(...params)
        }, delay)
    }

    return debouncedFunction
}
