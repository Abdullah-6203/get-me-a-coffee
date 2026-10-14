
/* eslint-disable @next/next/no-img-element */
"use client"
import React, {useState} from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setshowdropdown] = useState(false)
  
  return (
    <nav className="bg-[#bea6a0] text-[#44210d] flex justify-between px-3 sm:px-4 py-2 items-center h-16 flex-row md:gap-2 relative">
      <div className="logo shrink-0 hover:cursor-pointer">
        <Link href={"/"}>
          <img
            src="/logo.png"
            alt=""
            width={170}
            className="w-28 sm:w-36 md:w-[150px] h-auto"
          />
        </Link>
      </div>

      <div className="flex items-center gap-2 min-w-0">
        {session && (
          <>
            <button
              onClick={() => setshowdropdown(!showdropdown)}
              onBlur={() => {
                setTimeout(() => {
                  setshowdropdown(false)
                }, 300);
              }}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="inline-flex items-center justify-center hover:cursor-pointer text-[#44210d] hover:bg-[#9e7761] hover:text-[#ddc5b7] bg-[#b5907b] border border-transparent shadow-xs font-medium leading-5 rounded-2xl px-2 sm:px-4 py-2 text-xs sm:text-sm md:text-base max-w-full min-w-0"
              type="button"
            >
              <span className="truncate">Welcome {session.user.name}</span>
              <svg
                className="w-4 h-4 ms-1 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>

            <div
              id="dropdown"
              className={`z-10 ${showdropdown ? "" : "hidden"} absolute top-full right-2 sm:right-4 md:top-full bg-[#bea6a0] border-2 border-default-medium rounded-base shadow-lg w-48 sm:w-50`}
            >
              <ul
                className="p-2 text-sm text-body font-medium"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <Link
                    href={"/dashboard"}
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading hover:rounded-2xl hover:border-2 hover:border-[#44210d] rounded"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <a
                    href={`/${session.user.name}`}
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading hover:rounded-2xl hover:border-2 hover:border-[#44210d] rounded"
                  >
                    Your Page
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading hover:rounded-2xl hover:border-2 hover:border-[#44210d] rounded"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}

        {!session && (
          <Link href={"/login"}>
            <button className="text-[#44210d] text-sm sm:text-lg bg-[#b5907b] hover:text-[#ddc5b7] px-3 sm:px-4 py-2 rounded-2xl hover:bg-[#9e7761] hover:cursor-pointer whitespace-nowrap">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
