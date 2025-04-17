import { EditAccountButtonProps } from "./types"

export const EditAccountButton = ({
    className = ""
}: EditAccountButtonProps) => {

    return (
        <>
            <button
                className={
                    className +
                    " button-moss"
                }
            >
                Edit Account
            </button>
        </>
    )
}
