'use client';
import React from "react";
import PropTypes from "prop-types";
import { signIn, signOut, useSession } from "next-auth/react";
export default function AuthButton({ variant = "default" }) {
    const {data:session, status} = useSession();
    const isMenu = variant === "menu";

    if (status === "loading") {
        return <div className={isMenu ? "px-2 py-2 text-sm" : ""}>Loading...</div>
    }
    if(session){
        if (isMenu) {
            return(
                <div className="border-t border-gray-200 px-2 py-2">
                    <p className="mb-2 truncate text-xs text-gray-500">
                        {session.user.name || session.user.email}
                    </p>
                    <button onClick={()=>signOut()}
                    className="w-full rounded bg-red-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600">
                    Sign Out</button>
                </div>
            )
        }

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
        className={isMenu
            ? "w-full rounded bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
            : "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"}>
        Sign In</button>
    )
}

AuthButton.propTypes = {
    variant: PropTypes.oneOf(["default", "menu"]),
}
