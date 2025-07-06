'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AppBar from './AppBar';
import { NotesProvider,useNotes } from './context/NoteContext';

function WrapperContent({ children }) {
  const { searchNotes, user, handleLogout, setIsDialogOpen } = useNotes();

  return (
    <>
      <AppBar
        onAddClick={() => setIsDialogOpen(true)}
        onSearch={(query) => searchNotes(query, user?.token)}
        user={user}
        logout={handleLogout}
      />
      {children}
    </>
  );
}

export default function AppWrapper({ children }) {
  return (
    <NotesProvider>
      <WrapperContent>{children}</WrapperContent>
    </NotesProvider>
  );
}