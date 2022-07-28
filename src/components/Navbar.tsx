import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useUserContext } from "../context/user.context"
import { trpc } from "../utils/trpc"

function Navbar() {


    const user = useUserContext()

    const router = useRouter()

    const { mutate, error } = trpc.useMutation(['users.logout-user'], {
        onSuccess: async () => {
            console.log("success?");
            console.log(user);

            router.reload()
        }
    })

    const handleLogout = () => {
        mutate()
    }


    return (
        <nav className="relative w-full flex flex-wrap items-center py-4 bg-slate-500 shadow-lg">
            <div className="w-full flex flex-wrap flex-row items-center px-6">
                <ul className="flex flex-grow flex-row pl-0 list-none w-auto justify-center">
                    <li className="text-gray-50 hover:text-green-100 focus:text-gray-700 p-2">
                        <Link className="" href="/">Home</Link>
                    </li>
                    <li className="text-gray-50 hover:text-green-100 focus:text-gray-700 p-2">
                        <Link className="" href="/posts">Blog</Link>
                    </li>
                    <li className="text-gray-50 hover:text-green-100 focus:text-gray-700 p-2">
                        <Link className="" href="/about">About</Link>
                    </li>
                    {user && <li className="text-gray-50 hover:text-green-100 focus:text-gray-700 p-2">
                        <Link className="" href="/posts/new">Create</Link>
                    </li>}
                    {user && <li className="text-gray-50 hover:text-green-100 focus:text-gray-700 p-2">
                        <button type="submit" onClick={handleLogout} className="bg-gray-200 border border-gray-100 rounded-md p-4 w-full my-3">Logout</button>
                    </li>}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar