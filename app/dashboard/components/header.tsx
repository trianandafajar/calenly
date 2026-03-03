"use client"
declare const bootstrap: any;
import Link from "next/link"

export default function Header() {

    const logout = () => {
        const modalEl = document.getElementById("basicModal");
        const modalInstance = bootstrap.Modal.getInstance(modalEl!) || new bootstrap.Modal(modalEl!);
        modalInstance.hide();

        localStorage.removeItem("session")
        window.location.href = "auth/login"
    }

    return (
        <>
            <div className="nav-header">
                <a href="/dashboard" className="brand-logo">
                    <img src="/dashboard/images/logo.png" style={{ width: "50px" }} />

                    {/* dark logo */}
                    <div className="brand-title">
                        <img className="logo-dark"
                            src="/dashboard/images/darklogo.png"
                            alt="Logo"
                        />

                        {/* light logo */}
                        <img className="logo-light"
                            src="/dashboard/images/lightlogo.png"
                            alt="Logo"
                        />
                    </div >

                </a>
                <div className="nav-control">
                    <div className="hamburger">
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                    </div>
                </div>
            </div>

            {/* hedaer */}
            <div className="header">
                <div className="header-content">
                    <nav className="navbar navbar-expand">
                        <div className="collapse navbar-collapse justify-content-between">
                            <div className="header-left">
                                <div className="dashboard_bar">
                                    Dashboard
                                </div>
                            </div>
                            <ul className="navbar-nav header-right">
                                <li className="nav-item dropdown notification_dropdown">
                                    <a className="nav-link bell dz-theme-mode" href="">
                                        <i id="icon-light" className="fas fa-sun"></i>
                                        <i id="icon-dark" className="fas fa-moon"></i>

                                    </a>
                                </li>
                                <li className="nav-item dropdown  header-profile">
                                    <a className="nav-link" href="" role="button" data-bs-toggle="dropdown">
                                        <img src="/dashboard/images/avatar/contect-user.jpg" width="56" alt="" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end">
                                        <Link href="profile" className="dropdown-item ai-icon">
                                            <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                            <span className="ms-2">Profile </span>
                                        </Link>
                                        <span data-bs-toggle="modal" data-bs-target="#basicModal" className="dropdown-item ai-icon">
                                            <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                            <span className="ms-2">Logout </span>
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="modal fade" id="basicModal" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Logout</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">Are you sure you want to logout?</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>I
        </>
    )
}
