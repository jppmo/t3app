import dynamic from "next/dynamic"
import React from "react"


function Layout({ children }: { children: React.ReactNode }) {
    const Navbar = dynamic(() => import('../components/Navbar'), {
        ssr: false
    })

    return (
        <div className="h-screen">
            <Navbar />
            <div className="container my-16">
                {children}
            </div>
        </div>
    )
}

export default Layout