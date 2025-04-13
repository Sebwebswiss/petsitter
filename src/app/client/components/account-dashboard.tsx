"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetPetsStatsQuery } from "@/features/petsApi";

const AccountDashboard = () => {
  const { data, isFetching } = useGetPetsStatsQuery("");
  const pets = data?.data;

  if (!isFetching) {
    return (
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-6 xl:px-7.5 gap-4 md:gap-0">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex bg-white flex-col md:flex-row rounded-lg shadow-md justify-between items-center">
            <div className="flex flex-col items-center flex-1 p-3">
              <p className="text-xl text-center">You have created</p>
              <p className="font-bold text-8xl text-center text-golden">
                {pets?.dogs}
              </p>
              <p className="text-xl text-center ">Dogs Profiles</p>
              <Link href="/client/dashboard/pets">
                <button className="mt-4 bg-golden text-black text-sm rounded px-10 py-2 font-semibold hover:bg-[#001D3D]">
                  See all Dogs
                </button>
              </Link>
            </div>
            <Image
              src="/images/young-brown.png"
              alt="dogs-count"
              height={120}
              width={200}
              className="md:rounded-br-[10px] hidden md:block"
            />
          </div>
          <div className="flex bg-white rounded-lg shadow-md justify-between items-center">
            <div className="flex flex-col items-center flex-1 p-3">
              <p className="text-xl text-center">You have created</p>
              <p className="font-bold text-8xl text-center text-golden">
                {pets?.cats}
              </p>
              <p className="text-xl text-center ">Cats Profiles</p>
              <Link href="/client/dashboard/pets">
                <button className="mt-4 bg-golden text-black text-sm rounded px-10 py-2 font-semibold hover:bg-[#001D3D]">
                  See all Cats
                </button>
              </Link>
            </div>
            <Image
              src="/images/cats.png"
              alt="cats-count"
              height={100}
              width={210}
              className="hidden md:block"
            />
          </div>
        </div>
        <Link href="/client/dashboard/pets">
          <button className="bg-golden text-black w-full text-sm rounded px-8 py-2 font-semibold hover:bg-[#001D3D]">
            See all Pets
          </button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="flex w-[30%] mx-[35%] py-10">
        <div className="flex mx-auto h-[15rem] items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
      </div>
    );
  }
};

export default AccountDashboard;
