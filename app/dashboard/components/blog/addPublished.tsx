"use client"

interface Props {
    handleAddNewBlog: () => void
    published: {
        status: string
        visible: string
        published: string
    }
    setPublished: React.Dispatch<
        React.SetStateAction<{
            status: string
            visible: string
            published: string
        }>
    >
}
export default function AddPublished({
    published,
    setPublished,
    handleAddNewBlog,
}: Props) {
    return (
        <>
            <div className="filter cm-content-box box-primary">
                <div className="content-title SlideToolHeader">
                    <div className="cpa">
                        Published
                    </div>
                    <div className="tools">
                        <a href="" className="expand handle"><i className="fal fa-angle-down"></i></a>
                    </div>
                </div>
                <div className="cm-content-body publish-content form excerpt">
                    <div className="card-body py-3">
                        <ul className="list-style-1 block">
                            <li>
                                <div>
                                    <label className="form-label mb-0 me-2">
                                        <i className="fa-solid fa-key"></i>
                                        <span>{""} Status:</span>
                                    </label>
                                    <span className="font-w500">{published.status ? published.status : "no status"}</span>
                                    <a href="" className="badge badge-primary light ms-3" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-controls="collapseOne" aria-expanded="true" role="button">Edit</a>
                                </div>
                                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-bs-parent="#accordion-one">
                                    <div className=" border rounded p-3 mt-3">
                                        <div className="mb-2">
                                            <label className="form-label w-100">Content Type</label>
                                            <select value={published.status} onChange={(e) => setPublished(prev => ({
                                                ...prev, status: e.target.value
                                            }))} className="form-control solid default-select">
                                                <option value="">Select Status</option>
                                                <option value="published">Published</option>
                                                <option value="draft">Draft</option>
                                                <option value="trash">Trash</option>
                                                <option value="private">Private</option>
                                                <option value="pending">Pending</option>
                                            </select>
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn btn-primary btn-sm me-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                Ok
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <label className="form-label mb-0 me-2">
                                        <i className="fa-solid fa-eye"></i>
                                        <span>{""} Visible:</span>
                                    </label>
                                    <span className="font-w500">{published.visible ? published.visible : "no visible"}</span>
                                    <a href="" className="badge badge-primary light ms-3" id="headingtwo" data-bs-toggle="collapse" data-bs-target="#collapsetwo" aria-controls="collapsetwo" aria-expanded="true" role="button">Edit</a>
                                </div>
                                <div id="collapsetwo" className="collapse" aria-labelledby="headingtwo" data-bs-parent="#accordion-one">
                                    <div className="p-3 mt-3 border rounded">
                                        <div className="basic-form">
                                            <form>
                                                <div className="mb-3">
                                                    <div className="radio">
                                                        <div className="form-check">
                                                            <input value={"public"} checked={published.visible === "public"} onChange={(e) => setPublished(prev => ({
                                                                ...prev, visible: e.target.value
                                                            }))} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                                Public
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="radio">
                                                        <div className="form-check">
                                                            <input value={"passwordProtected"} checked={published.visible === "passwordProtected"} onChange={(e) => setPublished(prev => ({
                                                                ...prev, visible: e.target.value
                                                            }))} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                                Password Protected
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="radio disabled">
                                                        <div className="form-check">
                                                            <input value={"private"} checked={published.visible === "private"} onChange={(e) => setPublished(prev => ({
                                                                ...prev, visible: e.target.value
                                                            }))} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                                                            <label className="form-check-label" htmlFor="flexRadioDefault3">
                                                                Private
                                                            </label>
                                                        </div>
                                                    </div>

                                                </div>
                                            </form>
                                        </div>
                                        <div>
                                            <button className="btn btn-primary btn-sm me-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapsetwo" aria-expanded="false" aria-controls="collapsetwo">
                                                Ok
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="border-bottom-0">
                                <div>
                                    <label className="form-label mb-0 me-2">
                                        <i className="fa-solid fa-calendar-days"></i>
                                        <span>{""} Published:</span>
                                    </label>
                                    <span className="font-w500">{published.published ? `on: ${published.published}` : "no published"}</span> {/* 24-09-2023 16:22:52 */}
                                    <a href="" className="badge badge-primary light ms-3" id="headingthree" data-bs-toggle="collapse" data-bs-target="#collapsethree" aria-controls="collapsethree" aria-expanded="true" role="button">Edit</a>
                                </div>
                                <div id="collapsethree" className="collapse" aria-labelledby="headingthree" data-bs-parent="#accordion-one">
                                    <div className="p-3 mt-3 border rounded">
                                        <div className="input-hasicon">
                                            <input value={published.published} onChange={(e) => setPublished(prev => ({
                                                ...prev, published: e.target.value
                                            }))} type="date" className="form-control solid" />
                                            <div className="icon"><i className="far fa-calendar"></i></div>
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn btn-primary btn-sm me-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapsethree" aria-expanded="false" aria-controls="collapsethree">
                                                Ok
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="card-footer border-top text-end py-3 ">
                        <span onClick={handleAddNewBlog} className="btn btn-primary btn-sm">Publish</span>
                    </div>
                </div>
            </div>
        </>
    )
}
