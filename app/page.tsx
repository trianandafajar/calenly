"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function page() {
    useEffect(() => {
         window.location.href = "/landing-page"
    }, [])
}
