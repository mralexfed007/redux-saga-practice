export default function SearchForm({searchPeople}) {
  return (
    <div className="field">
      <label className="label">Username</label>
      <div className="control has-icons-left has-icons-right">
        <input className="input" type="text" placeholder="Search people ..." onChange={searchPeople} />
        <span className="icon is-small is-left">
          <i className="fas fa-jedi"></i>
        </span>
        <span className="icon is-small is-right">
          <i className="fas fa-search"></i>
        </span>
      </div>
    </div>
  )
}