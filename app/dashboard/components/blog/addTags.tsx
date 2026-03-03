"use client"

import { useEffect, useRef, useState } from "react"
import dummytags from "@/data/dummyBlogTag.json"

export default function AddTags({ setTag }: any) {
    const [tags, setTags] = useState<any[]>([])
    const selectRef = useRef<HTMLSelectElement>(null)

    useEffect(() => {
        const storage = localStorage.getItem("tagsBlog")

        if (storage) {
            setTags(JSON.parse(storage))
        } else {
            setTags(dummytags)
            localStorage.setItem("tagsBlog", JSON.stringify(dummytags))
        }
    }, [])

    useEffect(() => {
        const $ = (window as any).$

        if (!$ || !selectRef.current) return

        const selectElement = $(selectRef.current)

        selectElement.on("change", function () {
            const values = selectElement.val() || []
            setTag(values)
        })

        return () => {
            selectElement.off("change")
        }
    }, [])
    useEffect(() => {
        const $ = (window as any).$

        if (!$ || !selectRef.current) return

        const select = $(selectRef.current)

        if ($.fn.select2) {
            select.select2({
                tags: true,
                tokenSeparators: [",", " "],
            })
        }
    }, [tags])

    // useEffect(() => {
    //     const $ = (window as any).$

    //     if (!$) return

    //     $(".expand").off("click").on("click", function (this: HTMLElement) {
    //         const parent = $(this).closest(".cm-content-box")
    //         const body = parent.find(".cm-content-body")

    //         body.slideToggle(200, () => {
    //             const select = parent.find(".select2")

    //             if (select.length && $.fn.select2) {
    //                 select.select2("destroy")
    //                 select.select2({
    //                     width: "100%"
    //                 })
    //             }
    //         })

    //         $(this).find("i").toggleClass("fa-angle-down fa-angle-up")
    //     })
    // }, [])

    return (
        <div className="filter cm-content-box box-primary">
            <div className="content-title SlideToolHeader">
                <div className="cpa">
                    Tag
                </div>
                <div className="tools">
                    <a href="" className="expand handle"><i className="fal fa-angle-down"></i></a>
                </div>
            </div>

            <div className="cm-content-body form excerpt">
                <div className="card-body">

                    <select
                        ref={selectRef}
                        id="multi-value-select"
                        multiple
                        className="form-control select2"
                    >
                        {tags.map((tag: any) => (
                            <option key={tag.id} value={tag.name}>
                                {tag.name}
                            </option>
                        ))}
                    </select>

                </div>
            </div>
        </div>
    )
}
