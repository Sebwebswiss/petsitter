'use client'
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const pathname = usePathname();

  // Helper function to check if the link is active
  const isActive = (href: string) => pathname === href;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: { target: any }) => {
    // @ts-ignore
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div >
      {/* Toggle Button */}
      <div className="md:hidden fixed top-3 left-4 z-50 ">
        <button
          onClick={toggleSidebar}
          className="p-2 text-black rounded-full focus:outline-none"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            height={30}
            width={30}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 6H21M3 12H21M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:fixed z-50  md:translate-x-0 top-0 left-0 md:w-64 bg-black text-white flex flex-col h-full transition-transform transform ${
          isOpen ? "translate-x-0 w-64" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center rounded-sm justify-center shadow-md flex-shrink-0 my-4">
          <Link href={"/"}>
            <h1 className="text-3xl font-bold text-primary">Pet Sitter</h1>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="p-4 space-y-4">
            {/* Dashboard Link */}
            <li>
              <Link
                href="/client/dashboard"
                className={`p-2 flex gap-2 items-center font-bold rounded-sm ${
                  isActive("/client/dashboard")
                    ? "bg-primary text-black"
                    : "hover:bg-primary text-white"
                }`}
              >
                 <svg
                  viewBox="0 -0.5 25 25"
                  fill="none"
                  stroke="currentColor"
                  height={40}
                  width={40}
                  xmlns="http://www.w3.org/2000/svg"
                
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.918 10.0005H7.082C6.66587 9.99708 6.26541 10.1591 5.96873 10.4509C5.67204 10.7427 5.50343 11.1404 5.5 11.5565V17.4455C5.5077 18.3117 6.21584 19.0078 7.082 19.0005H9.918C10.3341 19.004 10.7346 18.842 11.0313 18.5502C11.328 18.2584 11.4966 17.8607 11.5 17.4445V11.5565C11.4966 11.1404 11.328 10.7427 11.0313 10.4509C10.7346 10.1591 10.3341 9.99708 9.918 10.0005Z"
                      stroke="currentColor"

                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.918 4.0006H7.082C6.23326 3.97706 5.52559 4.64492 5.5 5.4936V6.5076C5.52559 7.35629 6.23326 8.02415 7.082 8.0006H9.918C10.7667 8.02415 11.4744 7.35629 11.5 6.5076V5.4936C11.4744 4.64492 10.7667 3.97706 9.918 4.0006Z"
                                       stroke="currentColor"

                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.082 13.0007H17.917C18.3333 13.0044 18.734 12.8425 19.0309 12.5507C19.3278 12.2588 19.4966 11.861 19.5 11.4447V5.55666C19.4966 5.14054 19.328 4.74282 19.0313 4.45101C18.7346 4.1592 18.3341 3.9972 17.918 4.00066H15.082C14.6659 3.9972 14.2654 4.1592 13.9687 4.45101C13.672 4.74282 13.5034 5.14054 13.5 5.55666V11.4447C13.5034 11.8608 13.672 12.2585 13.9687 12.5503C14.2654 12.8421 14.6659 13.0041 15.082 13.0007Z"
                                       stroke="currentColor"

                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.082 19.0006H17.917C18.7661 19.0247 19.4744 18.3567 19.5 17.5076V16.4936C19.4744 15.6449 18.7667 14.9771 17.918 15.0006H15.082C14.2333 14.9771 13.5256 15.6449 13.5 16.4936V17.5066C13.525 18.3557 14.2329 19.0241 15.082 19.0006Z"
                                       stroke="currentColor"

                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
                <span className="md:inline">Dashboard</span>
              </Link>
            </li>

            {/* Bookings Link */}
            <li>
              <Link
                href="/client/dashboard/bookings"
                className={`p-2 flex gap-3 items-center rounded-sm px-4 font-bold ${
                  isActive("/client/dashboard/bookings")
                    ? "bg-primary text-black"
                    : "hover:bg-primary text-white"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  height={35}
                  width={30}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Example Bookings Icon */}
                  <path d="M16,7 L19,7 L19,11 L16,11 L16,7 Z M9,15 L20,15 M9,11 L13,11 M9,7 L13,7 M6,18.5 C6,19.8807119 4.88071187,21 3.5,21 C2.11928813,21 1,19.8807119 1,18.5 L1,7 L6.02493781,7 M6,18.5 L6,3 L23,3 L23,18.5 C23,19.8807119 21.8807119,21 20.5,21 L3.5,21" />
                </svg>
                <span className="md:inline">Your Bookings</span>
              </Link>
            </li>

            {/* Pets Link */}
            <li>
              <Link
                href="/client/dashboard/pets"
                className={`p-2 flex gap-3 items-center rounded-sm font-bold ${
                  isActive("/client/dashboard/pets")
                    ? "bg-primary text-black"
                    : "hover:bg-primary text-white"
                }`}
              >
                <svg
                  viewBox="0 -0.5 25 25"
                  fill="none"
                  height={40}
                  width={40}
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                >
                  {/* Example Pets Icon */}
                  <path
                    d="M14.875 7.375C14.875 8.68668 13.8117 9.75 12.5 9.75C11.1883 9.75 10.125 8.68668 10.125 7.375C10.125 6.06332 11.1883 5 12.5 5C13.8117 5 14.875 6.06332 14.875 7.375Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.25 15.775C17.25 17.575 15.123 19.042 12.5 19.042C9.877 19.042 7.75 17.579 7.75 15.775C7.75 13.971 9.877 12.509 12.5 12.509C15.123 12.509 17.25 13.971 17.25 15.775Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.9 9.55301C19.9101 10.1315 19.5695 10.6588 19.0379 10.8872C18.5063 11.1157 17.8893 11 17.4765 10.5945C17.0638 10.189 16.9372 9.57418 17.1562 9.03861C17.3753 8.50305 17.8964 8.1531 18.475 8.15301C19.255 8.14635 19.8928 8.77301 19.9 9.55301Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.10001 9.55301C5.08986 10.1315 5.43054 10.6588 5.96214 10.8872C6.49375 11.1157 7.11072 11 7.52347 10.5945C7.93621 10.189 8.06278 9.57418 7.84376 9.03861C7.62475 8.50305 7.10363 8.1531 6.52501 8.15301C5.74501 8.14635 5.10716 8.77301 5.10001 9.55301Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.2169 17.362C18.8043 17.325 18.4399 17.6295 18.403 18.0421C18.366 18.4547 18.6705 18.8191 19.0831 18.856L19.2169 17.362ZM22 15.775L22.7455 15.8567C22.7515 15.8023 22.7515 15.7474 22.7455 15.693L22 15.775ZM19.0831 12.695C18.6705 12.7319 18.366 13.0963 18.403 13.5089C18.4399 13.9215 18.8044 14.226 19.2169 14.189L19.0831 12.695ZM5.91689 18.856C6.32945 18.8191 6.63395 18.4547 6.59701 18.0421C6.56007 17.6295 6.19567 17.325 5.78311 17.362L5.91689 18.856ZM3 15.775L2.25449 15.693C2.24851 15.7474 2.2485 15.8023 2.25446 15.8567L3 15.775ZM5.78308 14.189C6.19564 14.226 6.56005 13.9215 6.59701 13.5089C6.63397 13.0963 6.32948 12.7319 5.91692 12.695L5.78308 14.189ZM19.0831 18.856C20.9169 19.0202 22.545 17.6869 22.7455 15.8567L21.2545 15.6933C21.1429 16.7115 20.2371 17.4533 19.2169 17.362L19.0831 18.856ZM22.7455 15.693C22.5444 13.8633 20.9165 12.5307 19.0831 12.695L19.2169 14.189C20.2369 14.0976 21.1426 14.839 21.2545 15.8569L22.7455 15.693ZM5.78311 17.362C4.76287 17.4533 3.85709 16.7115 3.74554 15.6933L2.25446 15.8567C2.45496 17.6869 4.08306 19.0202 5.91689 18.856L5.78311 17.362ZM3.74551 15.8569C3.85742 14.839 4.76309 14.0976 5.78308 14.189L5.91692 12.695C4.08354 12.5307 2.45564 13.8633 2.25449 15.693L3.74551 15.8569Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="md:inline">Pets</span>
              </Link>
            </li>

            {/* Logout Link */}
            <li>
              <Link
                href="/client/login"
                onClick={() => {
                  localStorage.removeItem("user_token");
                  localStorage.removeItem("client_token");
                }}
                className="p-2 flex gap-3 items-center rounded-sm hover:bg-primary font-bold"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  height={35}
                  width={35}
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                >
                  {/* Example Logout Icon */}
                  <path
                    d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="md:inline">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
