'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import NoteCard from '@/components/NoteCard';
import { useNotes } from '@/components/context/NoteContext';

export default function RecentNotesPage(){
    const { notes, user, fetchNotes } = useNotes();
    const [favNotes, setFavNotes] = useState([]);

    useEffect(() => {
        if (user?.token) {
            fetchNotes(user.token); // fetch all notes (with or without search)
        }
    }, [user]);

    useEffect(() => {
        const filtered = notes.filter((note) => note.favorite === true);
        setFavNotes(filtered);
    }, [notes]);

    // const [notes, setNotes] = useState([]);
    // // const [user, setUser] = useState(null);

    // const fetchFavorites = async () => {
    //     const user = JSON.parse(localStorage.getItem("user"));
    //     const token = user?.token;
    //     if (!token) return;

    //     try {
    //         const res = await axios.get("http://localhost:3000/api/notes/favorites", {
    //             headers: { Authorization: token },
    //         });
    //         setNotes(res.data);
    //         console.log("Fetched favorites:", res.data);
    //     } catch (err) {
    //         console.error("Failed to fetch favorites:", err);
    //     }
    // };

    // useEffect(() => {
    //     fetchFavorites();
    // }, []);

    return(
        <div className="p-2">
            <h1 className="text-2xl font-bold mb-6">Favourite Notes</h1>
            {notes.length === 0 ? (
                <p className="text-gray-500">No favorite notes found.</p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {favNotes.map(note => (
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