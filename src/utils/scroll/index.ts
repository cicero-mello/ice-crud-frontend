/**
     * Disable scroll and return a function to enable scroll.
*/
export const disableScroll = (): () => void => {
    const scrollEvent = (event: Event) => {
        event.preventDefault()
        event.stopPropagation()
    }

    window.addEventListener("scroll", scrollEvent, { passive: false })
    window.addEventListener("wheel", scrollEvent, { passive: false })
    window.addEventListener("touchmove", scrollEvent, { passive: false })

    return () => {
        window.removeEventListener("scroll", scrollEvent)
        window.removeEventListener("wheel", scrollEvent)
        window.removeEventListener("touchmove", scrollEvent)
    }
}

export const scrollPageToTop = () => new Promise((resolve) => {
    if (window.scrollY <= 0) resolve(true)

    const enableScroll = disableScroll()
    let scrollLoopAnimationId: number

    const automaticScrollLoop = (resolve: (value: unknown) => void) => {
        let scrollStep = window.scrollY / 8
        if (scrollStep <= 2) scrollStep = 2
        window.scrollBy(0, -scrollStep)

        if (window.scrollY <= 0) {
            cancelAnimationFrame(scrollLoopAnimationId)
            enableScroll()
            resolve(true)
        }
        else scrollLoopAnimationId = requestAnimationFrame(
            () => automaticScrollLoop(resolve)
        )
    }

    automaticScrollLoop(resolve)
})