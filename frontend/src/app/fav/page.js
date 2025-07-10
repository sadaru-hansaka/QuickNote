'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import NoteCard from '@/components/NoteCard';
import { useRouter } from 'next/navigation';

export default function RecentNotesPage(){


    return(
        <div className="max-w-screen-lg mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-6">Favourite Notes</h1>
        </div>
    )
}