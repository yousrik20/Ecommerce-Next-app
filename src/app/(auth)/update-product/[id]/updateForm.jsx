"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UpdateForm = ({ productId }) => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [isLoading, setisLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, seterror] = useState(null);

  // 1. جلب بيانات المنتج بالمسار النسبي
  useEffect(() => {
    const getData = async (id) => {
      try {
        const res = await fetch(`/api/getOneProduct?id=${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await res.json();
        setTitle(data.title || "");
        setPrice(data.price || "");
        setDescription(data.description || "");
      } catch (err) {
        console.error(err);
        seterror("Failed to load product details");
      } finally {
        setIsFetching(false);
      }
    };

    if (productId) {
      getData(productId);
    }
  }, [productId]);

  // 2. إرسال بيانات التحديث
  const handleSubmit = async (eo) => {
    eo.preventDefault();
    setisLoading(true);
    seterror(null);

    if (!title || !price || !description) {
      seterror("All inputs must be filled");
      setisLoading(false);
      return;
    }

    try {
      // استخدام المسار النسبي بدلاً من localhost
      const response = await fetch("/api/updateProduct", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          price: Number(price),
          description,
          productId,
        }),
      });

      if (response.ok) {
        toast.success("Product updated successfully");
        router.push(`/product/${productId}`);
        router.refresh(); // إعادة تحديث الكاش على Vercel
      } else {
        const data = await response.json();
        seterror(data.error || "Failed to update product, please try again");
      }
    } catch (err) {
      console.error(err);
      seterror("An error occurred. Please try again.");
    } finally {
      setisLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div style={{ textAlign: "center", padding: "3rem" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading product...</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
      <div className="mb-4">
        <label htmlFor="titleInput" className="form-label">
          Product Title:
        </label>
        <input
          value={title}
          required
          onChange={(eo) => setTitle(eo.target.value)}
          type="text"
          className="form-control"
          id="titleInput"
          placeholder="T-shirt"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="priceInput" className="form-label">
          Product Price:
        </label>
        <input
          value={price}
          step="0.01"
          placeholder="$99.99"
          required
          onChange={(eo) => setPrice(eo.target.value)}
          type="number"
          className="form-control"
          id="priceInput"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="descInput" className="form-label">
          Product Description:
        </label>
        <textarea
          value={description}
          placeholder="Product Description....."
          required
          onChange={(eo) => setDescription(eo.target.value)}
          rows={3}
          className="form-control"
          id="descInput"
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? (
          <div
            style={{ width: "1.5rem", height: "1.5rem" }}
            className="spinner-border"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          "Update Product"
        )}
      </button>

      {error && (
        <p style={{ color: "#ff7790", fontSize: "1.1rem", marginTop: "1rem" }}>
          {error}
        </p>
      )}
    </form>
  );
};

export default UpdateForm;
