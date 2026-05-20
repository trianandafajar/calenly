"use client"

import bcrypt from "bcryptjs"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function LoginPage() {

    useEffect(() => {
        const session = localStorage.getItem("session")
        if (session) {
            const sessionData = JSON.parse(session)
            if (sessionData.isLoggedIn) {
                window.location.href = "/dashboard"
            }
        }
    }, [])

    const [username, setUsername] = useState("admin")
    const [password, setPassword] = useState("password")
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        const storedUsers = localStorage.getItem("users")
        if (!storedUsers) {
            toast.error("User not found")
            return
        }

        const user = JSON.parse(storedUsers)

        const isMatch = await bcrypt.compare(password, user.password)

        const sessionId = crypto.randomUUID()

        if (user.username === username && isMatch) {
            localStorage.setItem("session", JSON.stringify({
                id: sessionId,
                username: user.username,
                isLoggedIn: true
            }))
            toast.success("Login successful")
            window.location.href = "/dashboard"
        } else {
            toast.error("Incorrect username or password")
        }
    }

    return (
        <div>
            <div className="fix-wrapper">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-6">
                            <div className="card mb-0 h-auto border-0 rounded-3xl" style={{ backdropFilter: "blur(20px)", background: "rgba(255, 255, 255, 0.96)", boxShadow: "0 20px 50px -15px rgba(136, 108, 192, 0.15), 0 0 0 1px rgba(136, 108, 192, 0.08)" }}>
                                <div className="card-body p-5">
                                    <div className="text-center mb-4">
                                        <Link href="/dashboard"><img className="logo-auth mb-2" src="/dashboard/images/lightlogo.png" alt="" /></Link>
                                    </div>
                                    <h4 className="text-center font-extrabold text-zinc-900 tracking-tight mb-4">Sign in your account</h4>
                                    <form onSubmit={handleLogin}>
                                        <div className="form-group mb-4">
                                            <label className="form-label font-bold text-xs uppercase tracking-wider text-zinc-500" htmlFor="username">Username</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-sm-4 mb-3 position-relative">
                                            <label className="form-label font-bold text-xs uppercase tracking-wider text-zinc-500" htmlFor="dlab-password">Password</label>
                                            <input placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} id="dlab-password" className="form-control" />
                                            <span className="show-pass eye" onClick={() => setShowPassword(!showPassword)}>
                                                <i className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                                            </span>
                                        </div>

                                        <div className="text-center mt-4">
                                            <button type="submit" className="btn btn-primary btn-block w-full py-3.5 flex items-center justify-center gap-2">
                                                Sign In <i className="fa fa-arrow-right text-xs"></i>
                                            </button>
                                        </div>
                                    </form>
                                    <div className="new-account mt-4 text-center">
                                        <p className="text-sm text-zinc-500">Don't have an account? <Link className="text-[#886CC0] font-bold hover:underline" href="register">Sign up</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
