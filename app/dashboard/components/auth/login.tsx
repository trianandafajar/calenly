"use client"

import bcrypt from "bcryptjs"
import Link from "next/link"
import { useEffect, useState } from "react"

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
            alert("User tidak ditemukan")
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
            alert("Login berhasil")
            window.location.href = "/dashboard"
        } else {
            alert("Username atau password salah")
        }
    }

    return (
        <div>
            <div className="fix-wrapper">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-6">
                            <div className="card mb-0 h-auto">
                                <div className="card-body">
                                    <div className="text-center mb-3">
                                        <Link href="/dashboard"><img className="logo-auth" src="/dashboard/images/lightlogo.png" alt="" /></Link>
                                    </div>
                                    <h4 className="text-center mb-4">Sign in your account</h4>
                                    <form onSubmit={handleLogin}>
                                        <div className="form-group mb-4">
                                            <label className="form-label" htmlFor="username">Username</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-sm-4 mb-3 position-relative">
                                            <label className="form-label" htmlFor="dlab-password">Password</label>
                                            <input placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} id="dlab-password" className="form-control" />
                                            <span className="show-pass eye" onClick={() => setShowPassword(!showPassword)}>
                                                <i className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                                            </span>
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                                        </div>
                                    </form>
                                    <div className="new-account mt-3">
                                        <p>Don't have an account? <Link className="text-primary" href="register">Sign up</Link></p>
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
