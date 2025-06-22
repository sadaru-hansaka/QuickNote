'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/user/register', formData);
      localStorage.setItem('user', JSON.stringify(res.data)); // Store token
      router.push('/'); // Go to home
      alert("Registered successfully !")
    } catch (err) {
      console.error("Registration error", err);
      alert("Registration failed !");
    }
  };

  return (
    <form onSubmit={handleSubmit} className='p-4 flex flex-col gap-2'>
      <h2>Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
}
