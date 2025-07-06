'use client'
import axios from 'axios';
import {useEffect, useState} from 'react';
import AppBar from '@/components/AppBar';
import NoteCard from '@/components/NoteCard';
import AddNotes from '@/components/AddNotes';
import { useRouter } from 'next/navigation';

import { useNotes } from '@/components/context/NoteContext';


export default function Home() {

  const { notes, user, fetchNotes, isDialogOpen, setIsDialogOpen } = useNotes();

  return (
    <>
      <AddNotes
        open={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
        onNoteSaved={() => {
          fetchNotes(user?.token);
          setIsDialogOpen(false);
        }}
        onNoteUpdated={() => fetchNotes(user?.token)}
      />
      <div style={{ padding: '20px' }}>
        <h1>My Notes</h1>
        {notes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onNoteDelete={() => fetchNotes(user?.token)}
                onNoteUpdate={() => fetchNotes(user?.token)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );

}
