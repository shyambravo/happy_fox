// Classical way of persisting data in window global, State management libraries like redux could be used

const STORE_NAME = 'employees';

const setEmployeesToStore = (employeeList) => {
  window[STORE_NAME] = employeeList;
};

const getEmployeesFromStore = () => {
  if (!window[STORE_NAME]) {
    return [];
  }

  return window[STORE_NAME];
};

export { setEmployeesToStore, getEmployeesFromStore };
