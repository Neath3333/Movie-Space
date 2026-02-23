'use client';
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
export default function AuthButton() {
    const {data:session, status} = useSession();
    if (status === "loading") {
        return <div>Loading...</div>
    }
    if(session){
        return(
            <div className="flex items-center gap-4">
                <span>Welcome, {session.user.name}</span>
                <button onClick={()=>signOut()}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                Sign Out</button>
            </div>
        )
    }
    return(
        <button onClick={()=>signIn("google")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
        Sign In with Google</button>
    )
}