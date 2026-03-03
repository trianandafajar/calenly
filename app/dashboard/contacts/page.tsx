"use client"
declare const bootstrap: any;

import { useEffect, useState } from "react"
import dummyDataContacts from "@/data/dummyContacts.json"
import Link from "next/link"

export default function page() {
    const [contacts, setContacts] = useState<any[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.occupation.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const totalPages = Math.ceil(filteredContacts.length / itemsPerPage)
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    const paginatedContacts = filteredContacts.slice(start, end)

    useEffect(() => {
        const stored = localStorage.getItem("contacts")

        if (stored) {
            setContacts(JSON.parse(stored))
        } else {
            setContacts(dummyDataContacts)
            localStorage.setItem("contacts", JSON.stringify(dummyDataContacts))
        }
    }, [])

    // add contact
    const [name, setName] = useState("")
    const [company, setCompany] = useState("")
    const [occupation, setOccupation] = useState("")
    const [phone, setPhone] = useState("")

    async function handleAddContact(e: React.FormEvent) {
        e.preventDefault();

        const payload = {
            id: "C-" + String(Date.now()).slice(-9),
            name,
            company,
            occupation,
            phone,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const storedContacts = localStorage.getItem("contacts");
        const contacts = storedContacts ? JSON.parse(storedContacts) : [];

        contacts.push(payload);

        localStorage.setItem("contacts", JSON.stringify(contacts));

        setContacts(contacts);

        setName("");
        setCompany("");
        setOccupation("");
        setPhone("");

        const modalEl = document.getElementById("exampleModal");
        if (modalEl) {
            const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modalInstance.hide();
        }
    }

    // edit
    const [editContact, setEditContact] = useState<any>(null);

    const handleEditClick = (id: string) => {
        const contact = contacts.find(p => p.id === id);
        if (contact) {
            setEditContact(contact);
            setName(contact.name);
            setCompany(contact.company);
            setOccupation(contact.occupation);
            setPhone(contact.phone);
        }
    };

    function handleSaveEdit(e: React.FormEvent) {
        e.preventDefault();
        if (!editContact) return;

        const updatedContact = {
            ...editContact,
            name,
            company,
            occupation,
            phone,
            updatedAt: new Date().toISOString()
        };

        const updateContact = contacts.map(p => p.id === editContact.id ? updatedContact : p);
        setContacts(updateContact);
        localStorage.setItem("contacts", JSON.stringify(updateContact));

        setEditContact(null);
        setName("");
        setCompany("");
        setOccupation("");
        setPhone("");

        const modalEl = document.getElementById("editModal");
        if (modalEl && typeof bootstrap !== "undefined") {
            const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modalInstance.hide();
        }
    }

    // delate
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const handleDeleteContact = (id: string) => {
        const updated = contacts.filter(c => c.id !== id);
        setContacts(updated);
        localStorage.setItem("contacts", JSON.stringify(updated));
        setDeleteId(null);
    }


    return (
        <>
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <div className="input-group contacts-search mb-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search here..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                                setCurrentPage(1)
                            }}
                        />

                        <span className="input-group-text"><a href=""><i className="flaticon-381-search-2"></i></a></span>
                    </div>
                    <div className="mb-4">

                        <a href="#" className="add btn btn-primary btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">+ New Contact</a>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-12">
                        <div className="row">
                            {paginatedContacts.map((contact: any) => (
                                <div key={contact.id} className="col-xl-2 col-xxl-3 col-md-4 col-sm-6 items">
                                    <div className="card contact-bx item-content">
                                        <div className="card-header border-0">
                                            <div className="action-dropdown">
                                                <div className="dropdown ">
                                                    <div className="btn-link" data-bs-toggle="dropdown">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5" />
                                                            <circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5" />
                                                            <circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5" />
                                                        </svg>
                                                    </div>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" onClick={() => setDeleteId(contact.id)} data-bs-toggle="modal" data-bs-target="#basicModal">
                                                            Delete
                                                        </a>
                                                        <a className="dropdown-item" onClick={() => handleEditClick(contact.id)} data-bs-toggle="modal" data-bs-target="#editModal" >
                                                            Edit
                                                        </a>
                                                    </div>  
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body user-profile">
                                            <div className="image-bx">
                                                <img src="/dashboard/images/avatar/5.png" data-src="images/contacts/-3.jpg" alt="" className="rounded-circle" />
                                                <span className="active"></span>
                                            </div>
                                            <div className="media-body user-meta-info">
                                                <h5 className="mb-0"><a href="app-profile.html" className="text-black user-name" data-name={contact.name}>{contact.name}</a></h5>
                                                <p className=" mb-3" data-occupation={contact.occupation}>{contact.company}</p>
                                                <ul>
                                                    <li><Link href=";"><i className="fas fa-phone-alt"></i></Link></li>
                                                    <li><Link href=";"><i className="far fa-comment-alt"></i></Link></li>
                                                    <li><Link href=";"><i className="fas fa-video"></i></Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-center justify-content-between flex-wrap mt-3">
                    <div className="mb-sm-0 mb-3">
                        <p className="mb-0 text-black">
                            Showing {paginatedContacts.length} of {filteredContacts.length} Data
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

            {/* modal add */}
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">New Contact</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleAddContact}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Contact Name</label>
                                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Contact Name" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Company</label>
                                            <input value={company} onChange={(e) => setCompany(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Company Name" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Occupation</label>
                                            <input value={occupation} onChange={(e) => setOccupation(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Occupation Name" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Phone Number</label>
                                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="form-control" id="exampleFormControlInput1" placeholder="+1 (967) 497-6338" />
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
                            <h1 className="modal-title fs-5" id="editModalLabel">Edit Contact</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSaveEdit}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Contact Name</label>
                                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Contact Name" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Company</label>
                                            <input value={company} onChange={(e) => setCompany(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Company Name" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Occupation</label>
                                            <input value={occupation} onChange={(e) => setOccupation(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Occupation Name" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Phone Number   </label>
                                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="form-control" id="exampleFormControlInput1" placeholder="+1 (967) 497-6338" />
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
                            <h5 className="modal-title">Delete Contact</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">Are you sure you want to delete this contact?</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => {
                                    if (deleteId) handleDeleteContact(deleteId);
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
