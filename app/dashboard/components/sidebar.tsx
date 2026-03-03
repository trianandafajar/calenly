"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
    const pathname = usePathname()

    const menus = [
        { name: "Dashboard", icon: "fas fa-home", href: "/dashboard" },
        { name: "Project", icon: "fas fa-folder", href: "/dashboard/projects" },
        { name: "Contacts", icon: "fas fa-address-book", href: "/dashboard/contacts" },
        { name: "Kanban", icon: "fas fa-columns", href: "/dashboard/kanban" },
        { name: "Calendar", icon: "fas fa-calendar", href: "/dashboard/calendar" },
        { name: "Blog", icon: "fas fa-blog", href: "/dashboard/blogs" }
    ]

    return (
        <div className="dlabnav">
            <div className="dlabnav-scroll">

                <ul className="metismenu" id="menu">
                    {menus.map((menu) => (
                        <li
                            key={menu.name}
                            className={pathname === menu.href ? "mm-active" : ""}
                        >
                            <Link href={menu.href}>
                                <i className={menu.icon}></i>
                                <span className="nav-text">{menu.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* PROFILE */}
                {/* <div className="side-bar-profile">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <div className="side-bar-profile-img">
                            <img src="/dashboard/images/user.jpg" alt="User" />
                        </div>

                        <div className="profile-info1">
                            <h5>Levi Siregar</h5>
                            <span>leviregar@mail.com</span>
                        </div>

                        <div className="profile-button">
                            <i className="fas fa-caret-down text-light"></i>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between mb-2 progress-info">
                        <span className="fs-12">
                            <i className="fas fa-star text-orange me-2"></i>
                            Task Progress
                        </span>
                        <span className="fs-12">20/45</span>
                    </div>

                    <div className="progress default-progress">
                        <div
                            className="progress-bar bg-gradientf progress-animated"
                            style={{ width: "45%", height: "8px" }}
                            role="progressbar"
                        >
                            <span className="sr-only">45% Complete</span>
                        </div>
                    </div>
                </div> */}

                {/* COPYRIGHT */}
                {/* <div className="copyright">
                    <p>Fillow Saas Admin © 2023 All Rights Reserved</p>
                    <p className="fs-12">
                        Made with <span className="heart"></span> by DexignLab
                    </p>
                </div> */}

            </div>
        </div>
    )
}