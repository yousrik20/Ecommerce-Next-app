import Footer from "components/footer/footer";
import Header from "components/header/header";
import React from "react";
import "./product-details.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { notFound } from "next/navigation";

async function getData(id) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch(`http://localhost:4000/products/${id}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    notFound();
  }

  return res.json();
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const objData = await getData(resolvedParams.id);
  return {
    title: objData.title,
    description: objData.description,
  };
}
const Page = async ({ params }) => {
  const resolvedParams = await params;
  console.log(resolvedParams.id);
  const objData = await getData(resolvedParams.id);
  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        alignItems: "center",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      <Header />
      <main style={{ textAlign: "center" }} className="flex">
        <img alt="" src={`.${objData.productImg}`} />
        <div className="product-details">
          <div style={{ justifyContent: "space-between" }} className="flex">
            <h2>{objData.title}</h2>
            <p className="price">${objData.price} </p>
          </div>
          <p className="description">{objData.description}</p>
          <button className="flex add-to-cart">
            <FontAwesomeIcon style={{ width: "1.1rem" }} icon={faCartPlus} />
            Add To Cart
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Page;
