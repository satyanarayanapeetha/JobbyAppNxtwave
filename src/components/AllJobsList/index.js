import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import JobCard from '../JobCard'
import Profile from '../Profile'
import JobsListCard from '../JobsListCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstains = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}
class AllJobsList extends Component {
  state = {
    jobList: [],
    apiStatus: apiStatusConstains.initial,
    searchInput: '',
    activeSalaryRangeId: '',
    activeEmployementTypeId: '',
  }

  componentDidMount() {
    this.getJobList()
  }

  getJobList = async () => {
    this.setState({apiStatus: apiStatusConstains.inProgress})

    const {activeEmployementTypeId, activeSalaryRangeId, searchInput} =
      this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmployementTypeId}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachData => ({
        companyLogoUrl: eachData.company_logo_url,
        employmentType: eachData.employment_type,
        id: eachData.id,
        jobDescription: eachData.job_description,
        location: eachData.location,
        packagePerAnnum: eachData.package_per_annum,
        rating: eachData.rating,
        title: eachData.title,
      }))
      // console.log(updatedData)

      this.setState({
        jobList: updatedData,
        apiStatus: apiStatusConstains.success,
      })
    }

    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstains.failure})
    }
  }

  onClickSearchInput = () => {
    const {jobList} = this.state
    const searchInputTab = document.getElementById('search').value

    if (searchInputTab === '') {
      this.getJobList()
    } else {
      const trimmedValue = searchInputTab.trim().toLowerCase()

      const searchResult = jobList.filter(eachValue =>
        eachValue.title.toLowerCase().includes(trimmedValue),
      )
      this.setState({jobList: searchResult})
    }
  }

  onChangeSalaryRange = activeSalaryRangeId => {
    this.setState({activeSalaryRangeId}, this.getJobList)
  }
  onChangeEmployementType = activeEmployementTypeId => {
    this.setState({activeEmployementTypeId}, this.getJobList)
  }

  renderJobListView = () => {
    const {jobList} = this.state
    const shouldShowJobList = jobList.length > 0

    return shouldShowJobList ? (
      <div>
        <ul className="job-list">
          {jobList.map(eachData => (
            <JobCard jobDetails={eachData} key={eachData.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-job-img"
        />
        <h1 className="no-job-heading">No Jobs Found</h1>
        <p className="no-job-desicrptions">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderLoadingView = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height="70" width="70" />
      </div>
    )
  }

  renderFailureView = () => {
    return (
      <>
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
            className="failure-img"
          />
          <h1 className="heading">Oops! Something Went Wrong</h1>
          <p className="sm-desicrptions">
            We cannot seem to find the page you are looking for
          </p>
          <button type="button" className="retry-btn">
            Retry
          </button>
        </div>
      </>
    )
  }

  renderAllViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstains.success:
        return this.renderJobListView()
      case apiStatusConstains.failure:
        return this.renderFailureView()
      case apiStatusConstains.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeEmployementTypeId, activeSalaryRangeId, searchInput} =
      this.state

    return (
      <>
        <div className="all-jobs-container">
          <div className="min-container">
            <Profile />
            <JobsListCard
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              activeEmployementTypeId={activeEmployementTypeId}
              activeSalaryRangeId={activeSalaryRangeId}
              onChangeEmployementType={this.onChangeEmployementType}
              onChangeSalaryRange={this.onChangeSalaryRange}
            />
          </div>

          <div className="search-container">
            <div className="search-contant">
              <input
                type="search"
                className="search-input"
                placeholder="search"
                id="search"
              />
              <button
                className="search-btn"
                type="button"
                data-testid="searchButton"
                onClick={this.onClickSearchInput}
              >
                <BsSearch size="15" color="#ffffff" className="search-icon" />
              </button>
            </div>

            <div className="view-container">{this.renderAllViews()}</div>
          </div>
        </div>
      </>
    )
  }
}
export default AllJobsList
