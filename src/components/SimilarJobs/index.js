import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props

  const {
    employmentType,
    companyLogoUrls,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  console.log(similarJobDetails)

  return (
    <li className="similar-job-items">
      <h1 className="heading">{title}</h1>
      <img src={companyLogoUrls} />
    </li>
  )
}
export default SimilarJobs
