import React from "react"
import Navbar from "../components/Navbar"


function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto max-w-md my-16">
                {children}
            </div>
        </div>
    )
}

export default Layout