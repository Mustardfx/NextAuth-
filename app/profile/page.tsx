"use server";
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth";

export default async function ProfilePage() {
  const session = await getServerSession(authConfig);

  return (
    <main className="relative bg-black-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-7xl flex-grow flex flex-col justify-center items-center px-5 sm:px-10 py-20">
        {!session ? (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              Please sign in to view your profile
            </h1>
            {/* You could add a sign-in button here */}
          </div>
        ) : (
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="flex flex-col items-center">
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="rounded-full w-48 h-48 object-cover border-4 border-purple-500 mb-6"
                />
              )}
              <h1 className="text-5xl font-bold -clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                {session.user?.name || "Anonymous"}
              </h1>
              <p className="text-gray-300 text-xl">{session.user?.email}</p>
            </div>

            <div className="bg-black-200 p-8 rounded-xl max-w-md w-full">
              <h2 className="text-2xl font-semibold text-white mb-4 text-center">
                Profile Details
              </h2>
              <pre className="text-gray-300 text-sm overflow-x-auto p-4 bg-black-300 rounded">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
