import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

let employeesData = [
  { "name": "Shalin Jain", "id": "1", "designation": "CEO", "team": "Core", "manager": null },
  {
    "name": "Suresh Kumar",
    "id": "2",
    "designation": "Manager",
    "team": "Help Desk",
    "manager": "1"
  },
  { "name": "Pooja", "id": "3", "designation": "HR", "team": "Core", "manager": "1" },
  { "name": "Shyam", "id": "4", "designation": "Developer", "team": "Help Desk", "manager": "2" },
  {
    "name": "Some random guy 1",
    "id": "5",
    "designation": "Developer",
    "team": "Help Desk",
    "manager": "2"
  },
  {
    "name": "Some random guy 2",
    "id": "6",
    "designation": "Developer",
    "team": "Help Desk",
    "manager": "3"
  },
  { "name": "Some random guy 3", "id": "7", "designation": "HR", "team": "Core", "manager": "3" }
];

const readEmployeesFile = () => {
  return employeesData;
};

const writeLatestData = (data) => {
  employeesData = data;
  return true;
};

export async function GET() {
  cookies();

  let data = readEmployeesFile();

  if (!data) {
    return NextResponse.json({ error_message: 'File Read Failed' }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request) {
  cookies();

  let data = null;

  try {
    data = await request.json();
  } catch (err) {
    // console.log(err);
  }

  if (!data?.length) {
    return NextResponse.json({ error_message: 'Wrong Paramaters' }, { status: 400 });
  }

  if (writeLatestData(data)) {
    return NextResponse.json('Success', { status: 200 });
  }

  return NextResponse.json({ error_message: 'An error occured in server side' }, { status: 500 });
}
