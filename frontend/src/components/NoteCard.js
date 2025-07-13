import { MoreHorizontal,Trash,Edit } from 'lucide-react';
import axios from 'axios';
import {useState,useEffect,useRef} from 'react';
import ViewNote from './ViewNote';
import { Star } from "lucide-react";


export default function NoteCard({note, onNoteDelete, onNoteUpdate}){
    const content = note.note;
    const preview = content.length > 100 ? content.slice(0, 100) + "..." : content;
    const date = new Date(note.addedDate).toLocaleDateString();

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const[category,setCategory]=useState('');
    const [cat,setCat]=useState([]);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(()=>{
        const fetchCategory=async()=>{
            try{
                const res = await axios.get(`https://quicknote-qzaj.onrender.com/api/category/${note.categoryID}`);
                setCategory(res.data?.category?.name || "Unknown Category");
                setCat(res.data?.category?.color)
            }catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        fetchCategory();
    },[note.categoryID])

    // delete notes
    const handleDelete = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        try{
            // console.log({note._id});
            const res = await axios.delete(`https://quicknote-qzaj.onrender.com/api/notes/${note._id}`,{
                headers:{
                    Authorization: token,
                }
            });
            if(res.data.success){
                alert('Note deleted!');
                onNoteDelete();
            }
        }catch (error) {
            console.error("Delete failed:", error);
            alert('Failed to delete note');
        }
    }

    const toggleFavorite = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;

        try {
            const res = await axios.put(`https://quicknote-qzaj.onrender.com/api/notes/${note._id}/favorite`,
                {},
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            if (res.data.success) {
                onNoteUpdate(); // or fetchNotes(); — refresh the state
            }
        } catch (error) {
            console.error("Failed to toggle favorite:", error);
        }
    };


    const [dialogOpen, setDialogOpen] = useState(false);

    return(
        <>
            <div onClick={()=>setDialogOpen(true)} className="relative bg-[#F9FAFB] pt-1 p-4 rounded-xl shadow-sm border w-71 h-38 cursor-pointer">

                 <div className="absolute top-2 right-3" ref={menuRef}>
                    <button onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}>
                        <MoreHorizontal size={20} />
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-md z-10">
                            <button
                                onClick={(e) => { e.stopPropagation(); setDialogOpen(true); setMenuOpen(false); }}
                                className="flex w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                            >
                                <Edit size={18} className='mr-2'/>
                                Edit
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleDelete(); setMenuOpen(false); }}
                                className="flex w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-100"
                            >
                                <Trash size={18} className='mr-2'/> 
                                Delete
                            </button>
                        </div>
                    )}
                </div>


                <h3 className="text-lg font-semibold">{note.title}</h3>
                <p className="text-sm text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: preview }}/>
                <div className='absolute bottom-2 left-0 w-full px-4 flex justify-between'>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                        <span className="h-4 w-4 rounded-full" style={{ backgroundColor: cat || '#DCC5B2' }} />
                        <p className="text-sm text-gray-600">{category}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Star size={18} className={`${note.favorite ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`} onClick={(e) => {e.stopPropagation(); toggleFavorite();}}/>
                        <small className="text-sm text-gray-400 block">{date}</small>
                    </div>
                </div>
            </div>
            <ViewNote open={dialogOpen} handleClose={()=> setDialogOpen(false)} note={note} onNoteUpdate={onNoteUpdate}/>
        </>
    )
}
