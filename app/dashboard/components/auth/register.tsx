"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import bcrypt from 'bcryptjs';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {

    useEffect(() => {
        const session = localStorage.getItem("session")
        if (session) {
            const sessionData = JSON.parse(session)
            if (sessionData.isLoggedIn) {
                window.location.href = "/dashboard"
            }
        }
    }, [])

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        if (!username || !email || !password) {
            toast.error("Please fill in all fields")
            return
        }

        const payload = {
            id: "U-" + String(Date.now()).slice(-9),
            username: username,
            email: email,
            password: bcrypt.hashSync(password),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        console.log(payload)
        localStorage.setItem("users", JSON.stringify(payload))
        router.push("/auth/login")
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
                                    <h4 className="text-center mb-4">Sign up your account</h4>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group mb-4">
                                            <label className="form-label" htmlFor="username">Username</label>
                                            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" placeholder="Enter username" id="username" />
                                        </div>
                                        <div className="form-group mb-4">
                                            <label className="form-label" htmlFor="email">Email</label>
                                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="hello@example.com" id="email" />
                                        </div>
                                        <div className="mb-sm-4 mb-3 position-relative">
                                            <label className="form-label" htmlFor="dlab-password">Password</label>
                                            <input placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} id="dlab-password" className="form-control" />
                                            <span className="show-pass eye" onClick={() => setShowPassword(!showPassword)}>
                                                <i className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                                            </span>
                                        </div>

                                        <div className="mb-sm-4 mb-3 position-relative">
                                            <label className="form-label" htmlFor="dlab-password">Confirm Password</label>
                                            <input placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type={showConfirmPassword ? "text" : "password"} id="dlab-password" className="form-control" />
                                            <span className="show-pass eye" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                <i className={showConfirmPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                                            </span>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary btn-block">Sign up</button>
                                        </div>
                                    </form>
                                    <div className="new-account mt-3">
                                        <p>Already have an account? <Link className="text-primary" href="login">Sign in</Link></p>
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
