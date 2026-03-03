"use client"
declare const bootstrap: any;

import { useEffect, useState } from "react"
import dummyCategories from "@/data/dummyBlogCategory.json"
import Link from "next/link";

export default function page() {
    const [categories, setCategories] = useState<any[]>([])
    useEffect(() => {
        const $ = (window as any).jQuery;

        if ($) {
            $(".SlideToolHeader").off("click").on("click", function (this: HTMLElement) {
                const parent = $(this).closest(".cm-content-box");

                parent.find(".cm-content-body").slideToggle();
                const icon = $(this).find("i");

                if (icon.hasClass("fa-angle-down")) {
                    icon.removeClass("fa-angle-down").addClass("fa-angle-up");
                } else {
                    icon.removeClass("fa-angle-up").addClass("fa-angle-down");
                }
            });
        }
    }, []);
    useEffect(() => {
        const stored = localStorage.getItem("categoryBlog")

        if (stored) {
            setCategories(JSON.parse(stored))
        } else {
            setCategories(dummyCategories)
            localStorage.setItem("categoryBlog", JSON.stringify(dummyCategories))
        }
    }, [])

    // add category
    const [name, setName] = useState("")
    const addCategory = (categoryName: string) => {

        if (!categoryName) {
            return console.log("kosong")
        }

        const payload = {
            id: "CB-" + String(Date.now()).slice(-9),
            name: categoryName,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const storedCategory = localStorage.getItem("categoryBlog");
        const categoryBlog = storedCategory ? JSON.parse(storedCategory) : [];

        categoryBlog.push(payload);

        localStorage.setItem("categoryBlog", JSON.stringify(categoryBlog));

        setCategories(categoryBlog);

        setName("");
    }

    // edit
    const [editCategory, setEditCategory] = useState<any>(null);

    const handleEditClick = (id: string) => {
        const category = categories.find(p => p.id === id);
        if (category) {
            setEditCategory(category);
            setName(category.name)
        }
    };

    function handleSaveEdit(e: React.FormEvent) {
        e.preventDefault();
        if (!editCategory) return;

        const updatedCategory = {
            ...editCategory,
            name,
            updatedAt: new Date().toISOString()
        };

        const updateCategory = categories.map(p => p.id === editCategory.id ? updatedCategory : p);
        setCategories(updateCategory);
        localStorage.setItem("categoryBlog", JSON.stringify(updateCategory));

        setEditCategory(null);
        setName("");

        const modalEl = document.getElementById("editModal");
        if (modalEl && typeof bootstrap !== "undefined") {
            const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modalInstance.hide();
        }
    }

    // delate
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const handleDeleteCategory = (id: string) => {
        const updated = categories.filter(c => c.id !== id);
        setCategories(updated);
        localStorage.setItem("categoryBlog", JSON.stringify(updated));
        setDeleteId(null);
    }
    return (
        <>
            <div className="container-fluid">
                {/* <!-- Row --> */}
                <div className="row">
                    <div className="col-xl-12">
                        <div className="mb-4">
                            <ul className="d-flex align-items-center flex-wrap">
                                <li><Link href="/dashboard/blogs" className="btn btn-primary btn-sm">Blog List</Link></li>
                                <li><Link href="add-blog" className="btn btn-primary btn-sm mx-1">Add Blog</Link></li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-xl-4">
                                <div className="filter cm-content-box box-primary">
                                    <div className="content-title SlideToolHeader">
                                        <div className="cpa">
                                            Add Blog Category
                                        </div>
                                        <div className="tools">
                                            <a href="javascript:void(0);" className="expand handle"><i className="fal fa-angle-down"></i></a>
                                        </div>
                                    </div>
                                    <div className="cm-content-body  form excerpt">
                                        <div className="card-body">
                                            <div className="mb-3">
                                                <label className="form-label">Name</label>
                                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Name" />
                                            </div>
                                            <div>
                                                <button onClick={() => addCategory(name)} type="button" className="btn btn-primary">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8">
                                <div className="filter cm-content-box box-primary">
                                    <div className="content-title SlideToolHeader">
                                        <div className="cpa">
                                            Category List
                                        </div>
                                        <div className="tools">
                                            <a href="" className="expand handle"><i className="fal fa-angle-down"></i></a>
                                        </div>
                                    </div>
                                    <div className="cm-content-body publish-content form excerpt">
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-bordered table-striped verticle-middle table-responsive-sm">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">S.No</th>
                                                            <th scope="col">name</th>
                                                            <th scope="col">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {categories.map((category: any, index) => (
                                                            <tr key={category.id}>
                                                                <td>{index + 1}</td>
                                                                <td>{category.name}</td>
                                                                <td>
                                                                    <div className="">
                                                                        <span onClick={() => handleEditClick(category.id)} data-bs-toggle="modal" data-bs-target="#editModal" className="text-hover">Edit</span>
                                                                        <span> | </span>
                                                                        <span onClick={() => setDeleteId(category.id)} data-bs-toggle="modal" data-bs-target="#basicModal" className="text-hover">delete</span>
                                                                    </div>
                                                                </td>

                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* modal edit */}
            <div className="modal fade" id="editModal" tabIndex={-1} aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editModalLabel">Edit Category</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSaveEdit}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Category Name</label>
                                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Contact Name" />
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
                            <h5 className="modal-title">Delete Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">Are you sure you want to delete this category?</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => {
                                    if (deleteId) handleDeleteCategory(deleteId);
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
