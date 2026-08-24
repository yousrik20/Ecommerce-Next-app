"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Link from "next/link";

const AdminBtn = ({ productId, imgPublicId }) => {
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null);

  const router = useRouter();

  const handleDelete = async () => {
    setisLoading(true);
    seterror(null);

    try {
      const response = await fetch("/api/deleteProduct", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          imgPublicId,
        }),
      });

      if (response.ok) {
        toast.success("Your product has been deleted successfully");
        router.push("/");
        router.refresh();
      } else {
        seterror("Failed to delete product. Please try again.");
      }
    } catch (err) {
      seterror("An error occurred. Please try again.");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div
      style={{ justifyContent: "center", gap: "2rem", marginTop: "3rem" }}
      className="flex"
    >
      <Link
        href={`/update-product/${productId}`}
        className="flex update-product"
      >
        <FontAwesomeIcon style={{ width: "1.1rem" }} icon={faPen} />
        Update Product
      </Link>

      <button onClick={handleDelete} disabled={isLoading} className="flex delete-product">
        <FontAwesomeIcon style={{ width: "1.1rem" }} icon={faTrash} />
        {isLoading ? "Loading..." : "Delete Product"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AdminBtn;
