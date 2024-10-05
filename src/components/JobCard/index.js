import {Link} from 'react-router-dom'
import {BsStar} from 'react-icons/bs'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <li className="job-list-items-container">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="job-list-container">
          <div className="logo-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-img"
            />
            <div className="company-details">
              <h1 className="desingnation">{title}</h1>
              <div className="rating-container">
                <BsStar size="15" color="#fbbf24" className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>

          <div className="sal-location-content">
            <div className="sal-mini-container">
              <div className="salary-icons">
                <MdLocationOn size="16" color="#ffffff" />
                <p className="icons-names">{location}</p>
              </div>
              <div className="salary-icons">
                <BsBriefcaseFill size="15" color="#ffffff" />
                <p className="icons-names">{employmentType}</p>
              </div>
            </div>

            <p className="salary-perAnnum">{packagePerAnnum}</p>
          </div>
          <hr className="horizantal" />
          <h1 className="job-heading">Description</h1>
          <p className="job-discription">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default JobCard
