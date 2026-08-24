import { connectMongoDB } from "app/DBconfig/mongoDB";
import { NextResponse } from "next/server";
import ProductModal from "app/DBconfig/models/product";
import { uploadStream } from "helper/uploadImgCloudinary";

export async function POST(request) {
  try {
    const objFromFrontEnd = await request.formData();
    const productImg = objFromFrontEnd.get("productImg");

    if (!productImg) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const bytes = await productImg.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadedImg = await uploadStream(buffer);
    const imgURL = uploadedImg.url;
    const publicId = uploadedImg.public_id;

    await connectMongoDB();

    // @ts-ignore
    await ProductModal.create({
      productImg: imgURL,
      title: objFromFrontEnd.get("title"),
      price: objFromFrontEnd.get("price"),
      description: objFromFrontEnd.get("description"),
      imgPublicId: publicId,
    });

    return NextResponse.json({ message: "Product added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Add Product Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
