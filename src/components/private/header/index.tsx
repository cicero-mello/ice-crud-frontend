"use server"

import Link from "next/link"

export const Header = async () => {

    return (
        <header
            className={
                "w-full flex justify-between p-3 " +
                "bg-gray-200 text-black"
            }
        >
            <Link
                href={"/"}
                children={"Logo"}
                className="underline"
            />
            <Link
                href={"/ice-creams"}
                children={"Ice Creams"}
                className="text-nowrap underline"
            />
            <Link
                href={"/customer"}
                children={"Profile"}
                className="underline"
            />
        </header>
    )
}
