/* eslint-disable no-undef */
/* eslint-disable no-alert */
const getEmployeeListApi = async () => {
  let data = await fetch('/api');

  if (data.status === 200) {
    data = await data.json();
    return data;
  }

  //TODO: Placeholder to show toast for error message can be replaced with components
  alert('Data fetching failed');
  return false;
};

const updateEmployeeListApi = async (currentList) => {
  const response = await fetch('/api', {
    method: 'post',
    body: JSON.stringify(currentList)
  });

  if (response) {
    return true;
  }

  alert('failed');
  return false;
};

export { getEmployeeListApi, updateEmployeeListApi };
