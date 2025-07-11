'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import NoteCard from '@/components/NoteCard';

export default function RecentNotesPage(){
    const [notes, setNotes] = useState([]);
    // const [user, setUser] = useState(null);

    const fetchFavorites = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
        if (!token) return;

        try {
            const res = await axios.get("http://localhost:3000/api/notes/favorites", {
                headers: { Authorization: token },
            });
            setNotes(res.data);
            console.log("Fetched favorites:", res.data);
        } catch (err) {
            console.error("Failed to fetch favorites:", err);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return(
        <div className="max-w-screen-lg mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">Favourite Notes</h1>
            {notes.length === 0 ? (
                <p className="text-gray-500">No favorite notes found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {notes.map(note => (
                        <NoteCard
                            key={note._id}
                            note={note}
                            onNoteDelete={fetchFavorites}
                            onNoteUpdate={fetchFavorites}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}