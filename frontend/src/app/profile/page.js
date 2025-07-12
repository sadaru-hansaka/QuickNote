'use client'
import { useNotes } from "@/components/context/NoteContext";
import { LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function profile(){
    const { user, handleLogout } = useNotes();

    return(
        <div className="flex items-center justify-center w-[calc(100vw-450px)] h-[calc(100vh-250px)]">
            <Card className="w-full max-w-md shadow-lg text-center">
                <CardHeader>
                    <CardTitle className="text-2xl">Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Profile Initials Circle */}
                    <div className="w-20 h-20 mx-auto flex items-center justify-center bg-gray-300 rounded-full text-xl font-medium text-gray-700">
                        {user?.name
                        ? user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()
                        : 'JD'}
                    </div>

                    {/* Name */}
                    <h2 className="mt-4 text-xl font-semibold text-gray-900">
                        {user?.name || 'John Doe'}
                    </h2>

                    {/* Email */}
                    <p className="text-lg text-gray-600">
                        {user?.email || 'john.doe@example.com'}
                    </p>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="mt-6 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </CardContent>
            </Card>
        </div>
    )
}