'use client'
import axios from 'axios';
import {useEffect, useState} from 'react';
import AppBar from '@/components/AppBar';

export default function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Replace with your real backend URL if hosted elsewhere
    axios.get('http://localhost:3000/api/notes')
      .then((res) => setNotes(res.data))
      .catch((err) => console.error("Failed to fetch notes", err));
  }, []);

  return (
    <>
      <AppBar />
      <div style={{ padding: "20px" }}>
        <h1>My Notes</h1>
        {notes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          <ul>
            {notes.map((note) => (
              <li key={note._id} style={{ marginBottom: "1rem" }}>
                <h3>{note.title}</h3>
                {/* <p>{note.note}</p> */}
                <div dangerouslySetInnerHTML={{ __html: note.note }} />
                <small>{new Date(note.addedDate).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
