"use client";
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

export default function AppBar() {
  return (
    <header className="flex items-center justify-between p-4 bg-white text-black shadow-md">
      <h1 className="text-xl font-semibold">QuickNotes</h1>
      <div className='flex w-1/3 items-center border text-[#9CA3AF] border-gray-300 rounded-md px-3 py-1'>
        <input
          type="text"
          placeholder="Search notes by title or date ..."
          className="w-full px-3 py-1 outline-none"
        />
        <MagnifyingGlassIcon className="h-5 w-5 cursor-pointer" />
      </div>
      
      <button className="bg-[#3B82F6] hover:bg-blue-700 px-2 py-1 rounded-md text-[#FFFFFF] cursor-pointer">+ New Note</button>
    </header>
  );
}