"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function SidebarAutoClose() {
    const pathname = usePathname()

    useEffect(() => {
        const mainWrapper = document.getElementById("main-wrapper")

        if (mainWrapper) {
            mainWrapper.classList.remove("menu-toggle")
        }

        document.body.classList.remove("menu-toggle")

    }, [pathname])

    return null
}
