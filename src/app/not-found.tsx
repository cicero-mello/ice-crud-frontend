import { knewave } from "@/fonts"
import Link from "next/link"

const NotFound = () => {
    return (
        <main
            className={
                "flex flex-1 items-center justify-center " +
                "flex-col gap-20"
            }
        >
            <h1 className={`text-9xl ${knewave.className}`}>
                404
            </h1>
            <Link
                href="/"
                className="button-moss"
            >
                RETURN
            </Link>
        </main>
    )
}

export default NotFound
