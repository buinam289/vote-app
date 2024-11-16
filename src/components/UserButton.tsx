"use client";

import { User } from "next-auth";
import Image from 'next/image';
import { useState } from "react";
import SignOut from "@/app/actions/signOut";
import Link from "next/link";


export default function UserButton({ user }: { user: User | undefined }) {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      {user ? (
        <div className="relative flex items-center space-x-2">
          <div className="relative">
            <button className="relative flex items-center space-x-2 text-lg font-semibold text-white focus:outline-none" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <Image
                src={user.image || '/default-avatar.png'}
                alt="User Avatar"
                style={{ width: '40px', height: '40px' }}
                width={40}
                height={40}
                className="rounded-full object-center object-cover"
              />
              <span>{user.name}</span>
              <svg
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${dropdownOpen ? 'transform rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <Link href="/profile" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
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