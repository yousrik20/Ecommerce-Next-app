import UserModal from "app/DBconfig/models/user";
import { connectMongoDB } from "app/DBconfig/mongoDB";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const objFromFrontEnd = await request.json();

    if (!objFromFrontEnd.email || !objFromFrontEnd.password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectMongoDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(objFromFrontEnd.password, salt);

    // @ts-ignore
    await UserModal.create({
      name: objFromFrontEnd.name,
      email: objFromFrontEnd.email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
