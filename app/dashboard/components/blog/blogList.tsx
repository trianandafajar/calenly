"use client"
declare const bootstrap: any;
import { useEffect, useState } from "react"
import dummyDataBlogs from "@/data/dummyBlog.json"
import Link from "next/link";

interface Props {
    filters: {
        title: string;
        status: string;
        date: string;
    };
}

export default function BlogList({ filters }: Props) {
    const [blogs, setBlogs] = useState<any[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const filteredBlogs = blogs.filter(blog => {
        return (
            (filters.title === "" || blog.title.toLowerCase().includes(filters.title.toLowerCase())) &&
            (filters.status === "" || blog.status === filters.status) &&
            (filters.date === "" || blog.date === filters.date)
        );
    });

    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage)

    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage

    const paginatedblogs = filteredBlogs.slice(start, end)

    const maxVisiblePages = 5
    const half = Math.floor(maxVisiblePages / 2)

    let startPage = Math.max(currentPage - half, 1)
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages)

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(endPage - maxVisiblePages + 1, 1)
    }

    useEffect(() => {
        const stored = localStorage.getItem("blogs")

        if (stored) {
            setBlogs(JSON.parse(stored))
        } else {
            setBlogs(dummyDataBlogs)
            localStorage.setItem("blogs", JSON.stringify(dummyDataBlogs))
        }
    }, [])

    // delate
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const handleDeleteBlog = (id: string) => {
        const updated = blogs.filter(b => b.id !== id);
        setBlogs(updated);
        localStorage.setItem("blogs", JSON.stringify(updated));
        setDeleteId(null);
    }


    return (
        <>
            <div className="filter cm-content-box box-primary">
                <div className="content-title SlideToolHeader">
                    <div className="cpa">
                        <i className="fa-solid fa-file-lines me-1"></i>Blogs List
                    </div>
                    <div className="tools">
                        <a href="" className="expand handle"><i className="fal fa-angle-down"></i></a>
                    </div>
                </div>
                <div className="cm-content-body form excerpt">
                    <div className="card-body pb-4">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Title</th>
                                        <th>Status</th>
                                        <th>Modified</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedblogs.map((blog: any, index) => (
                                        <tr key={blog.id}>
                                            <td>{index + 1}</td>
                                            <td>{blog.title}</td>
                                            <td>{blog.status}</td>
                                            <td>
                                                {(() => {
                                                    const d = new Date(blog.updatedAt)

                                                    const month = d.toLocaleString("en-US", { month: "short" })
                                                    const day = d.getDate()
                                                    const year = d.getFullYear()

                                                    return `${day} ${month}, ${year}`
                                                })()}
                                            </td>
                                            <td className="text-nowrap">
                                                <Link href={`blogs/${blog.id}/detail`} className="btn btn-warning btn-sm content-icon">
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>
                                                <div onClick={() => setDeleteId(blog.id)} data-bs-toggle="modal" data-bs-target="#basicModal" className="btn btn-danger btn-sm content-icon">
                                                    <i className="fa-solid fa-trash"></i>
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                    {paginatedblogs.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="text-center">No Blogs Found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <p className="mb-2 me-3">
                                    Page {currentPage} of {totalPages}, showing{" "}
                                    {paginatedblogs.length} records out of {blogs.length} total, starting on
                                    record {blogs.length === 0 ? 0 : start + 1}, ending on{" "}
                                    {Math.min(end, blogs.length)}
                                </p>

                                <nav aria-label="Page navigation example" className="mb-2">
                                    <ul className="pagination mb-2 mb-sm-0">

                                        {/* Prev Button */}
                                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            >
                                                <i className="fa-solid fa-angle-left"></i>
                                            </button>
                                        </li>

                                        {/* Number Pages */}
                                        {Array.from(
                                            { length: endPage - startPage + 1 },
                                            (_, index) => {
                                                const pageNumber = startPage + index
                                                return (
                                                    <li
                                                        key={pageNumber}
                                                        className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
                                                    >
                                                        <button
                                                            className="page-link"
                                                            onClick={() => setCurrentPage(pageNumber)}
                                                        >
                                                            {pageNumber}
                                                        </button>
                                                    </li>
                                                )
                                            }
                                        )}


                                        {/* Next Button */}
                                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                            <button
                                                className="page-link"
                                                onClick={() =>
                                                    setCurrentPage(prev => Math.min(prev + 1, totalPages))
                                                }
                                            >
                                                <i className="fa-solid fa-angle-right"></i>
                                            </button>
                                        </li>

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* modal delete */}
            <div className="modal fade" id="basicModal" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete Blog</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">Are you sure you want to delete this blog?</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-close-custom" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => {
                                    if (deleteId) handleDeleteBlog(deleteId);
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
