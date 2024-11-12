import { auth, signIn, signOut } from "@/lib/auth";

export default async function Header() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600 border-b border-gray-300 shadow-lg backdrop-blur-lg bg-opacity-90">
      <div className="max-w-2xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
            VoteHub
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-lg font-semibold text-white">Your Voice Matters</span>
            {user ? (
              <div>
                <span className="text-lg font-semibold text-white">{user.email}</span>
                <form action={async () => {
                  'use server'
                  await signOut();
                }}>
                <button type="submit">Sign Out</button>
                </form>
              </div>
            ) : (
              <form
                action={async () => {
                  "use server"
                  await signIn("github")
                }}
              >
                <button type="submit">Sign In</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}