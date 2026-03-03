"use client"
interface Props {
    image: string
    setImage: React.Dispatch<React.SetStateAction<string>>
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export default function AddImages({ image, setImage, handleImageChange }: Props) {
    return (
        <>
            <div className="filter cm-content-box box-primary">
                <div className="content-title SlideToolHeader">
                    <div className="cpa">
                        Featured Image
                    </div>
                    <div className="tools">
                        <a href="" className="expand handle"><i className="fal fa-angle-down"></i></a>
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
        </>
    )
}
