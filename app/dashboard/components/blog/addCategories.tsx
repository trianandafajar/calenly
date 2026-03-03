"use client"
import dummyCategory from "@/data/dummyBlogCategory.json"

import { useEffect, useState } from "react"

export default function AddCategories({ setCategory }: any) {

    const [categories, setCategories] = useState<any[]>([])
    useEffect(() => {
        const storage = localStorage.getItem("categoryBlog")

        if (storage) {
            setCategories(JSON.parse(storage))
        } else {
            setCategories(dummyCategory)
            localStorage.setItem("categoryBlog", JSON.stringify(dummyCategory))
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

    return (
        <>
            <div className="filter cm-content-box box-primary">
                <div className="content-title SlideToolHeader">
                    <div className="cpa">
                        Categories
                    </div>
                    <div className="tools">
                        <a href="" className="expand handle"><i className="fal fa-angle-down"></i></a>
                    </div>
                </div>
                <div className="cm-content-body publish-content form excerpt">
                    <div className="card-body">
                        <div className="border rounded p-3 mb-3">
                            {categories.map((category: any) => (
                                <div key={category.id} className="form-check">
                                    <input className="form-check-input" type="checkbox" value={category.name}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            const checked = e.target.checked

                                            setCategory((prev: string[]) => {
                                                return checked
                                                    ? [...prev, value]
                                                    : prev.filter((c) => c !== value)
                                            })

                                        }}

                                        id={`flexCheckDefault-${category.id}`} />
                                    <label className="form-check-label" htmlFor={`flexCheckDefault-${category.id}`}>
                                        {category.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <span><i className="fa-solid fa-plus"></i> Add New Categories</span>
                        <form>
                            <div className="input-group mt-3">
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="category" aria-label="Username" aria-describedby="basic-addon1" />
                                <span className="input-group-text" id="basic-addon1"><a onClick={() => addCategory(name)} >Add New</a></span>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}
