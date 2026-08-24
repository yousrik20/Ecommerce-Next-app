import UserModal from "app/DBconfig/models/user";
import { connectMongoDB } from "app/DBconfig/mongoDB";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import ProductModal from "app/DBconfig/models/product";
import { uploadStream } from "helper/uploadImgCloudinary";

export async function GET(request) {
  await connectMongoDB();
  const arrData = await ProductModal.find();
  return NextResponse.json(arrData);
}
