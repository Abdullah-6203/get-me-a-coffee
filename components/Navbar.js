/* eslint-disable @next/next/no-img-element */
"use client"
import React, {useState} from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setshowdropdown] = useState(false)
  
  return (
    
    <nav className="bg-[#bea6a0] text-[#44210d] flex justify-between px-4 h-18 items-center">
      <div className="logo hover:cursor-pointer">
        <Link href={"/"}><img src="/logo.png" alt="" width={170} /></Link>
      </div>
      {/* <ul className="flex justify-between gap-4 hover:cursor-pointer">
        <li className="hover:underline">Home</li>
        <li className="hover:underline">About</li>
        <li className="hover:underline">Projects</li> 
        <li className="hover:underline">Sign Up</li>
        <li className="hover:underline">Login</li>
      </ul> */}
      
      <div className="flex gap-4" >
        {session && 
        
          <><button onClick={()=>setshowdropdown(!showdropdown)} onBlur={()=>{setTimeout(() => {setshowdropdown(false)}, 300);}} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class=" inline-flex items-center justify-center hover:cursor-pointer text-[#44210d] hover:bg-[#9e7761] hover:text-[#ddc5b7] bg-[#b5907b] rounded-2xl bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base px-4 mr-10 py-2.5 focus:outline-none" type="button">
            Welcome {session.user.name}
            <svg class="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" /></svg>
          </button>
            {/* // <!-- Dropdown menu --> */}
            <div id="dropdown" class={`z-10 ${showdropdown?"":"hidden"} absolute top-20 right-15 bg-[#bea6a0] border-2 border-default-medium rounded-base shadow-lg w-50`}>
              <ul class="p-2 text-sm text-body font-medium" aria-labelledby="dropdownDefaultButton">
                <li>
                  <Link href={"/dashboard"} class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading hover:rounded-2xl hover:border-2 hover:border-[#44210d]rounded">Dashboard</Link>
                </li>
                <li>
                  <a href={`/${session.user.name}`} class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading hover:rounded-2xl hover:border-2 hover:border-[#44210d]rounded">Your Page</a>
                </li>
                
                <li>
                  <button onClick={() => signOut()} href="#" class="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading hover:rounded-2xl hover:border-2 hover:border-[#44210d]rounded">Sign out</button>
                </li>
              </ul>
            </div>
            </>
            }
        
        {!session && <Link href={"/login"}>
          <button className="text-[#44210d] text-lg bg-[#b5907b] hover:text-[#ddc5b7] p-2 px-4 rounded-2xl hover:bg-[#9e7761] hover:cursor-pointer">Login</button>
        </Link>}
      </div>
      
    </nav>
  );
};

export default Navbar;
