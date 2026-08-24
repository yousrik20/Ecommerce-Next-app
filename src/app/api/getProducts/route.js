import ProductModal from "app/DBconfig/models/product";
import { connectMongoDB } from "app/DBconfig/mongoDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    // @ts-ignore
    const arrData = await ProductModal.find();

    return NextResponse.json(arrData);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
