"use client"

interface SetDiscussionProps {
    setDiscussion: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SetDiscussion({ setDiscussion }: SetDiscussionProps) {
    return (
        <>
            <div className="filter cm-content-box box-primary">
                <div className="content-title SlideToolHeader">
                    <div className="cpa">
                        Discussion
                    </div>
                    <div className="tools">
                        <a href="" className="expand handle"><i className="fal fa-angle-down"></i></a>
                    </div>
                </div>
                <div className="cm-content-body form excerpt">
                    <div className="card-body">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
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
        </>
    )
}
