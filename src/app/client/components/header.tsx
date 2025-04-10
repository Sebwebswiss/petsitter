"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetClientQuery, useGetUserQuery } from "@/features/clientApi";
import { IoMdArrowDropdown } from "react-icons/io";

const Header = () => {
  const { data, isLoading, error } = useGetClientQuery("");
  console.log("🚀 ~ Header ~ data:", data)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("client_token");
    router.push("/client/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        // @ts-ignore
        !dropdownRef.current?.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md py-2 px-6 sticky top-0 flex items-center justify-between max-w-[100vw] z-40 md:z-50">
      <Link href="/client/dashboard">
      <h1 className="text-3xl font-bold text-black hidden md:block">Your Dashboard</h1>

      </Link>
      <div className="relative gap-4 items-center" ref={dropdownRef}>
        <button
          className="flex items-center gap-2"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="hidden text-right lg:block">
            <span className="block text-sm font-medium text-black">
              Welcome! {data?.firstName} 
            </span>
          </span>
          <span className="h-12 w-12 rounded-full flex items-center">
            <Image
              width={50}
              height={50}
              src={data?.image ? data?.image : "/images/user.png"}
              alt="User"
              className="rounded-full"
            />
          </span>
            <IoMdArrowDropdown/>
        </button>
        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg overflow-hidden z-50">
            <Link
              href="/client/account-settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsDropdownOpen(false)}
            >
              Account Settings
            </Link>
          {/*   <Link
              href="/client/security-settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsDropdownOpen(false)}
            >
              Security Settings
            </Link> */}
            <button
              onClick={handleLogout}
              className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
