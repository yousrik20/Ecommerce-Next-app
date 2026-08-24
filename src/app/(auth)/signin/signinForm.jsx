"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

const SigninForm = () => {
  const router = useRouter();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null);

  const handleSubmit = async (eo) => {
    eo.preventDefault();
    setisLoading(true);
    seterror(null);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res?.ok) {
        seterror("Invalid email or password");
      } else {
        router.replace("/");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      seterror("An error occurred during sign in.");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
      <div className="mb-4">
        <label htmlFor="signinEmail" className="form-label">
          Email address
        </label>
        <input
          value={email}
          onChange={(eo) => setemail(eo.target.value)}
          type="email"
          className="form-control"
          id="signinEmail"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="signinPassword" className="form-label">
          Password
        </label>
        <input
          value={password}
          onChange={(eo) => setpassword(eo.target.value)}
          type="password"
          className="form-control"
          id="signinPassword"
          required
        />
      </div>

      <button
        disabled={!email || !password || isLoading}
        type="submit"
        className="btn btn-primary"
      >
        {isLoading ? (
          <div
            style={{ width: "1.5rem", height: "1.5rem" }}
            className="spinner-border"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          "Sign in"
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

export default SigninForm;
