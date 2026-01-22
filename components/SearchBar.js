'use client';
import React from "react";
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar(){
    return(
        <div className="relative">
            <input type="search" placeholder="Search titles...." className="py-2 px-5 ml-15 rounded-xl bg-white focus:outline-none" />
            <SearchIcon className="ml-2 absolute right-3 text-gray-500 top-2 "/>
        </div>
    )
}