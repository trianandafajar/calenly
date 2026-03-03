"use client"
import { useParams, useRouter } from 'next/navigation';
import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import Link from 'next/link';
import dummyCategory from "@/data/dummyBlogCategory.json"
import dummytags from "@/data/dummyBlogTag.json"

const CKEditor = dynamic(
    () => import("@ckeditor/ckeditor5-react").then(m => m.CKEditor),
    { ssr: false }
)
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

export default function Page() {
    const params = useParams();
    const id = params.id;
    const router = useRouter()

    const [editor, setEditor] = useState<any>(null);

    const [contents, setContents] = useState<ContentType>({
        title: "",
        content: "",
    });

    const [seo, setSeo] = useState<SeoType>({
        title: "",
        keywords: "",
        description: ""
    });

    const [published, setPublished] = useState<PublishedType>({
        status: "",
        visible: "",
        published: ""
    });

    const [image, setImage] = useState<string>("")
    const [category, setCategory] = useState<string[]>([]);
    const [tag, setTag] = useState<string[]>([]);
    const [discussion, setDiscussion] = useState(false);

    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [author, setAuthor] = useState("");

    const [tags, setTags] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);

    const [name, setName] = useState("");

    const selectRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
        const $ = (window as any).jQuery;

        if ($) {
            $(".SlideToolHeader")
                .off("click")
                .on("click", function (this: HTMLElement) {
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
            const $ = (window as any).jQuery;

            if ($?.fn?.selectpicker) {
                $(".default-select").selectpicker();
                clearInterval(interval);
            }
        }, 200);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        import("@ckeditor/ckeditor5-build-classic").then(mod => {
            setEditor(() => mod.default);
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const $ = (window as any).jQuery;

            if ($ && $.fn.select2 && selectRef.current) {
                const select = $(selectRef.current);

                select.select2({
                    tags: true,
                    tokenSeparators: [",", " "],
                    width: "100%",
                });

                select.on("change", () => {
                    const values = (select.val() || []) as string[];
                    setTag(values);
                });

                clearInterval(interval);
            }
        }, 200);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!id) return;

        const data = localStorage.getItem("blogs");
        if (!data) return;

        const blogs = JSON.parse(data);
        const blog = blogs.find((item: any) => item.id === id);

        if (blog) {
            setContents({
                title: blog.title || "",
                content: blog.content || ""
            });

            setSeo(blog.seo || {});
            setPublished({
                status: blog.status || "",
                visible: blog.visibility || "",
                published: blog.publishedAt || ""
            });

            setCategory(blog.categories || []);
            setTag(blog.tags || []);
            setDiscussion(blog.discussion || false);
            setSlug(blog.slug || "");
            setExcerpt(blog.excerpt || "");
            setAuthor(blog.author || "");


            setTimeout(() => {
                const $ = (window as any).jQuery;

                if ($ && selectRef.current) {
                    const select = $(selectRef.current);

                    if (select.hasClass("select2-hidden-accessible")) {
                        select.val(blog.tags || []).trigger("change");
                    }
                }
            }, 300);
        }
    }, [id]);

    const mergedTags = [
        ...new Set([
            ...tags.map(t => t.name),
            ...tag
        ])
    ];

    useEffect(() => {
        const storage = localStorage.getItem("tagsBlog");

        if (storage) {
            setTags(JSON.parse(storage));
        } else {
            setTags(dummytags);
            localStorage.setItem("tagsBlog", JSON.stringify(dummytags));
        }
    }, []);

    useEffect(() => {
        const storage = localStorage.getItem("categoryBlog");

        if (storage) {
            setCategories(JSON.parse(storage));
        } else {
            setCategories(dummyCategory);
            localStorage.setItem("categoryBlog", JSON.stringify(dummyCategory));
        }
    }, []);

    const addCategory = (categoryName: string) => {
        if (!categoryName) {
            return console.log("kosong");
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
    };

    useEffect(() => {
        if (!id) return;

        const data = localStorage.getItem("blogs");
        if (!data) return;

        const blogs = JSON.parse(data);
        const blog = blogs.find((item: any) => item.id === id);

        if (blog) {
            setContents({
                title: blog.title || "",
                content: blog.content || ""
            });
            setImage(blog.image || "")
            setSeo(blog.seo || {});
            setPublished({
                status: blog.status || "",
                visible: blog.visibility || "",
                published: blog.publishedAt || ""
            });

            setCategory(blog.categories || []);
            setTag(blog.tags || []);
            setDiscussion(blog.discussion || false);
            setSlug(blog.slug || "");
            setExcerpt(blog.excerpt || "");
            setAuthor(blog.author || "");
        }
    }, [id]);

    if (!editor) return <p>Loading editor...</p>;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            const base64 = reader.result as string;
            setImage(base64);
        };

        reader.readAsDataURL(file);
    };

    const handleUpdateBlog = () => {
        if (!id) return;

        const stored = localStorage.getItem("blogs");
        if (!stored) return;

        const blogs = JSON.parse(stored);

        const updatedBlogs = blogs.map((item: any) => {
            if (item.id === id) {
                return {
                    ...item,
                    title: contents.title,
                    content: contents.content,
                    seo: seo,
                    status: published.status,
                    visibility: published.visible,
                    publishedAt: published.published,
                    categories: category,
                    tags: tag,
                    image: image,
                    discussion: discussion,
                    slug: slug,
                    excerpt: excerpt,
                    author: author,
                    updatedAt: new Date().toISOString()
                };
            }
            return item;
        });

        localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

        router.push("/dashboard/blogs")
    };
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
                                <li><a href="" className="btn btn-primary btn-sm open mt-1 mt-md-0">Screen Option</a></li>
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
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setContents({ ...contents, content: data });
                                            }}
                                        />
                                    </div>
                                </div>
                                {/* excerpt */}
                                <div className="filter cm-content-box box-primary">
                                    <div className="content-title SlideToolHeader">
                                        <div className="cpa">
                                            Excerpt
                                        </div>
                                        <div className="tools">
                                            <a href="" className="expand handle">
                                                <i className="fal fa-angle-down"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="cm-content-body publish-content form excerpt">
                                        <div className="card-body">
                                            <div className="mb-3">
                                                <label className="form-label">Excerpt</label>
                                                <textarea
                                                    value={excerpt}
                                                    onChange={(e) => setExcerpt(e.target.value)}
                                                    className="form-control"
                                                    rows={3}
                                                ></textarea>
                                                <div className="form-text">
                                                    Excerpts are optional hand-crafted summaries of your content that can be used in your theme.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="filter cm-content-box box-primary">
                                    <div className="content-title SlideToolHeader">
                                        <div className="cpa">
                                            Discussion
                                        </div>
                                        <div className="tools">
                                            {/* <a href="" className="expand handle"><i className="fal fa-angle-down"></i></a> */}
                                        </div>
                                    </div>
                                    <div className="cm-content-body form excerpt">
                                        <div className="card-body">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={discussion}
                                                    onChange={(e) => setDiscussion(e.target.checked)}
                                                    id="flexCheckDefault-15"
                                                />
                                                <label className="form-check-label" htmlFor="flexCheckDefault-15">
                                                    Allow comments.
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* slug */}
                                <div className="filter cm-content-box box-primary">
                                    <div className="content-title SlideToolHeader">
                                        <div className="cpa">
                                            Slug
                                        </div>
                                        <div className="tools">
                                            {/* <a href="" className="expand handle"><i className="fal fa-angle-down"></i></a> */}
                                        </div>
                                    </div>
                                    <div className="cm-content-body form excerpt">
                                        <div className="card-body">
                                            <label className="form-label">Slug</label>
                                            <input value={slug} onChange={(e) => setSlug(e.target.value)} type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                {/* autor */}
                                <div className="filter cm-content-box box-primary">
                                    <div className="content-title SlideToolHeader">
                                        <div className="cpa">Author

                                        </div>
                                        <div className="tools">
                                            {/* <a href="" className="expand handle"><i className="fal fa-angle-down"></i></a> */}
                                        </div>
                                    </div>
                                    <div className="cm-content-body form excerpt">
                                        <div className="card-body">
                                            <label className="form-label">User</label>
                                            <select value={author} onChange={(e) => setAuthor(e.target.value)} className="form-control default-select h-auto wide" >
                                                <option value="admin@gmail.com">admin@gmail.com</option>
                                                <option value="India">India</option>
                                                <option value="Information">Information</option>
                                                <option value="NewMenu">New Menu</option>
                                                <option value="PageMenu">Page Menu</option>
                                            </select>

                                        </div>
                                    </div>
                                </div>
                                {/* addseo */}
                                <div className="filter cm-content-box box-primary">
                                    <div className="content-title SlideToolHeader">
                                        <div className="cpa">
                                            Seo
                                        </div>
                                        <div className="tools">
                                            {/* <a href="" className="expand handle"><i className="fal fa-angle-down"></i></a> */}
                                        </div>
                                    </div>
                                    <div className="cm-content-body form excerpt">
                                        <div className="card-body">
                                            <label className="form-label">Page Title</label>
                                            <input value={seo.title} onChange={(e) =>
                                                setSeo(prev => ({ ...prev, title: e.target.value }))} type="text" className="form-control mb-3" placeholder="Page title" />
                                            <div className="row">
                                                <div className="col-xl-6 col-sm-6">
                                                    <label className="form-label">Keywords</label>
                                                    <input value={seo.keywords} onChange={(e) => setSeo(prev => ({
                                                        ...prev, keywords: e.target.value
                                                    }))} type="text" className="form-control mb-sm-0 mb-3 " placeholder="Enter meta Keywords" />
                                                </div>
                                                <div className="col-xl-6 col-sm-6">
                                                    <label className="form-label">Descriptions</label>
                                                    <textarea value={seo.description} onChange={(e) => setSeo(prev => ({
                                                        ...prev,
                                                        description: e.target.value
                                                    }))} className="form-control" placeholder="Enter meta Keywords" rows={3}></textarea>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="right-sidebar-sticky">
                                    {/* published */}
                                    <div className="filter cm-content-box box-primary">
                                        <div className="content-title SlideToolHeader">
                                            <div className="cpa">
                                                Published
                                            </div>
                                            <div className="tools">
                                                {/* <a href="" className="expand handle"><i className="fal fa-angle-down"></i></a> */}
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
                                                                    {/* <button className="btn btn-danger light btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                                                Cancel
                                                                            </button> */}
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
                                                                    {/* <button className="btn btn-danger light btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapsetwo" aria-expanded="false" aria-controls="collapsetwo">
                                                                                Cancel
                                                                            </button> */}
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
                                                                    {/* <button className="btn btn-danger light btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapsethree" aria-expanded="false" aria-controls="collapsethree">
                                                                                Cancel
                                                                            </button> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="card-footer border-top text-end py-3 ">
                                                <span onClick={handleUpdateBlog} className="btn btn-primary btn-sm">Publish</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* add categories */}
                                    <div className="filter cm-content-box box-primary">
                                        <div className="content-title SlideToolHeader">
                                            <div className="cpa">
                                                Categories
                                            </div>
                                            <div className="tools">
                                                {/* <a href="" className="expand handle"><i className="fal fa-angle-down"></i></a> */}
                                            </div>
                                        </div>
                                        <div className="cm-content-body publish-content form excerpt">
                                            <div className="card-body">
                                                <div className="border rounded p-3 mb-3">
                                                    {categories.map((item: any) => (
                                                        <div key={item.id} className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                value={item.name}
                                                                checked={category.includes(item.name)}
                                                                onChange={(e) => {
                                                                    const value = e.target.value
                                                                    const checked = e.target.checked

                                                                    setCategory((prev: string[]) => {
                                                                        if (checked) return [...prev, value]
                                                                        return prev.filter((c) => c !== value)
                                                                    })
                                                                }}
                                                                id={`flexCheckDefault-${item.id}`}
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor={`flexCheckDefault-${item.id}`}
                                                            >
                                                                {item.name}
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
                                    {/* add tags */}
                                    <div className="filter cm-content-box box-primary">
                                        <div className="content-title SlideToolHeader">
                                            <div className="cpa">
                                                Tag
                                            </div>
                                            <div className="tools">
                                                {/* <a href="" className="expand handle"><i className="fal fa-angle-down"></i></a> */}
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
                                                    {mergedTags.map((t) => (
                                                        <option key={t} value={t}>
                                                            {t}
                                                        </option>
                                                    ))}
                                                </select>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="filter cm-content-box box-primary">
                                        <div className="content-title SlideToolHeader">
                                            <div className="cpa">
                                                Featured Image
                                            </div>
                                            <div className="tools">
                                                {/* <a href="" className="expand handle"><i className="fal fa-angle-down"></i></a> */}
                                            </div>
                                        </div>
                                        <div className="cm-content-body publish-content form excerpt">
                                            <div className="card-body">
                                                <div className="avatar-upload d-flex align-items-center">
                                                    <div className=" position-relative ">
                                                        <div className="avatar-preview">
                                                            <div id="imagePreview" style={{
                                                                backgroundImage: `url(${image || "/dashboard/images/no-img-avatar.png"})`
                                                            }}>
                                                            </div>
                                                        </div>
                                                        <div className="change-btn d-flex align-items-center flex-wrap">
                                                            <input
                                                                type='file'
                                                                className="form-control d-none"
                                                                id="imageUpload"
                                                                accept=".png, .jpg, .jpeg"
                                                                onChange={handleImageChange}
                                                            />
                                                            <label htmlFor="imageUpload" className="btn btn-primary light btn-sm ms-0">Select Image</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
