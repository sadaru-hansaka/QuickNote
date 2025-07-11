'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import NoteCard from '@/components/NoteCard';
import { useRouter } from 'next/navigation';

export default function RecentNotesPage(){

    const [notes, setNotes] = useState([]);

    const fetchRecentNotes = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
        if (!token) return;

        try {
            const res = await axios.get("http://localhost:3000/api/notes/recent", {
                headers: { Authorization: token },
            });
            setNotes(res.data);
        } catch (err) {
            console.error("Failed to fetch recent notes:", err);
        }
    };

    useEffect(() => {
        fetchRecentNotes();
    }, []);


    return(
        <div className="max-w-screen-lg mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">Recent Notes</h1>
            {notes.length === 0 ? (
                <p className="text-gray-500">No favorite notes found.</p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {notes.map(note => (
                        <NoteCard
                            key={note._id}
                            note={note}
                            onNoteDelete={fetchRecentNotes}
                            onNoteUpdate={fetchRecentNotes}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}