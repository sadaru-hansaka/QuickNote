'use client'
import {useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import { useNotes } from '@/components/context/NoteContext';

export default function Login(){
    const [formData, setFormData] = useState({ email: '', password: '' });
    const router = useRouter();

    const { loginUser } = useNotes();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/user/login', formData);
            const userData = {
                token: res.data.token,
                ...res.data.user
            };

            localStorage.setItem('user', JSON.stringify(userData));
            loginUser(userData);
            alert("Succeesully signed in !");
            router.push('/');
        } catch (err) {
            console.error("Login error", err);
            alert("Login failed");
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid w-full items-center gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="you@example.com"
                            onChange={handleChange}
                            required
                        />
                        </div>
                        <div className="grid w-full items-center gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            onChange={handleChange}
                            required
                        />
                        </div>
                        <Button type="submit" className="w-full">
                        Sign In
                        </Button>
                    </form>
                    <p className="text-sm text-center text-muted-foreground mt-4">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-blue-600 hover:underline">
                        Sign up
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}