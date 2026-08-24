import ProductModal from "app/DBconfig/models/product";
import { connectMongoDB } from "app/DBconfig/mongoDB";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function DELETE(request) {
  try {
    const objFromFrontEnd = await request.json();
    const { productId, imgPublicId } = objFromFrontEnd;

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    await connectMongoDB();

    // 1- حذف المنتج من قاعدة البيانات
    await ProductModal.deleteOne({ _id: productId });

    // 2- حذف الصورة من Cloudinary إذا كان لديها ID
    if (imgPublicId) {
      await cloudinary.uploader.destroy(imgPublicId);
    }

    // 3- تحديث الكاش لتختفي الصفحة أو المنتج من القائمة
    revalidatePath("/");

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
