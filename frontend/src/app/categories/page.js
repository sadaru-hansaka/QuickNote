'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {useState,useEffect} from 'react';
import { Trash } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function Categories(){
    const[category,setCategory]=useState('');
    const [categories, setCategories]=useState([]);
    const [user, setUser] = useState(null);

    const [color, setColor] = useState("#000000")

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
            const res = await axios.post('https://quicknote-qzaj.onrender.com/api/category',{name:category,color},{
                headers: {
                    Authorization: token,
                },
            });
            if(res.data.success){
                alert("Category added successfully")
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
            const res = await axios.get('https://quicknote-qzaj.onrender.com/api/category',{
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
            const res = await axios.delete(`https://quicknote-qzaj.onrender.com/api/category/${id}`,{
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


    return(
        <div className="flex mt-2 sm:mt-0">
            <div className="max-w-4xl mx-auto p-4">
                <h1 className="text-center md:text-left text-2xl font-bold mb-6">Add New Category</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap md:flex-nowrap w-full items-center gap-2 mt-5 mb-10">
                        <Input className="w-full md:w-[600px]" type="text" placeholder="Category Name" value={category} onChange={(e) => setCategory(e.target.value)} required />
                        <div className="w-full flex justify-center md:justify-start items-center gap-2 mt-2 md:mt-0">
                            <Popover>
                                <PopoverTrigger className="h-8 w-8 rounded-full border" style={{ backgroundColor: color }} />
                                <PopoverContent className="w-fit">
                                    <HexColorPicker color={color} onChange={setColor} />
                                </PopoverContent>
                            </Popover>
                            <Button type="submit" variant="outline" className={" bg-[#18181B]  hover:bg-[#333335] rounded-md text-[#FFFFFF] px-2 py-1 cursor-pointer"}>
                                + Add Category
                            </Button>
                        </div>
                    </div>
                </form>
                
                <h1>Current Categories</h1>
                <div className="flex flex-wrap gap-5 mt-5">
                    {categories.map((cat) => (
                        <div key={cat._id} className="relative p-4 border bg-white shadow rounded-lg w-[172px]">
                            <p className="text-gray-800 font-medium">{cat.name}</p>
                            <button
                                onClick={() => handleDelete(cat._id)}
                                className="absolute top-5 right-2 text-red-500 hover:text-red-600 cursor-pointer"
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