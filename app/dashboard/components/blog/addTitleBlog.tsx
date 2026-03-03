"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const CKEditor = dynamic(
    () => import("@ckeditor/ckeditor5-react").then(m => m.CKEditor),
    { ssr: false }
)

export default function AddTitleBlog({ contents, setContents }: any) {
    const [editor, setEditor] = useState<any>(null)

    useEffect(() => {
        import("@ckeditor/ckeditor5-build-classic").then(mod => {
            setEditor(() => mod.default)
        })
    }, [])

    if (!editor) return <p>Loading editor...</p>

    return (
        <div className="card h-auto">
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input value={contents.title}
                        onChange={(e) =>
                            setContents((prev: any) => ({
                                ...prev,
                                title: e.target.value
                            }))
                        } type="text" className="form-control" placeholder="Title" />
                </div>
                <CKEditor
                    editor={editor}
                    data={contents.content}
                    onChange={(_, ed) => {
                        setContents((prev: any) => ({
                            ...prev,
                            content: ed.getData()
                        }))
                    }}
                />
            </div>
        </div>
    )
}