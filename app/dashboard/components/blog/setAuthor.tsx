"use client"

interface Props {
    author: string
    setAuthor: React.Dispatch<React.SetStateAction<string>>
}

export default function SetAuthor({ author, setAuthor }: Props) {
    return (
        <>
            <div className="filter cm-content-box box-primary">
                <div className="content-title SlideToolHeader">
                    <div className="cpa">Author

                    </div>
                    <div className="tools">
                        <a href="" className="expand handle"><i className="fal fa-angle-down"></i></a>
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
        </>
    )
}
