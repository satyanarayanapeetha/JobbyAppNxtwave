import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
    console.log('hi')
  }

  return (
    <>
      <nav className="nav-container">
        <div className="nav-content">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
          <div className="header-content">
            <ul className="header-content">
              <Link to="/" className="link-item">
                <li className="header-list">Home</li>
              </Link>
              <Link to="/jobs" className="link-item">
                <li className="header-list">Jobs</li>
              </Link>
              <Link to="" className="link-item">
                <li className="header-list"></li>
              </Link>
            </ul>
          </div>
          <button type="button" className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>
    </>
  )
}
export default withRouter(Header)
