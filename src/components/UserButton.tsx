"use client";

import { User } from "next-auth";
import Image from 'next/image';
import { useState } from "react";
import SignOut from "@/app/actions/signOut";


export default function UserButton({user}: {user: User | undefined}) {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      {user ? (
        <div className="relative flex items-center space-x-4">
          <Image
            src={user.image || '/default-avatar.png'}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="relative">
            <button className="text-lg font-semibold text-white focus:outline-none" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {user.email}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <form action={SignOut}>
                  <button type="submit" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign Out
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      ) : (<div></div>)}
    </>
  );
}