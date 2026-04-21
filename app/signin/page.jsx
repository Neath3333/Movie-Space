'use client';
import React from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
    const handleGoogleSignIn = async () => {
        await signIn("google", { callbackUrl: "/" });
    };

    return (
         <div className="min-h-screen bg-[#0e0e0f] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-[-80px] right-[-60px] w-[300px] h-[300px] rounded-full bg-indigo-600 opacity-10 pointer-events-none" />
      <div className="absolute bottom-[-40px] left-[-40px] w-[200px] h-[200px] rounded-full bg-violet-700 opacity-10 pointer-events-none" />

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleGoogleSignIn}>
                Sign in with Google
            </button>
         </div>

    )
};