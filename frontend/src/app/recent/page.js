'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import NoteCard from '@/components/NoteCard';
import { useNotes } from '@/components/context/NoteContext';

export default function RecentNotesPage(){
    const { notes, user, fetchNotes } = useNotes();
    const [recentNotes, setRecentNotes] = useState([]);

    useEffect(() => {
        if (user?.token) {
        fetchNotes(user.token); // fetch all notes (with or without search)
        }
    }, [user]);

    useEffect(() => {
        // Filter only recent notes (last 24 hours) from global `notes`
        const now = new Date();
        const lastDay = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const filtered = notes.filter((note) => {
            const createdAt = new Date(note.createdAt);
            return createdAt >= lastDay;
        });
        setRecentNotes(filtered);
    }, [notes]);

    // const [notes, setNotes] = useState([]);

    // const fetchRecentNotes = async () => {
    //     const user = JSON.parse(localStorage.getItem("user"));
    //     const token = user?.token;
    //     if (!token) return;

    //     try {
    //         const res = await axios.get("http://localhost:3000/api/notes/recent", {
    //             headers: { Authorization: token },
    //         });
    //         setNotes(res.data);
    //     } catch (err) {
    //         console.error("Failed to fetch recent notes:", err);
    //     }
    // };

    // useEffect(() => {
    //     fetchRecentNotes();
    // }, []);


    return(
        <div className="p-2">
            <h1 className="text-2xl font-bold mb-6">Recent Notes</h1>
            {notes.length === 0 ? (
                <p className="text-gray-500">No favorite notes found.</p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {recentNotes.map(note => (
                        <NoteCard
                            key={note._id}
                            note={note}
                            onNoteDelete={()=>fetchNotes(user?.token)}
                            onNoteUpdate={()=>fetchNotes(user?.token)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}