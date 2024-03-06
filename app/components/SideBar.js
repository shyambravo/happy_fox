import '../styles/sidebar.css';

function SideBar(props) {
  const { employeeList, filterEmployees, teamList, selectedTeam, setTeam } = props;

  return (
    <div className="side-bar">
      <div className="side-bar__search">
        <input
          type="text"
          placeholder="Search"
          onChange={(event) => {
            filterEmployees(event.target.value);
          }}
        />
        <button type="button">
          <img src="search-icon.png" width={20} alt="search" />
        </button>
        <select
          title="Search teams"
          onChange={(event) => setTeam(event.target.value)}
          value={selectedTeam}
        >
          <option value="all">All Teams</option>
          {teamList.map((team) => (
            <option value={team} key={team}>
              {team}
            </option>
          ))}
        </select>
      </div>
      <div className="side-bar__list">
        <ul className="list">
          {employeeList.map((employee) => (
            <li className="list-item" key={employee.id}>
              <img src="avatar.png" alt="profile" className="list-image" />
              <div className="list-description">
                <h3>{employee.name}</h3>
                <p>{employee.designation}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
