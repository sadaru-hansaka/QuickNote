import { MoreHorizontal,Trash,Edit } from 'lucide-react';
import axios from 'axios';
import {useState,useEffect,useRef} from 'react';
import ViewNote from './ViewNote';

export default function NoteCard({note, onNoteDelete, onNoteUpdate}){
    const content = note.note;
    const preview = content.length > 100 ? content.slice(0, 100) + "..." : content;
    const date = new Date(note.addedDate).toLocaleDateString();

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const[category,setCategory]=useState('');

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
                const res = await axios.get(`http://localhost:3000/api/category/${note.categoryID}`);
                setCategory(res.data?.category?.name || "Unknown Category");
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
            const res = await axios.delete(`http://localhost:3000/api/notes/${note._id}`,{
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

    const [dialogOpen, setDialogOpen] = useState(false);

    return(
        <>
            <div onClick={()=>setDialogOpen(true)} className="relative bg-white pt-1 p-4 rounded-xl shadow-sm border w-73 h-38 cursor-pointer">

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
                    <p className="text-sm text-gray-600 mt-2">{category}</p>
                    <small className="text-sm text-gray-400 block mt-2">{date}</small>
                </div>
            </div>
            <ViewNote open={dialogOpen} handleClose={()=> setDialogOpen(false)} note={note} onNoteUpdate={onNoteUpdate}/>
        </>
    )
}
