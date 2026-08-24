import Footer from "components/footer/footer";
import Header from "components/header/header";
import "./product-details.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { notFound } from "next/navigation";
import Image from "next/image.js";
import AdminBtn from "./adminBtn";
import { connectMongoDB } from "app/DBconfig/mongoDB";
import ProductModal from "app/DBconfig/models/product";
import mongoose from "mongoose";

// دالة جلب البيانات مباشرة من قاعدة البيانات
async function getProductData(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  await connectMongoDB();
  // @ts-ignore
  const product = await ProductModal.findById(id).lean();

  if (!product) {
    notFound();
  }

  // تحويل ObjectId إلى String لتجنب أخطاء Serialization
  return JSON.parse(JSON.stringify(product));
}

export async function generateMetadata({ params }) {
  const objData = await getProductData(params.id);
  return {
    title: objData.title,
    description: objData.description,
  };
}

const Page = async ({ params }) => {
  const objData = await getProductData(params.id);

  return (
    <div
      className="product-details"
      style={{
        height: "100vh",
        display: "grid",
        alignItems: "center",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      <Header />

      <div>
        <main style={{ textAlign: "center" }} className="flex">
          <Image
            width={266}
            height={270}
            quality={100}
            alt={objData.title || "Product image"}
            src={`${objData.productImg}`}
          />
          <div className="product-details">
            <div style={{ justifyContent: "space-between" }} className="flex">
              <h2>{objData.title}</h2>
              <p className="price">${objData.price}</p>
            </div>
            <p className="description">{objData.description}</p>
            <button className="flex add-to-cart">
              <FontAwesomeIcon style={{ width: "1.1rem" }} icon={faCartPlus} />
              Add To Cart
            </button>
          </div>
        </main>

        <AdminBtn productId={params.id} imgPublicId={objData.imgPublicId} />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
