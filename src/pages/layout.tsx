import dynamic from "next/dynamic"
import React from "react"
import Footer from "../components/Footer"


function Layout({ children }: { children: React.ReactNode }) {
    const Navbar = dynamic(() => import('../components/Navbar'), {
        ssr: false
    })

    return (
        <div className="h-screen clear-both">
            <Navbar />
            <div className="my-16 min-h-full overflow-x-hidden">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout