"use client";
import React, { Suspense } from "react";
import Loader from "@/components/loader";
import ClientDefaultLayout from "@/app/client/components/default-layout";
import PetForm from "@/app/client/components/blog-form";
const Page = () => {
  return (
    <ClientDefaultLayout>
      <Suspense fallback={<Loader/>}>
      <PetForm />
      </Suspense>
    </ClientDefaultLayout>
  );
};

export default Page;
