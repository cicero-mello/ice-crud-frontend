import { knewave } from "@/fonts"

export const AddBallButton = () => {

    // TODO Api Integration

    return (
        <button
            aria-label="Add Ball"
            className={
                `${knewave.className} text-5xl text-linen w-fit h-fit ` +
                "self-center mt-[1.875rem] mb-[-1.875rem] focus-left"
            }
        >
            +
        </button>
    )
}
