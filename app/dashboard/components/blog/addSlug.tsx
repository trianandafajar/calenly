"use client"

interface Props {
    slug: string
    setSlug: React.Dispatch<React.SetStateAction<string>>
}

export default function AddSlug({ slug, setSlug }: Props) {
    return (
        <>
            <div className="filter cm-content-box box-primary">
                <div className="content-title SlideToolHeader">
                    <div className="cpa">
                        Slug
                    </div>
                    <div className="tools">
                        <a href="" className="expand handle"><i className="fal fa-angle-down"></i></a>
                    </div>
                </div>
                <div className="cm-content-body form excerpt">
                    <div className="card-body">
                        <label className="form-label">Slug</label>
                        <input value={slug} onChange={(e) => setSlug(e.target.value)} type="text" className="form-control" />
                    </div>
                </div>
            </div>
        </>
    )
}
