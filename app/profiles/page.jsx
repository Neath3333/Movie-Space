import Profile from "../../components/profile"; 
import React from "react";

export default function ProfilePage() {
    const user = {
        name: "John Doe",
        imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    }
    return (
        <div className="p-4">
            <Profile name={user.name} imageUrl={user.imageUrl} />
        </div>
    );
}