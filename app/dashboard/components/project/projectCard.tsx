"use client"

import { useEffect } from "react";

export default function ProjectCard({ project, onDeleteClick, handleEditClick, handleStatusChange }:
    {
        project: any; onDeleteClick: (id: string) => void;
        handleEditClick: (id: string) => void;
        handleStatusChange: (id: string, newStatus: string) => void;
    }) {

    return (
        <>
            <div key={project.id} className="card project-card">
                <div className="card-body py-3 px-4">
                    <div className="row align-items-center">
                        <div className="col-xl-3  col-md-4 col-sm-12 align-items-center customers">
                            <div className="media-body">
                                <p className="text-primary mb-0">#{project.id}</p>
                                <h6 className="text-black">{project.title}</h6>
                                <p className="mb-0"><i className="fas fa-calendar me-3"></i>Created on { }
                                    {(() => {
                                        const d = new Date(project.createdAt)

                                        const month = d.toLocaleString("en-US", { month: "short" })
                                        const day = d.getDate()
                                        const year = d.getFullYear()
                                        const suffix =
                                            day > 3 && day < 21
                                                ? "th"
                                                : ["st", "nd", "rd"][(day % 10) - 1] || "th"

                                        return `${month} ${day}${suffix}, ${year}`
                                    })()}
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-2 col-md-4 col-sm-6 mt-md-0 mt-sm-3">
                            <div className="d-flex project-image">
                                <img src="/dashboard/images/avatar/1.png" alt="" />
                                <div>
                                    <p className="mb-0">Client</p>
                                    <h6 className="mb-0">{project.client}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-md-4 col-sm-6 text-lg-left mt-md-0 mt-3">
                            <div className="d-flex project-image">
                                <img src="/dashboard/images/avatar/3.png" alt="" />
                                <div>
                                    <p className="mb-0">Person in charge</p>
                                    <h6 className="mb-0">{project.personInCharge}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3  col-md-6 col-sm-6 mt-3 mt-xl-0">
                            <div className="d-flex project-image">
                                <svg className="me-3" width="45" height="45" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="27.5" cy="27.5" r="27.5" fill="#886CC0"></circle>
                                    <g clipPath="url(#clip0)">
                                        <path d="M37.2961 23.6858C37.1797 23.4406 36.9325 23.2843 36.661 23.2843H29.6088L33.8773 16.0608C34.0057 15.8435 34.0077 15.5738 33.8826 15.3546C33.7574 15.1354 33.5244 14.9999 33.2719 15L27.2468 15.0007C26.9968 15.0008 26.7656 15.1335 26.6396 15.3495L18.7318 28.905C18.6049 29.1224 18.604 29.3911 18.7294 29.6094C18.8548 29.8277 19.0873 29.9624 19.3391 29.9624H26.3464L24.3054 38.1263C24.2255 38.4457 24.3781 38.7779 24.6725 38.9255C24.7729 38.9757 24.8806 39 24.9872 39C25.1933 39 25.3952 38.9094 25.5324 38.7413L37.2058 24.4319C37.3774 24.2215 37.4126 23.931 37.2961 23.6858Z" fill="white"></path>
                                    </g>
                                    <defs>
                                        <clipPath>
                                            <rect width="24" height="24" fill="white" transform="translate(16 15)"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                                <div>
                                    <p className="mb-0">Deadline</p>
                                    <h6 className="mb-0">
                                        {(() => {
                                            const d = new Date(project.deadline)

                                            const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                                            const weekday = weekdays[d.getDay()]

                                            const month = d.toLocaleString("en-US", { month: "short" })
                                            const date = d.getDate()
                                            const year = d.getFullYear()

                                            const suffix =
                                                date > 3 && date < 21
                                                    ? "th"
                                                    : ["st", "nd", "rd"][(date % 10) - 1] || "th"

                                            return `${weekday}, ${month} ${date}${suffix}, ${year}`
                                        })()}

                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2  col-sm-6 col-sm-4 mt-xl-0  mt-3">
                            <div className="d-flex justify-content-sm-end project-btn">
                                <select
                                    className={`select-badge badge badge-md default-select ${project.status === "Pending" ? "badge-warning light" :
                                        project.status === "OnProgress" ? "badge-primary light" :
                                            project.status === "Closed" ? "badge-success light" : "badge-secondary light"}`}
                                    value={project.status}
                                    onChange={(e) => handleStatusChange(project.id, e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="OnProgress">On Progress</option>
                                    <option value="Closed">Closed</option>
                                </select>

                                <div className="dropdown ms-4  mt-auto mb-auto">
                                    <div className="btn-link" data-bs-toggle="dropdown" aria-expanded="false">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z" stroke="#737B8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12Z" stroke="#737B8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M4 12C4 12.5523 4.44772 13 5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12Z" stroke="#737B8B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </div>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <a className="dropdown-item" onClick={() => handleEditClick(project.id)} data-bs-toggle="modal" data-bs-target="#editModal" >
                                            Edit
                                        </a>
                                        <a className="dropdown-item" onClick={() => onDeleteClick(project.id)} data-bs-toggle="modal" data-bs-target="#basicModal">
                                            Delete
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
