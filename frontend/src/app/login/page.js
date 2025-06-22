'use client'
import {useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login(){
    const [formData, setFormData] = useState({ email: '', password: '' });
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/user/login', formData);
            localStorage.setItem('user', JSON.stringify({
                token: res.data.token,
                ...res.data.user
            }));
            alert("Succeesully signed in !");
            router.push('/');
        } catch (err) {
            console.error("Login error", err);
            alert("Login failed");
        }
    };

    return(
        <form onSubmit={handleSubmit} className='p-4 flex flex-col gap-2'>
            <input name="email" placeholder="Email" onChange={handleChange}/>
            <input name="password" placeholder="Password" type="password"  onChange={handleChange}/>
            <button type="submit">Login</button>
            <p>Don't have an account? <Link href='/register'>Sign up</Link></p>
        </form>
    );
}