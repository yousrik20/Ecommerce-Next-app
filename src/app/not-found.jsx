import Footer from "components/footer/footer";
import Header from "components/header/header";
import React from "react";

const NotFound = () => {
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
      <p style={{ textAlign: "center", fontSize: "2rem" }}>
        Sorry, the page you are looking for does not exist :(.
      </p>
      <Footer />
    </div>
  );
};

export default NotFound;
