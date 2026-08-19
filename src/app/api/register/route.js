import { NextResponse } from "next/server";

export async function POST(request) {
  // 1- Recieve data from Front-end
  const objFromFrontEnd = await request.json();
  console.log(objFromFrontEnd);

  // 2- connect to DB

  // 3- Try to store obj to DB
  // 4- Go back to frontend

  return NextResponse.json({});
}
