import {Component} from 'react'
// import ReactPlayer from 'react-player'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsStar} from 'react-icons/bs'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {BsBoxArrowUpRight} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstains = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}
class JobDetails extends Component {
  state = {
    jobDetailsData: {},
    lifeAtCompany: {},
    jobSkills: [],
    similarJobs: [],
    apiStatus: apiStatusConstains.initial,
  }
  componentDidMount() {
    this.getJobDetailsData()
  }
  getFormattedData = data => ({
    id: data.id,
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })
  getLifeAtCompany = data => ({
    description: data.description,
    imageUrl: data.image_url,
  })
  getSkills = data => ({
    name: data.name,
    imageUrls: data.image_url,
  })
  getSimilarJobs = data => ({
    id: data.id,
    employmentTypes: data.employment_type,
    companyLogoUrls: data.company_logo_url,
    jobDescriptions: data.job_description,
    locations: data.location,
    ratings: data.rating,
    titles: data.title,
  })

  getJobDetailsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstains.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      // console.log(fetchedData)
      const updateData = this.getFormattedData(fetchedData.job_details)
      const updateLife = this.getLifeAtCompany(
        fetchedData.job_details.life_at_company,
      )
      const updateSkills = fetchedData.job_details.skills.map(eachData =>
        this.getSkills(eachData),
      )
      const upDateSimilarJobs = fetchedData.similar_jobs.map(eachData =>
        this.getSimilarJobs(eachData),
      )
      // console.log(upDateSimilarJobs)

      this.setState({
        jobDetailsData: updateData,
        lifeAtCompany: updateLife,
        jobSkills: updateSkills,
        similarJobs: upDateSimilarJobs,
        apiStatus: apiStatusConstains.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstains.failure})
    }
  }

  renderLoadingView = () => {
    return (
      <div className="loader-containers" data-testid="loader">
        <Loader
          className="loader"
          type="ThreeDots"
          color="#0b69ff"
          height="70"
          width="70"
        />
      </div>
    )
  }
  renderFailureViewDetails = () => {
    return (
      <>
        <div className="failure-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
            className="failure-img"
          />
          <h1 className="heading">Oops! Something Went Wrong</h1>
          <p className="des">
            We cannot seem to find the page you are loocking for
          </p>
          <button className="retry-btn">Retry</button>
        </div>
      </>
    )
  }

  renderJobDetailsView = () => {
    const {jobDetailsData, lifeAtCompany, jobSkills, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetailsData
    const {description, imageUrl} = lifeAtCompany
    const {name, imageUrls} = jobSkills
    const {
      employmentTypes,
      jobDescriptions,
      ratings,
      titles,
      companyLogoUrls,
      locations,
    } = similarJobs

    return (
      <div className="job-details-container">
        <div className="mini-job-details-container">
          <div className="logo-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div>
              <h1 className="title">{title}</h1>
              <div className="rating-value">
                <BsStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="sal-location-content">
            <div className="sal-mini-container">
              <div className="salary-icons">
                <MdLocationOn size="18" color="#ffffff" />
                <p className="icons-names">{location}</p>
              </div>
              <div className="salary-icons">
                <BsBriefcaseFill size="17" color="#ffffff" />
                <p className="icons-names">{employmentType}</p>
              </div>
            </div>

            <p className="salary-perAnnum">{packagePerAnnum}</p>
          </div>
          <hr className="horizantal" />
          <div className="desicription-container">
            <div className="des-content">
              <h1 className="heading-des">Description</h1>

              <a href={companyWebsiteUrl} target="_blank" className="anchor">
                <button className="visit-link-btn" type="button">
                  <p className="visit">Visit</p>
                  <BsBoxArrowUpRight
                    size="18"
                    color="#6366f1"
                    className="arrow-box-icon"
                  />
                </button>
              </a>
            </div>
            <p className="job-description">{jobDescription}</p>
          </div>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list">
            {jobSkills.map(eachSkills => (
              <li key={eachSkills.id} className="skills-list-item">
                <img
                  src={eachSkills.imageUrls}
                  className="name"
                  className="skill-img"
                />
                <p className="skill-name">{eachSkills.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="skills-heading">Life at Company</h1>
          <div className="life-at-company">
            <p className="life-at-company-des">{description}</p>
            <img src={imageUrl} alt="life at company" className="life-at-img" />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-job-list">
          {similarJobs.map(eachjobs => (
            <li className="similar-job-item-list">
              <div className="similar-jobs">
                <img
                  src={eachjobs.companyLogoUrls}
                  alt="similar job company logo"
                  className="simi-company-logo"
                />
                <div className="simi-small-container">
                  <h1 className="simi-title">{eachjobs.titles}</h1>
                  <div className="simi-rating-container">
                    <BsStar className="star" size="15" />
                    <p className="simi-rating">{eachjobs.ratings}</p>
                  </div>
                </div>
              </div>
              <h1 className="simi-description">Description</h1>
              <p className="simi-job-des">{eachjobs.jobDescriptions}</p>
              <div className="sal-mini-container">
                <div className="salary-icons">
                  <MdLocationOn size="18" color="#ffffff" />
                  <p className="icons-names">{eachjobs.locations}</p>
                </div>
                <div className="salary-icons">
                  <BsBriefcaseFill size="18" color="#ffffff" />
                  <p className="icons-names">{eachjobs.employmentTypes}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  renderAllJobDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstains.success:
        return this.renderJobDetailsView()
      case apiStatusConstains.failure:
        return this.renderFailureViewDetails()
      case apiStatusConstains.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-items-container">
          {this.renderAllJobDetailsView()}
        </div>
      </>
    )
  }
}
export default JobDetails
