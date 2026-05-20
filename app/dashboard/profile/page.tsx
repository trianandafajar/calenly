"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import bcrypt from "bcryptjs"
import toast from "react-hot-toast"

type UserRecord = {
  id: string
  username: string
  email: string
  password: string
  createdAt?: string
  updatedAt?: string
}

export default function Page() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<UserRecord | null>(null)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    const storedUser = localStorage.getItem("users")
    if (!storedUser) {
      setLoading(false)
      return
    }

    const parsed: UserRecord = JSON.parse(storedUser)
    setUser(parsed)
    setUsername(parsed.username ?? "")
    setEmail(parsed.email ?? "")
    setLoading(false)
  }, [])

  const profileCompletion = useMemo(() => {
    let score = 0
    if (username.trim()) score += 40
    if (email.trim()) score += 40
    if (user?.password) score += 20
    return score
  }, [username, email, user?.password])

  const initials = useMemo(() => {
    if (!username.trim()) return "U"
    return username.trim().slice(0, 1).toUpperCase()
  }, [username])

  const handleUpdateProfile = (e: FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast.error("User data not found")
      return
    }

    if (!username.trim() || !email.trim()) {
      toast.error("Username and email are required")
      return
    }

    const updatedUser: UserRecord = {
      ...user,
      username: username.trim(),
      email: email.trim(),
      updatedAt: new Date().toISOString(),
    }

    localStorage.setItem("users", JSON.stringify(updatedUser))
    setUser(updatedUser)

    const sessionRaw = localStorage.getItem("session")
    if (sessionRaw) {
      const session = JSON.parse(sessionRaw)
      session.username = updatedUser.username
      localStorage.setItem("session", JSON.stringify(session))
    }

    toast.success("Profile updated successfully")
  }

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast.error("User data not found")
      return
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please complete all password fields")
      return
    }

    const currentMatch = await bcrypt.compare(currentPassword, user.password)
    if (!currentMatch) {
      toast.error("Current password is incorrect")
      return
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters")
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("Confirm password does not match")
      return
    }

    const updatedUser: UserRecord = {
      ...user,
      password: bcrypt.hashSync(newPassword),
      updatedAt: new Date().toISOString(),
    }

    localStorage.setItem("users", JSON.stringify(updatedUser))
    setUser(updatedUser)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")

    toast.success("Password changed successfully")
  }

  if (loading) {
    return (
      <div className="container-fluid dashboard-profile-page">
        <div className="card">
          <div className="card-body">Loading profile...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid dashboard-profile-page">
      <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
        <div>
          <h4 className="mb-1">Profile Settings</h4>
          <span className="text-muted">Manage your account details and password.</span>
        </div>
      </div>

      <div className="row g-3 align-items-start">
        <div className="col-xxl-4 col-xl-5 d-flex">
          <div className="card mb-0 profile-summary-card flex-fill">
            <div className="card-body text-center p-4">
              <div
                className="mx-auto d-flex align-items-center justify-content-center mb-3"
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #886CC0 0%, #6b4fb6 100%)",
                  color: "#fff",
                  fontSize: 30,
                  fontWeight: 700,
                }}
              >
                {initials}
              </div>
              <h4 className="mb-1">{username || "-"}</h4>
              <p className="mb-4 text-muted">{email || "-"}</p>
              <div className="progress" style={{ height: 8 }}>
                <div
                  className="progress-bar bg-primary"
                  style={{ width: `${profileCompletion}%` }}
                  role="progressbar"
                  aria-valuenow={profileCompletion}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
              <small className="text-muted d-block mt-2">Profile completeness: {profileCompletion}%</small>
              <div className="border rounded p-3 mt-4 text-start">
                <p className="mb-1"><strong>Account ID:</strong> {user?.id || "-"}</p>
                <p className="mb-0"><strong>Last Updated:</strong> {user?.updatedAt ? new Date(user.updatedAt).toLocaleString() : "-"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xxl-8 col-xl-7">
          <div className="card mb-3">
            <div className="card-header">
              <h4 className="card-title">Edit Profile</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleUpdateProfile}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
              </form>
            </div>
          </div>

          <div className="card mb-0">
            <div className="card-header">
              <h4 className="card-title">Change Password</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleChangePassword}>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">Update Password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
