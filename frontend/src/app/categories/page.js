'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {useState,useEffect} from 'react';
import { Trash } from "lucide-react";

export default function Categories(){
    const[category,setCategory]=useState('');
    const [categories, setCategories]=useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            fetchCategories(parsedUser.token); // fetch after loading user
        }
    }, []);


    const handleSubmit = async (e)=>{
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;

        try{
            const res = await axios.post('http://localhost:3000/api/category',{name:category},{
                headers: {
                    Authorization: token,
                },
            });
            if(res.data.success){
                alert("Done")
                setCategory(""); 
                fetchCategories(token); 
            }
        }catch(error){
            console.log(error);
            alert("Error saving category !")
        }
    }

    const fetchCategories = async (token) => {
        try {
            if(!token) return;
            const res = await axios.get('http://localhost:3000/api/category',{
                headers: { Authorization: token },
            });
            setCategories(res.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this category?")) return;
        try {
            const res = await axios.delete(`http://localhost:3000/api/category/${id}`,{
                headers: {
                    Authorization: user.token,
                },
            });
            if (res.data.success) {
                fetchCategories(user.token);
            }
        } catch (error) {
            console.error("Delete failed", error);
            alert("Error deleting category");
        }
    };


    // useEffect(() => {
    //     fetchCategories();
    // }, []);

    return(
        <div className="w-[81vw] bg-gray-100 px-4">
            <div className="max-w-4xl mx-auto p-4">
                <h1>Add New Category</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex w-full items-center gap-2 mt-5 mb-10">
                        <Input type="text" placeholder="Category Name" value={category} onChange={(e) => setCategory(e.target.value)} required />
                        <Button type="submit" variant="outline" className={" bg-[#3B82F6]  hover:bg-blue-700 rounded-md text-[#FFFFFF] px-2 py-1 cursor-pointer"}>
                            + Add Category
                        </Button>
                    </div>
                </form>
                <h1>Current Categories</h1>
                <div className="flex flex-wrap gap-5 mt-5">
                    {categories.map((cat) => (
                        <div key={cat._id} className="relative p-4 border bg-white shadow rounded-lg items-center w-[200px]">
                            <p className="text-gray-800 font-medium">{cat.name}</p>
                            <button
                                onClick={() => handleDelete(cat._id)}
                                className="absolute top-5 right-2 text-gray-500 hover:text-red-600 cursor-pointer"
                            >
                                <Trash size={18} />
                            </button>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}