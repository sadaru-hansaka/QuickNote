'use client'
import axios from 'axios';
import {useEffect, useState} from 'react';
import AppBar from '@/components/AppBar';
import NoteCard from '@/components/NoteCard';
import AddNotes from '@/components/AddNotes';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [searchResults, setSearchResults] = useState(false);

  const fetchNotes = async ()=> {
    try{
      const res = await axios.get('http://localhost:3000/api/notes');
      console.log(res.data)
      setNotes(res.data)
    }catch(err){
      console.error("Failed to fetch");
    }
  }

  const searchNotes = async (query) => {
    if(!query.trim()){
      fetchNotes();
      return;
    }

    try{
      const res = await axios.get(`http://localhost:3000/api/notes/search/${query}`);
      console.log(res.data)
      setNotes(res.data);
    }catch (err) {
      console.error("Search failed", err);
    }
  }

  const handleNoteUpdate = () => {
    fetchNotes();
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <AppBar onAddClick={()=>{setIsDialogOpen(true)}} onSearch={(query)=>{searchNotes(query)}}/>
      <AddNotes open={isDialogOpen} handleClose={() => setIsDialogOpen(false)} onNoteSaved={()=>{fetchNotes(); setIsDialogOpen(false)}}  onNoteUpdated={()=>{fetchNotes()}}/>
      <div style={{ padding: "20px" }}>
        <h1>My Notes</h1>
        {notes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          <div className='flex flex-wrap gap-2'>
            {notes.map((note) => (
                <NoteCard key={note._id} note={note} onNoteDelete={()=>{fetchNotes()}} onNoteUpdate={()=>{fetchNotes()}}/>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
