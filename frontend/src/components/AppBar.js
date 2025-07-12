"use client";
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useState } from 'react';
import { CircleUserRound,NotebookPen } from "lucide-react";

export default function AppBar({onAddClick, onSearch,user,logout}) {

  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  }
  
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gray-50 text-black shadow-md h-16">
        <h1 className="flex text-xl font-semibold"><NotebookPen/>QuickNotes</h1>
        <div className='flex w-1/3 items-center border text-[#595a5c] border-gray-400 rounded-md px-3 py-1'>
          <input
            type="text"
            placeholder="Search notes by title..."
            className="w-full px-3 py-1 outline-none"
            value={query}
            onChange={(e)=>{const newQuery = e.target.value; setQuery(newQuery); onSearch(newQuery)}}
          />
          <MagnifyingGlassIcon onClick={handleSearch} className="h-5 w-5 cursor-pointer" />
        </div>
        <div className='flex items-center justify-center gap-4'>
          <button className="bg-[#3B82F6] hover:bg-blue-700 px-2 py-1 rounded-md text-[#FFFFFF] cursor-pointer" 
            onClick={()=>{
              if(!user){
                alert("Please sign in to add a note")
              }else{
                onAddClick();
              }
            }}
          >
              + New Note
          </button>
          {!user ? (
            <Link href={"/login"} className='px-2 py-1 rounded-md text-[#595a5c] cursor-pointer'>Sign in</Link>
          ):(
            <Link href={'/profile'}>
                <div className="w-8 h-8 mx-auto flex items-center justify-center bg-gray-400 rounded-full text-sm font-medium text-gray-700">
                    {user?.name
                    ? user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()
                    : 'JD'}
                </div>
            </Link>
          )}
          
        </div>
        
      </header>

      
    </>
  );
}