import UserModal from "app/DBconfig/models/user";
import { connectMongoDB } from "app/DBconfig/mongoDB";
import { NextResponse } from "next/server";

export async function POST(request) {
  // 1- Recieve data from Front-end
  const objFromFrontEnd = await request.json();
  console.log(objFromFrontEnd);

  // 2- connect to DB
  await connectMongoDB();
  // 3- Check Email Exist
  const user = await UserModal.findOne({
    // @ts-ignore
    email: objFromFrontEnd.email,
  });

  // 4- Go back to frontend

  return NextResponse.json({ user });
}
