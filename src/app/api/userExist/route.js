import UserModal from "app/DBconfig/models/user";
import { connectMongoDB } from "app/DBconfig/mongoDB";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const objFromFrontEnd = await request.json();

    await connectMongoDB();

    // @ts-ignore
    const user = await UserModal.findOne({
      email: objFromFrontEnd.email,
    });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
