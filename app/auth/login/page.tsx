import type { Metadata } from "next"
import LoginPage from "@/app/dashboard/components/auth/login"

export const metadata: Metadata = {
    title: "Login Page",
    description: "Authentication Page",
}

export default function login() {
    return <LoginPage />
}
