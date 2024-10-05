import Header from '../Header'
import AllJobsList from '../AllJobsList'

import './index.css'

const Jobs = () => {
  return (
    <>
      <Header />
      <div className="jobs-container">
        <AllJobsList />
      </div>
    </>
  )
}
export default Jobs
