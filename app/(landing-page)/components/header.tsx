"use client"

import { ro } from "date-fns/locale"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Header() {
    const [keyword, setKeyword] = useState("")
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()

        if (!keyword.trim()) return

        return router.push(`/#${encodeURIComponent(keyword)}`)
    }

    const signup = () => {
        router.push("/auth/register")
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
                                    <button onClick={signup} className="btn outline radius-xl btn-sign btn-aware">Sign up <span></span></button>

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
                                    <li><a href="#"><span>Home</span></a></li>
                                    {/* <li><a href="#services"><span>Services</span></a></li> */}
                                    <li><a href="#about"><span>About</span></a></li>
                                    <li><a href="#experience"><span>Experience</span></a></li>
                                    <li><a href="#features"><span>Features</span></a></li>
                                    <li><a href="#testimonials"><span>Testimonials</span></a></li>
                                    <li><a href="#projects"><span>Projects</span></a></li>
                                    <li><a href="#announcements"><span>Announcements</span></a></li>
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
