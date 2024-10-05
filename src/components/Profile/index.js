import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusContants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {
    userData: {},
    apiStatus: apiStatusContants.initial,
  }

  componentDidMount() {
    this.getUserData()
  }

  getFormattedData = data => ({
    name: data.name,
    profileImageUrl: data.profile_image_url,
    shortBio: data.short_bio,
  })

  getUserData = async () => {
    // event.preventDefault()
    this.setState({apiStatus: apiStatusContants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.status === 200) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData.profile_details)
      this.setState({
        userData: updatedData,
        apiStatus: apiStatusContants.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusContants.failure})
    }
  }

  onClickRetry = () => {
    this.getUserData()
  }
  renderFailureView = () => {
    return (
      <div className="failure-content">
        <button type="button" className="retry-btn" onClick={this.onClickRetry}>
          Retry
        </button>
      </div>
    )
  }

  renderLoadingView = () => {
    return (
      <div className="loader-container">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    )
  }

  renderProfileView = () => {
    const {userData} = this.state
    const {name, profileImageUrl, shortBio} = userData

    return (
      <>
        <div className="profile">
          <img src={profileImageUrl} alt="profile" className="profile-img" />
          <h1 className="name">{name}</h1>
          <p className="bio">{shortBio}</p>
        </div>
      </>
    )
  }

  renderProfileViewData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContants.success:
        return this.renderProfileView()
      case apiStatusContants.failure:
        return this.renderFailureView()
      case apiStatusContants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="profile-container">
          {this.renderProfileViewData()}
          <hr className="horizental" />
        </div>
      </>
    )
  }
}
export default Profile
