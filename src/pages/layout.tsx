import dynamic from "next/dynamic"
import React from "react"
//import Navbar from "../components/Navbar"


function Layout({ children }: { children: React.ReactNode }) {
    const Navbar = dynamic(() => import('../components/Navbar'), {
        ssr: true
    })

    return (
        <div className="h-screen bg-slate-400">
            <Navbar />
            <div className="container my-16">
                {children}
            </div>
        </div>
    )
}

export default Layout