'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [user, setUser] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
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

    const fetchNotes = async (token) => {
        try {
        if (!token) return;
        const res = await axios.get('http://localhost:3000/api/notes', {
            headers: { Authorization: token },
        });
        setNotes(res.data);
        } catch (err) {
        console.error('Failed to fetch', err);
        }
    };

    const searchNotes = async (query, token) => {
        if (!query.trim()) {
        fetchNotes(user?.token);
        return;
        }
        try {
        const res = await axios.get(`http://localhost:3000/api/notes/search/${query}`, {
            headers: { Authorization: token },
        });
        setNotes(res.data);
        } catch (err) {
        console.error('Search failed', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setNotes([]);
        router.push('/');
    };

    const loginUser = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        fetchNotes(userData.token);
    };

    return (
        <NotesContext.Provider value={{
            notes, setNotes,
            user, setUser,
            isDialogOpen, setIsDialogOpen,
            fetchNotes, searchNotes,
            handleLogout,
            loginUser
        }}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => useContext(NotesContext);
