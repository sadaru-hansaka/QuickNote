"use client";
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

import { useState } from 'react';

export default function AppBar({onAddClick, onSearch}) {

  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  }
  
  return (
    <>
      <header className="flex items-center justify-between p-4 bg-gray-50 text-black shadow-md">
        <h1 className="text-xl font-semibold">QuickNotes</h1>
        <div className='flex w-1/3 items-center border text-[#595a5c] border-gray-400 rounded-md px-3 py-1'>
          <input
            type="text"
            placeholder="Search notes by title or date ..."
            className="w-full px-3 py-1 outline-none"
            value={query}
            onChange={(e)=>{const newQuery = e.target.value; setQuery(newQuery); onSearch(newQuery)}}
          />
          <MagnifyingGlassIcon onClick={handleSearch} className="h-5 w-5 cursor-pointer" />
        </div>
        
        <button className="bg-[#3B82F6] hover:bg-blue-700 px-2 py-1 rounded-md text-[#FFFFFF] cursor-pointer" onClick={onAddClick}>+ New Note</button>
      </header>

      
    </>
  );
}