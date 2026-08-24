import ProductModal from "app/DBconfig/models/product";
import { connectMongoDB } from "app/DBconfig/mongoDB";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function PUT(request) {
  try {
    const objFromFrontEnd = await request.json();
    const { productId, title, price, description } = objFromFrontEnd;

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    await connectMongoDB();

    await ProductModal.updateOne(
      { _id: productId },
      { title, price, description }
    );

    revalidatePath("/");


    return NextResponse.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
