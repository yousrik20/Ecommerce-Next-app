import Header from "components/header/header";
import React from "react";
import UpdateForm from "./updateForm";

const Page = async ({ params }) => {
  const resolvedParams = await params;

  return (
    <>
      <Header isAdminPage={false} />
      <main className="px-3">
        <UpdateForm productId={resolvedParams.id} />
      </main>
    </>
  );
};

export default Page;
