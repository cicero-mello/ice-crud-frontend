"use server"

import Link from "next/link"

export const PublicHeader = async () => {

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
            <div className="flex gap-4">
                <Link
                    href={"/login"}
                    children={"Login"}
                    className="underline"
                />
                /
                <Link
                    href={"/create-account"}
                    children={"Create Account"}
                    className="underline text-nowrap"
                />
            </div>
        </header>
    )
}
