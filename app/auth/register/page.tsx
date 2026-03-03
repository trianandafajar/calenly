import type { Metadata } from "next"
import RegisterPage from "@/app/dashboard/components/auth/register"

export const metadata: Metadata = {
  title: "Register Page",
  description: "Authentication Page",
}

export default function page() {
  return <RegisterPage />
}
