import { cookies } from 'next/headers';
import { readFileSync, writeFileSync } from 'fs';
import { NextResponse } from 'next/server';

const readEmployeesFile = () => {
  let data = [];

  try {
    data = readFileSync(process.cwd() + '/app/api/employees.json', 'utf8');
  } catch (err) {
    return false;
  }

  return JSON.parse(data);
};

const writeLatestData = (data) => {
  try {
    writeFileSync(process.cwd() + '/app/api/employees.json', JSON.stringify(data));
  } catch (err) {
    console.log(err);
    return false;
  }

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
