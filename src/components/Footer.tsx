import Link from "next/link"

function Footer() {
    return (
        <footer className="h-20">
            <nav className="p-0 m-0 flex min-h-full justify-center items-center bg-slate-500">
                <ul className="flex flex-row justify-center gap-20 h-auto">
                    <li className="hover:text-green-100 focus:text-gray-700 p-2">Made by <Link href="https://joaoliveira.com/">João Oliveira</Link></li>
                    <li className="hover:text-green-100 focus:text-gray-700 p-2"><Link href="https://github.com/jppmo">Github</Link></li>
                </ul>
            </nav>
        </footer>
    )
}

export default Footer
