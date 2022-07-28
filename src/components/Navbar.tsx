import Link from "next/link"

function Navbar() {
    return (
        <nav className="relative w-full flex flex-wrap items-center py-4 bg-gray-100 shadow-lg">
            <div className="w-full flex flex-wrap flex-row items-center px-6">
                <ul className="flex flex-grow flex-row pl-0 list-none w-auto justify-center">
                    <li className="p-2">
                        <Link className="" href="/">Home</Link>
                    </li>
                    <li className="text-gray-500 hover:text-red-500 focus:text-gray-700 p-2">
                        <Link className="" href="/">Blog</Link>
                    </li>
                    <li className="text-gray-500 hover:text-red-500 focus:text-gray-700 p-2">
                        <Link className="" href="/">About</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar