'use client';

import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import './style.css';
import { getEmployeeListApi, updateEmployeeListApi } from './api';
import { getEmployeesFromStore, setEmployeesToStore } from './client-data-store/employee-store';
import { TreeContainer } from './components/TreeContainer';
import { TEST_IDS } from './enums/test-id';

export default function Home() {
  const [isPageLoading, setPageLoader] = useState(true);
  const [isTreeLoading, setTreeLoader] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [selectedTeam, setTeam] = useState('all');
  const [searchKeyWord, setSearchKeyWord] = useState("")

  const filterEmployees = () => {
    const searchString = searchKeyWord.toLowerCase();
    let employeeListCopy = JSON.parse(JSON.stringify(getEmployeesFromStore()));

    employeeListCopy = employeeListCopy.filter((employee) => {
      let flag = false;

      if (employee.name.toLowerCase().includes(searchString)) {
        flag = true;
      }

      if (employee.designation.toLowerCase().includes(searchString)) {
        flag = true;
      }

      if (employee.team.toLowerCase().includes(searchString)) {
        flag = true;
      }

      if (selectedTeam !== 'all') {
        if (!employee.team.includes(selectedTeam)) {
          flag = false;
        }
      }

      return flag;
    });

    setEmployeeList(employeeListCopy);
  };

  const editManager = async (personID, managerID) => {
    if (isTreeLoading) {
      return;
    }

    setTreeLoader(true);

    const employeeListCopy = JSON.parse(JSON.stringify(getEmployeesFromStore()));
    const personToBeEdited = employeeListCopy.find((employee) => employee.id === personID);
    const currentManagerID = personToBeEdited.manager;

    employeeListCopy.forEach((employee) => {
      if (employee.manager === personID) {
        employee.manager = currentManagerID;
      }
    });

    personToBeEdited.manager = managerID;
    const result = await updateEmployeeListApi(employeeListCopy);

    setTreeLoader(false);

    if (result) {
      setEmployeesToStore(employeeListCopy);
      filterEmployees();
    }
  };

  const fetchData = async () => {
    const data = await getEmployeeListApi();
    let teams = {};

    if (data) {
      data.forEach((employee) => {
        teams[employee.team] = true;
      });

      setTeamList(Object.keys(teams));
      setEmployeesToStore(data);
      setEmployeeList(data);
    }

    setPageLoader(false);
  };

  useEffect(() => {
    if (!isPageLoading) {
      filterEmployees();
    }
  }, [selectedTeam, searchKeyWord]);

  useEffect(() => {
    if (isPageLoading) {
      fetchData();
    }
  }, []);

  return (
    <>
      <NavBar />
      <main className="main">
        <div className="container">
          {isPageLoading ? (
            <div className="loader">Loading...</div>
          ) : (
            <SideBar
              employeeList={employeeList}
              teamList={teamList}
              selectedTeam={selectedTeam}
              searchKeyWord={searchKeyWord}
              setSearchKeyWord={setSearchKeyWord}
              setTeam={setTeam}
            />
          )}
          {!isPageLoading && (
            <div className="content" data-testid={TEST_IDS.MAIN_CONTENT}>
              <h3>Team Hierarchy</h3>
              <img
                src="line_loader.svg"
                className={isTreeLoading ? 'show-tree-loader' : 'hide-tree-loader'}
              />
              <TreeContainer employeeList={employeeList} editManager={editManager} />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
