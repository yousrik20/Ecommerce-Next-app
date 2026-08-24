import UserModal from "app/DBconfig/models/user";
import { connectMongoDB } from "app/DBconfig/mongoDB";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import ProductModal from "app/DBconfig/models/product";
import { uploadStream } from "helper/uploadImgCloudinary";

export async function POST(request) {
  // 1- Receive data from Front-end
  const objFromFrontEnd = await request.formData();
  console.log(objFromFrontEnd);

  const productImg = objFromFrontEnd.get("productImg");
  console.log(productImg);

  // Convert Img into Buffer & Upload Image to Cloudinary
  const bytes = await productImg.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadedImg = await uploadStream(buffer);
  const imgURL = uploadedImg.url;
  console.log("=========DONE ===========");
  // 2- connect to DB
  await connectMongoDB();

  // 4- Try to Store obj to DB
  await ProductModal.create({
    title: objFromFrontEnd.get("title"),
    price: objFromFrontEnd.get("price"),
    description: objFromFrontEnd.get("description"),
  });

  // 5- Go back to frontend
  return NextResponse.json({ message: "product added successfully" });
}
