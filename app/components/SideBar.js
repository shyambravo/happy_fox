import { TEST_IDS } from '../enums/test-id.js';
import '../styles/sidebar.css';
import { ListComponent } from './ListComponent';

function SideBar(props) {
  const { employeeList, searchKeyWord, setSearchKeyWord, teamList, selectedTeam, setTeam } = props;

  return (
    <div className="side-bar" data-testid={TEST_IDS.SIDE_BAR}>
      <div className="side-bar__search">
        <input
          type="text"
          placeholder="Search"
          value={searchKeyWord}
          onChange={(event) => {
            setSearchKeyWord(event.target.value);
          }}
        />
        <button type="button">
          <img src="search-icon.png" width={20} alt="search" />
        </button>
        <select
          title="Search teams"
          onChange={(event) => setTeam(event.target.value)}
          value={selectedTeam}>
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
            <ListComponent person={employee} key={employee.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
