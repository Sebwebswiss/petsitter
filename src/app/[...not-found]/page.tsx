import Button from "@/components/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <div className="bg-white h-24"></div>
      <div className="max-w-[90%] lg:max-w-6xl 2xl:max-w-7xl mx-auto flex gap-10 pb-20 flex-col md:flex-row">
        <div className="md:w-1/2">
          <img src="/images/notfound.png" alt="404 image" />
        </div>
        <div className="md:w-1/2 flex flex-col md:justify-center items-center md:items-start flex-grow-0">
          <h1 className="text-6xl text-primary font-heading font-extrabold">
            Opppps!
          </h1>
          <p className="text-2xl text-secondary mt-5 text-center md:text-left">
            The Page you&apos;re looking for not found
          </p>
          <div className="mt-10">
            <Link href={"/"}>
            <Button value="GO TO HOME &rarr;" type="filled" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
