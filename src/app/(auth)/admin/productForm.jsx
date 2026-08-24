"use client";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductForm = () => {
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null);

  const handleSubmit = async (eo) => {
    eo.preventDefault();
    setisLoading(true);
    seterror(null);

    if (!img || !title || !price || !description) {
      seterror("All inputs must be filled including the product image");
      setisLoading(false);
      return;
    }

    const formData = new FormData();
    formData.set("productImg", img);
    formData.set("title", title);
    formData.set("price", price);
    formData.set("description", description);

    try {
      // تم إضافة / في بداية المسار للعمل بشكل صحيح أونلاين
      const resAddProduct = await fetch("/api/addProduct", {
        method: "POST",
        body: formData,
      });

      const data = await resAddProduct.json();

      if (resAddProduct.ok) {
        eo.target.reset();
        setTitle("");
        setPrice("");
        setDescription("");
        setImg(null);
        toast.success(data.message || "Product added successfully");
      } else {
        seterror(data.error || "Failed to add Product, Please try again");
      }
    } catch (err) {
      console.error(err);
      seterror("An error occurred. Please try again.");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
      <div className="mb-4">
        <label htmlFor="productImg" className="form-label">
          Product Image:
        </label>
        <input
          onChange={(eo) => setImg(eo.target.files[0])}
          required
          type="file"
          className="form-control"
          id="productImg"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="productTitle" className="form-label">
          Product Title:
        </label>
        <input
          value={title}
          required
          onChange={(eo) => setTitle(eo.target.value)}
          type="text"
          className="form-control"
          id="productTitle"
          placeholder="T-shirt"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="productPrice" className="form-label">
          Product Price:
        </label>
        <input
          value={price}
          step={0.01}
          placeholder="$99.99"
          required
          onChange={(eo) => setPrice(eo.target.value)}
          type="number"
          className="form-control"
          id="productPrice"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="productDesc" className="form-label">
          Product Description:
        </label>
        <textarea
          value={description}
          placeholder="Product Description....."
          required
          onChange={(eo) => setDescription(eo.target.value)}
          rows={3}
          className="form-control"
          id="productDesc"
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
          "Add Product"
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

export default ProductForm;
