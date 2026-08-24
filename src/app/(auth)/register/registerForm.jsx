"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [isRed, setisRed] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  const [error, seterror] = useState(null);
  const router = useRouter();

  const handleSubmit = async (eo) => {
    eo.preventDefault();
    setloading(true);
    seterror(null);
    setisRed(false);

    if (!name || !email || !password) {
      seterror("All inputs must be filled");
      toast.error("All inputs must be filled");
      setloading(false);
      return;
    }

    const regPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    if (!regPassword.test(password)) {
      setisRed(true);
      setloading(false);
      seterror(
        "Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 special character and 1 numeric."
      );
      return;
    }

    try {
      // 1. التثبت من وجود المستخدم باستخدام المسار المطلق /api
      const resUserExist = await fetch("/api/userExist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const isUserExist = await resUserExist.json();

      if (isUserExist.user) {
        seterror("Email Already exists");
        toast.error("Email Already exists");
        setloading(false);
        return;
      }

      // 2. إنشاء الحساب
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        toast.success("Your account has been created successfully");
        router.push("/signin");
      } else {
        seterror("Failed to create account, Please try again");
      }
    } catch (err) {
      console.error(err);
      seterror("An error occurred. Please try again.");
    } finally {
      setloading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
      <div className="mb-4">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          value={name}
          onChange={(eo) => setname(eo.target.value)}
          required
          type="text"
          className="form-control"
          id="username"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="regEmail" className="form-label">
          Email address
        </label>
        <input
          value={email}
          required
          onChange={(eo) => setemail(eo.target.value)}
          type="email"
          className="form-control"
          id="regEmail"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="regPassword" className="form-label">
          Password
        </label>
        <input
          value={password}
          style={{ backgroundColor: isRed ? "#fcaaaa" : undefined }}
          required
          onChange={(eo) => setpassword(eo.target.value)}
          type="password"
          className="form-control"
          id="regPassword"
        />
      </div>

      <button
        disabled={!name || !email || !password || loading}
        type="submit"
        className="btn btn-primary"
      >
        {loading ? (
          <div
            style={{ width: "1.5rem", height: "1.5rem" }}
            className="spinner-border"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          "Create Account"
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

export default RegisterForm;
