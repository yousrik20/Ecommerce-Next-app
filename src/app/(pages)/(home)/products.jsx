"use client";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image.js";
import { useEffect, useState } from "react";

// const arr = [
//   { productImg: "./images/1.png" },
//   { productImg: "./images/2.webp" },
//   { productImg: "./images/3.webp" },
//   { productImg: "./images/4.webp" },
//   { productImg: "./images/5.webp" },
//   { productImg: "./images/6.webp" },
//   { productImg: "./images/7.webp" },
//   { productImg: "./images/8.png" },
// ];

/*
async function getData() {
  // await new Promise(resolve => setTimeout(resolve, 3000))

  const res = await fetch("http://localhost:4000/products", {
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    notFound();
  }

  return res.json();
}
*/

const Products = () => {
  const [arrData, setarrData] = useState([]);
  useEffect(() => {
    const getData = async (params) => {
      const res = await fetch("/api/getProducts");

      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        notFound();
      }
      const data = await res.json();
      setarrData(data);
    };
    getData();
  }, []);
  return (
    <section className="products flex">
      {arrData.length == 0 && <p>No Products Found!</p>}
      {arrData.map((item) => {
        return (
          <article title={item.title} key={item._id} className="card">
            <Link href={`/product-details/${item._id}`}>
              <Image
                quality={100}
                width={266}
                height={260}
                src={item.productImg}
                alt=""
              />
            </Link>
            <div style={{ width: "266px" }} className="content">
              <h4 className="title">{item.title.slice(0, 15)}...</h4>
              <p className="description">
                {item.description.slice(0, 111)}....
              </p>
              <div
                className="flex"
                style={{
                  justifyContent: "space-between",
                  paddingBottom: "0.7rem",
                }}
              >
                <div className="price">${item.price}</div>
                <button className="add-to-cart flex">
                  <FontAwesomeIcon
                    style={{ width: "1rem" }}
                    icon={faCartPlus}
                  />
                  Add To Cart
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Products;
