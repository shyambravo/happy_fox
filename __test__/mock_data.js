const cardMockData = {
  name: 'Shyam',
  designation: 'developer',
  team: 'some team'
};

const listMockData = {
  name: 'shyam',
  designation: 'developer'
};

const employeesMockData = [
  { name: 'Shalin Jain', id: '1', designation: 'CEO', team: 'Core', manager: null },
  {
    name: 'Suresh Kumar',
    id: '2',
    designation: 'employee manager',
    team: 'Help Desk',
    manager: '1'
  },
  { name: 'Pooja', id: '3', designation: 'HR', team: 'Core', manager: '1' },
  { name: 'Shyam', id: '4', designation: 'developer', team: 'Help Desk', manager: '2' },
  {
    name: 'Some random guy',
    id: '5',
    designation: 'developer',
    team: 'Help Desk',
    manager: '2'
  }
];

export { cardMockData, listMockData, employeesMockData };
