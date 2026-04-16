'use client';
import React from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
    const handleGoogleSignIn = async () => {
        await signIn("google", { callbackUrl: "/" });
    };

    return (
        <div className="">
            <button onClick={handleGoogleSignIn}>Sign in with Google </button> 
         </div>
    )
};