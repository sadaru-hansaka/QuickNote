'use client'
import axios from 'axios';
import {useEffect, useState} from 'react';
import AppBar from '@/components/AppBar';
import NoteCard from '@/components/NoteCard';
import AddNotes from '@/components/AddNotes';
import { useRouter } from 'next/navigation';


export default function Home() {
  const [notes, setNotes] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [user,setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user?.token) {
      fetchNotes(user.token);
    }
  }, [user]);

  const fetchNotes = async (token)=> {
    try{
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const res = await axios.get('http://localhost:3000/api/notes',{
          headers:{
            Authorization: token
          }
      });

      console.log(res.data)
      setNotes(res.data)
    }catch(err){
      console.error("Failed to fetch");
    }
  }

  const searchNotes = async (query,token) => {
    if(!query.trim()){
      fetchNotes(user?.token);
      return;
    }

    try{
      const res = await axios.get(`http://localhost:3000/api/notes/search/${query}`,{
        headers:{
            Authorization: token
          }
      });
      console.log(res.data)
      setNotes(res.data);
    }catch (err) {
      console.error("Search failed", err);
    }
  }

  const handleNoteUpdate = () => {
    fetchNotes(user?.token);
  }

  const handleLogout = () => {
    // Clear token and user info from localStorage
    localStorage.removeItem('user');
    setUser(null);
    setNotes([]);
    router.push('/');
  };

  return (
    <>
      <AppBar onAddClick={()=>{setIsDialogOpen(true)}} onSearch={(query)=>{searchNotes(query, user?.token)}} user={user} logout={handleLogout}/>
      <AddNotes open={isDialogOpen} handleClose={() => setIsDialogOpen(false)} onNoteSaved={()=>{fetchNotes(user?.token); setIsDialogOpen(false)}}  onNoteUpdated={()=>{fetchNotes(user?.token)}}/>
      <div style={{ padding: "20px" }}>
        <h1>My Notes</h1>
        {notes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          <div className='flex flex-wrap gap-2'>
            {notes.map((note) => (
                <NoteCard key={note._id} note={note} onNoteDelete={()=>{fetchNotes(user?.token)}} onNoteUpdate={()=>{fetchNotes(user?.token)}}/>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
