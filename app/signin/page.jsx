'use client';
import React from "react";
// import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
         <form>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <input value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button>Login</button>
         </form>
    )
};