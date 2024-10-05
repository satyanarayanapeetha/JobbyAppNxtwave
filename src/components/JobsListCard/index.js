import './index.css'

const JobsListCard = props => {
  const renderEmployeList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(employe => {
      const {activeEmployementTypeId, onChangeEmployementType} = props
      const onClickEmployeType = () =>
        onChangeEmployementType(employe.employmentTypeId)
      const employeTypeClassName =
        activeEmployementTypeId === employe.employmentTypeId
          ? 'employee-type active-employee'
          : 'employee-type'
      return (
        <li
          className="employment-type"
          key={employe.employmentTypeId}
          onClick={onClickEmployeType}
        >
          <input type="checkbox" className={employeTypeClassName} />
          <label className="label">{employe.label}</label>
        </li>
      )
    })
  }

  const employementListView = () => {
    return (
      <div className="joblist-container">
        <h1 className="emp-type-heading-emp">Type of Employment</h1>
        <ul className="emp-list-type">{renderEmployeList()}</ul>
      </div>
    )
  }
  const rendersalaryRangesList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(salary => {
      const {activeSalaryRangeId, onChangeSalaryRange} = props
      const onClickSalaryRange = () => onChangeSalaryRange(salary.salaryRangeId)
      const salaryRangeClassName =
        activeSalaryRangeId === salary.salaryRangeId
          ? 'salary-range active-range'
          : 'salary-range'
      return (
        <li
          className="employment-type"
          key={salary.salaryRangeId}
          onClick={onClickSalaryRange}
        >
          <input type="radio" className={salaryRangeClassName} />
          <label className="label">{salary.label}</label>
        </li>
      )
    })
  }

  const salaryRangesListView = () => {
    return (
      <div className="joblist-container">
        <h1 className="emp-type-heading-sal">Salary Range</h1>
        <ul className="emp-list-type">{rendersalaryRangesList()}</ul>
      </div>
    )
  }

  return (
    <>
      <div className="all-jobs-checking-list">
        {employementListView()}
        <hr className="horizental" />
        {salaryRangesListView()}
      </div>
    </>
  )
}
export default JobsListCard
