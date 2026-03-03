"use client"

interface Props {
    excerpt: string
    setExcerpt: React.Dispatch<React.SetStateAction<string>>
}

export default function SetExcerpt({ excerpt, setExcerpt }: Props) {
    return (
        <>
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
        </>
    )
}
