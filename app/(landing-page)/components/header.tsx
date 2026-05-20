"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState("")
    const pathname = usePathname()
    const isHome = pathname === "/"

    useEffect(() => {
        const session = localStorage.getItem("session")

        if (session) {
            const sessionData = JSON.parse(session)

            if (sessionData.isLoggedIn) {
                setUsername(sessionData?.username)
                setIsLoggedIn(true)
            }
        }

    }, [])

    const [keyword, setKeyword] = useState("")
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()

        if (!keyword.trim()) return

        return router.push(`/#${encodeURIComponent(keyword)}`)
    }

    const login = () => {
        window.location.href = "/auth/login"
    }

    const getLink = (hash: string) => {
        if (hash === "#") return isHome ? "#" : "/"
        return isHome ? hash : `/${hash}`
    }

    const renderMenuLink = (hash: string, label: string) => {
        const href = getLink(hash)
        if (isHome) {
            return (
                <Link href={href}>
                    <span>{label}</span>
                </Link>
            )
        }

        return (
            <a href={href}>
                <span>{label}</span>
            </a>
        )
    }

    return (
        <div>
            <header className="site-header header-transparent header mo-left">
                {/* <!-- main header --> */}
                <div className="sticky-header main-bar-wraper navbar-expand-lg">
                    <div className="main-bar clearfix ">
                        <div className="container clearfix">
                            {/* <!-- website logo --> */}
                            <div className="logo-header mostion">
                                <span className="dez-page"><img src="/dashboard/images/logo.png" alt="" /></span>
                            </div>
                            {/* <!-- nav toggle button --> */}
                            <button className="navbar-toggler collapsed navicon justify-content-end" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                            {/* <!-- extra nav --> */}
                            <div className="extra-nav">
                                <div className="extra-cell">
                                    <button onClick={login} className="btn outline radius-xl btn-sign btn-aware">{isLoggedIn ? username : "Login"} <span></span></button>
                                    <button id="quik-search-btn" type="button" className="btn-link btn-search text-secondry"><i className="fa fa-search"></i></button>
                                </div>
                            </div>
                            {/* <!-- Quik search --> */}
                            <div className="dlab-quik-search">
                                <form onSubmit={handleSearch}>
                                    <input
                                        name="search"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        placeholder="Type to search"
                                    />
                                    <span id="quik-search-remove"><i className="ti-close"></i></span>
                                </form>
                            </div>
                            {/* <!-- main nav --> */}
                            <div className="header-nav navbar-collapse collapse justify-content-end" id="navbarNavDropdown">
                                <div className="logo-header mostion">
                                    <span className="dez-page"><img src="/landingpage/images/logo.png" alt="" /></span>
                                </div>
                                <ul className="nav navbar-nav">
                                    <li>{renderMenuLink("#", "Home")}</li>
                                    <li>{renderMenuLink("#about", "About")}</li>
                                    <li>{renderMenuLink("#experience", "Experience")}</li>
                                    <li>{renderMenuLink("#features", "Features")}</li>
                                    <li>{renderMenuLink("#testimonials", "Testimonials")}</li>
                                    <li>{renderMenuLink("#projects", "Projects")}</li>
                                    <li>{renderMenuLink("#announcements", "Announcements")}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- main header END --> */}
            </header>
        </div>
    )
}
