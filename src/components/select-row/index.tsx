import {
    LabelHTMLAttributes,
    OptionHTMLAttributes,
    SelectHTMLAttributes
} from "react"

const Label = ({
    className = "",
    ...rest
}: LabelHTMLAttributes<HTMLLabelElement>) => (
    <label
        {...rest}
        className={
            className +
            " flex text-center gap-4 relative " +
            "text-taupe text-2xl w-full "
        }
    />
)

const Select = ({
    className = "",
    ...rest
}: SelectHTMLAttributes<HTMLSelectElement>) => (
    <>
        <select
            {...rest}
            className={
                className +
                " flex appearance-none outline-none " +
                "border-b-[0.1875rem] border-b-dune " +
                " text-taupe text-xl max-w-60 w-full " +
                " cursor-pointer text-ellipsis pl-2 pr-6 pb-1"
            }
        />
        <span
            children="┘"
            className={
                "absolute right-1 top-1 " +
                "text-stroke-2-dune text-dune text-lg " +
                "transform: rotate-45 pointer-events-none"
            }
        />
    </>
)

const Option = ({
    className = "",
    ...rest
}: OptionHTMLAttributes<HTMLOptionElement>) => (
    <option
        {...rest}
        className={
            className +
            " text-taupe bg-linen " +
            "text-2xl "
        }
    />
)

export const SelectRow = {
    Select,
    Label,
    Option
}
