'use client'
import Profile from "../../components/profile"; 
import React from "react";
import {useSession} from "next-auth/react"

export default function ProfilePage() {
    const {data: session , status} = useSession();
    if ( status === "loading"){
        return <div>Loading...</div>;
    }
    if(!session){
        return <div>Please sign in to view your profile</div>;
    }
    const user = {
        name: session.user?.name || "User" , 
        imageUrl : session.user?.image || "https://randomuser.me/api/potraits/men/32.jpg"    
    }
    return (
        <div className="p-4">
            <Profile name={user.name} imageUrl={user.imageUrl} />
            <div className = "mt-4">
                <p>Email: {session.user?.email}</p>
            </div>
        </div>
    );
}