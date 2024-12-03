import { auth } from "@/lib/auth";
import UserButton from "./UserButton";
import Link from "next/link";

export default async function Header() {
  const user = (await auth())?.user;

  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600 border-b border-gray-300 shadow-lg backdrop-blur-lg bg-opacity-90">
      <div className="max-w-2xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                VoteHub
              </h1>
              <span className="text-sm font-semibold text-white">Your Voice Matters</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4 mb-3">
            <UserButton user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}