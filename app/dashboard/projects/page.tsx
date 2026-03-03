"use client"
declare const bootstrap: any;

import { useEffect, useState } from "react"
import dummyDataProjects from "@/data/dummyProject.json"
import ProjectCard from "../components/project/projectCard"

export default function Page() {

  // pagination
  const [projects, setProjects] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("AllStatus")
  const itemsPerPage = 10

  useEffect(() => {
    const stored = localStorage.getItem("projects")

    if (stored) {
      setProjects(JSON.parse(stored))
    } else {
      setProjects(dummyDataProjects)
      localStorage.setItem("projects", JSON.stringify(dummyDataProjects))
    }
  }, [])

  const filteredProjects = projects.filter((p) => {
    if (activeTab === "AllStatus") return true
    return p.status === activeTab
  })

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const start = (currentPage - 1) * itemsPerPage
  const end = start + itemsPerPage
  const paginatedProjects = filteredProjects.slice(start, end)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  // add project
  const [title, setTitle] = useState("")
  const [client, setClient] = useState("")
  const [personInCharge, setPersonInCharge] = useState("")
  const [deadline, setDeadline] = useState("")

  async function handleAddProject(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      id: "P-" + String(Date.now()).slice(-9),
      title,
      client,
      personInCharge,
      deadline: deadline ? new Date(deadline).toISOString() : undefined,
      status: "Pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const storedProjects = localStorage.getItem("projects");
    const projects = storedProjects ? JSON.parse(storedProjects) : [];

    projects.push(payload);

    localStorage.setItem("projects", JSON.stringify(projects));

    setProjects(projects);

    setTitle("");
    setClient("");
    setPersonInCharge("");
    setDeadline("");

    const modalEl = document.getElementById("exampleModal");
    if (modalEl) {
      const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modalInstance.hide();
    }
  }

  // edit
  const [editProject, setEditProject] = useState<any>(null);

  const handleEditClick = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      setEditProject(project);
      setTitle(project.title);
      setClient(project.client);
      setPersonInCharge(project.personInCharge);
      setDeadline(project.deadline ? project.deadline.slice(0, 10) : "");
    }
  };

  function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editProject) return;

    const updatedProject = {
      ...editProject,
      title,
      client,
      personInCharge,
      deadline: deadline ? new Date(deadline).toISOString() : undefined,
      updatedAt: new Date().toISOString()
    };

    const updatedProjects = projects.map(p => p.id === editProject.id ? updatedProject : p);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));

    setEditProject(null);
    setTitle("");
    setClient("");
    setPersonInCharge("");
    setDeadline("");

    const modalEl = document.getElementById("editModal");
    if (modalEl && typeof bootstrap !== "undefined") {
      const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modalInstance.hide();
    }
  }

  // updete status
  const handleStatusChange = (id: string, newStatus: string) => {
    const updatedProjects = projects.map(p =>
      p.id === id ? { ...p, status: newStatus, updatedAt: new Date().toISOString() } : p
    );
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };


  // delete 
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const handleDeleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem("projects", JSON.stringify(updated));
    setDeleteId(null);
  }


  return (
    <>
      <div className="container-fluid">
        <div className="project-page d-flex justify-content-between align-items-center flex-wrap">
          <div className="card-tabs mb-4">
            <ul className="nav nav-tabs style-1" role="tablist">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "AllStatus" ? "active" : ""}`}
                  onClick={() => handleTabChange("AllStatus")}
                >
                  All Status
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "OnProgress" ? "active" : ""}`}
                  onClick={() => handleTabChange("OnProgress")}
                >
                  On Progress
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "Pending" ? "active" : ""}`}
                  onClick={() => handleTabChange("Pending")}
                >
                  Pending
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "Closed" ? "active" : ""}`}
                  onClick={() => handleTabChange("Closed")}
                >
                  Closed
                </button>
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <a href="javascript:void(0);" className="btn btn-primary btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
              + New Project
            </a>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="tab-content">
              {paginatedProjects.map((project) => (
                <ProjectCard key={project.id}
                  project={project}
                  handleEditClick={handleEditClick}
                  onDeleteClick={(id) => setDeleteId(id)}
                  handleStatusChange={handleStatusChange}
                />
              ))}

              <div className="d-flex align-items-center justify-content-between flex-wrap mt-3">
                <div className="mb-sm-0 mb-3">
                  <p className="mb-0 text-black">
                    Showing {paginatedProjects.length} of {filteredProjects.length} Data
                  </p>
                </div>
                <nav>
                  <ul className="pagination pagination-circle">
                    <li className="page-item">
                      <button
                        className="page-link"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      >
                        <i className="la la-angle-left"></i>
                      </button>
                    </li>

                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                        <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                          {i + 1}
                        </button>
                      </li>
                    ))}

                    <li className="page-item">
                      <button
                        className="page-link"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      >
                        <i className="la la-angle-right"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal add */}
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">New project</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleAddProject}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Project title</label>
                      <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Project Title" />
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Client Name</label>
                      <input value={client} onChange={(e) => setClient(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Client Name" />
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Person in charge</label>
                      <input value={personInCharge} onChange={(e) => setPersonInCharge(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Jhon Doe" />
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Deadline</label>
                      <input value={deadline} onChange={(e) => setDeadline(e.target.value)} type="date" className="form-control" id="exampleFormControlInput1" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div >

      {/* modal edit */}
      <div className="modal fade" id="editModal" tabIndex={-1} aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editModalLabel">Edit project</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSaveEdit}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Project title</label>
                      <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Project Title" />
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Client Name</label>
                      <input value={client} onChange={(e) => setClient(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Client Name" />
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Person in charge</label>
                      <input value={personInCharge} onChange={(e) => setPersonInCharge(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Jhon Doe" />
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">Deadline</label>
                      <input value={deadline} onChange={(e) => setDeadline(e.target.value)} type="date" className="form-control" id="exampleFormControlInput1" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div >

      {/* modal delete */}
      <div className="modal fade" id="basicModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Project</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">Are you sure you want to delete this project?</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  if (deleteId) handleDeleteProject(deleteId);
                  const modalEl = document.getElementById("basicModal");
                  const modalInstance = bootstrap.Modal.getInstance(modalEl!) || new bootstrap.Modal(modalEl!);
                  modalInstance.hide();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
