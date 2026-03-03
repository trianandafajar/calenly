"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import AddTitleBlog from "../../components/blog/addTitleBlog"
import AddSeo from "../../components/blog/addSeo";
import AddPublished from "../../components/blog/addPublished";
import AddCategories from "../../components/blog/addCategories";
import AddTags from "../../components/blog/addTags";
import SetDiscussion from "../../components/blog/setDiscussion";
import AddSlug from "../../components/blog/addSlug";
import SetExcerpt from "../../components/blog/setExcerpt"
import SetAuthor from "../../components/blog/setAuthor";
import { useRouter } from "next/navigation";
import AddImages from "../../components/blog/addImages";

interface ContentType {
    title: string;
    content: string;
}

interface SeoType {
    title: string;
    keywords: string;
    description: string

}

interface PublishedType {
    status: string;
    visible: string;
    published: string
}

type BlogType = {
    id: string
    title: string
    content: string
    seo: SeoType
    status: string
    author: string
    slug: string
    excerpt: string
    visibility: string
    publishedAt: string
    categories: string[]
    discussion: boolean
    tags: string[]
    image: string
    createdAt: string
    updatedAt: string
}


export default function Page() {
    const router = useRouter()

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

        const interval = setInterval(() => {
            const $ = (window as any).jQuery

            if ($?.fn?.selectpicker) {
                $(".default-select").selectpicker()
                clearInterval(interval)
            }
        }, 200)

        return () => clearInterval(interval)
    }, []);

    // title & deskripsi
    const [contents, setContents] = useState<ContentType>({
        title: "",
        content: "",
    })
    // seo
    const [seo, setSeo] = useState<SeoType>({
        title: "",
        keywords: "",
        description: ""
    })
    // publish
    const [published, setPublished] = useState<PublishedType>({
        status: "",
        visible: "",
        published: ""
    })
    // category
    const [category, setCategory] = useState<string[]>([])
    // tag
    const [tag, setTag] = useState<string[]>([])
    // discussion
    const [discussion, setDiscussion] = useState(false)
    // slug
    const [slug, setSlug] = useState("")
    // Excerpt
    const [excerpt, setExcerpt] = useState("")
    // author
    const [author, setAuthor] = useState("")
    // image
    const [image, setImage] = useState<string>("")

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            const base64 = reader.result as string
            setImage(base64)
        }
        reader.readAsDataURL(file)
    }

    async function addBlog() {

        if (!contents.title || !contents.content) {
            alert("Semua Wajib di Isi")
            return
        }

        const newBlog: BlogType = {
            id: "B-" + String(Date.now()).slice(-9),
            title: contents.title,
            content: contents.content,
            seo: seo,
            status: published.status,
            slug,
            author,
            excerpt,
            visibility: published.visible,
            publishedAt: published.published,
            discussion,
            image: image,
            categories: category,
            tags: tag,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        const storedBlog = localStorage.getItem("blogs");
        const blogs = storedBlog ? JSON.parse(storedBlog) : [];

        blogs.push(newBlog);

        localStorage.setItem("blogs", JSON.stringify(blogs));

        setContents({
            title: "",
            content: "",
        })
        setSeo({
            title: "",
            keywords: "",
            description: ""
        })
        setPublished({
            status: "",
            visible: "",
            published: ""
        })
        setCategory([])
        setTag([])
        setDiscussion(false)
        setSlug("")
        setExcerpt("")
        setAuthor("")

        router.push("/dashboard/blogs")
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
                                <li><Link href="blog-categories" className="btn btn-primary btn-sm mx-1">Blog Category</Link></li>
                                {/* <li><a href="" className="btn btn-primary btn-sm open mt-1 mt-md-0">Screen Option</a></li> */}
                            </ul>
                        </div>
                        <div className="main-check" style={{ display: "none" }}>
                            <div className="row">
                                <h6 className="mb-3">Show on screen</h6>
                                <div className="col-xl-2 col-lg-3 col-sm-4">
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault-1" />
                                        <label className="form-check-label mb-0 text-nowrap" htmlFor="flexCheckDefault-1">
                                            Page Attributes
                                        </label>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-sm-4">
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault-2" />
                                        <label className="form-check-label mb-0 text-nowrap" htmlFor="flexCheckDefault-2">
                                            Featured Image

                                        </label>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-sm-4">
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault-3" />
                                        <label className="form-check-label mb-0" htmlFor="flexCheckDefault-3">
                                            Excerpt
                                        </label>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-sm-4">
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault-4" />
                                        <label className="form-check-label mb-0 text-nowrap" htmlFor="flexCheckDefault-4">
                                            Custom Fields
                                        </label>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-sm-4">
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault-5" />
                                        <label className="form-check-label mb-0 text-nowrap" htmlFor="flexCheckDefault-5">
                                            Discussion
                                        </label>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-sm-4">
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault-6" />
                                        <label className="form-check-label mb-0 text-nowrap" htmlFor="flexCheckDefault-6">
                                            Slug
                                        </label>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-sm-4">
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault-7" />
                                        <label className="form-check-label mb-0" htmlFor="flexCheckDefault-7">
                                            Author
                                        </label>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-sm-4">
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault-8" />
                                        <label className="form-check-label mb-0" htmlFor="flexCheckDefault-8">
                                            Page Type
                                        </label>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-sm-4">
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault-9" />
                                        <label className="form-check-label mb-0" htmlFor="flexCheckDefault-9">
                                            Seo
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-8">
                                {/* add title */}
                                <AddTitleBlog contents={contents}
                                    setContents={setContents} />

                                {/* excerpt */}
                                <SetExcerpt excerpt={excerpt} setExcerpt={setExcerpt} />

                                {/* discussion */}
                                <SetDiscussion setDiscussion={setDiscussion} />

                                {/* slug */}
                                <AddSlug slug={slug} setSlug={setSlug} />

                                {/* autor */}
                                <SetAuthor author={author} setAuthor={setAuthor} />

                                {/* addseo */}
                                <AddSeo seo={seo} setSeo={setSeo} />
                            </div>
                            <div className="col-xl-4">
                                <div className="right-sidebar-sticky">
                                    {/* published */}
                                    <AddPublished published={published} handleAddNewBlog={addBlog} setPublished={setPublished} />

                                    {/* add categories */}
                                    <AddCategories setCategory={setCategory} />

                                    {/* add tags */}
                                    <AddTags setTag={setTag} />

                                    {/* addimage */}
                                    <AddImages image={image} setImage={setImage} handleImageChange={handleImageChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
