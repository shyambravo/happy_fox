"use client";

import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import "./style.css";
import { getEmployeeListApi } from "./api";
import {
  getEmployeesFromStore,
  setEmployeesToStore,
} from "./client-data-store/employee-store";

export default function Home() {
  const [isLoading, setLoader] = useState(true);
  const [employeeList, setEmployeeList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [selectedTeam, setTeam] = useState("all");

  const filterEmployees = (searchKeyWord = "") => {
    searchKeyWord = searchKeyWord.toLowerCase();
    let employeeListCopy = JSON.parse(JSON.stringify(getEmployeesFromStore()));

    employeeListCopy = employeeListCopy.filter((employee) => {
      let flag = false;

      if (employee.name.toLowerCase().includes(searchKeyWord)) {
        flag = true;
      }

      if (employee.designation.toLowerCase().includes(searchKeyWord)) {
        flag = true;
      }

      if (employee.team.toLowerCase().includes(searchKeyWord)) {
        flag = true;
      }

      if (selectedTeam !== "all") {
        if (!employee.team.includes(selectedTeam)) {
          flag = false;
        }
      }

      return flag;
    });

    setEmployeeList(employeeListCopy);
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

    setLoader(false);
  };

  useEffect(() => {
    if (!isLoading) {
      filterEmployees();
    }
  }, [selectedTeam]);

  useEffect(() => {
    if (isLoading) {
      fetchData();
    }
  }, []);

  return (
    <>
      <NavBar />
      <main className="main">
        <div className="container">
          {isLoading ? (
            <div className="loader">Loading...</div>
          ) : (
            <SideBar
              employeeList={employeeList}
              filterEmployees={filterEmployees}
              teamList={teamList}
              selectedTeam={selectedTeam}
              setTeam={setTeam}
            />
          )}
        </div>
      </main>
    </>
  );
}
