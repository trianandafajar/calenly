import { title } from "process"

interface Props {
  seo: {
    description: string | number | readonly string[] | undefined
    keywords: string | number | readonly string[] | undefined
    title: string
  }
  setSeo: React.Dispatch<
    React.SetStateAction<{
      title: string
      description: string
      keywords: string
    }>
  >
}

export default function AddSeo({
  seo,
  setSeo
}: Props) {
  return (
    <>
      <div className="filter cm-content-box box-primary">
        <div className="content-title SlideToolHeader">
          <div className="cpa">
            Seo
          </div>
          <div className="tools"><a href="" className="expand handle"><i className="fal fa-angle-down"></i></a>
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

    </>
  )
}
