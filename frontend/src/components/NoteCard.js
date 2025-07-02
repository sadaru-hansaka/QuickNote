import { Trash } from 'lucide-react';
import axios from 'axios';
import {useState,useEffect} from 'react';
import ViewNote from './ViewNote';

export default function NoteCard({note, onNoteDelete, onNoteUpdate}){
    const content = note.note;
    const preview = content.length > 100 ? content.slice(0, 100) + "..." : content;
    const date = new Date(note.addedDate).toLocaleDateString();

    const[category,setCategory]=useState('');

    useEffect(()=>{
        const fetchCategory=async()=>{
            try{
                const res = await axios.get(`http://localhost:3000/api/category/${note.categoryID}`);
                setCategory(res.data.category.name);
                console.log(res.data.category.name);
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
            <div onClick={()=>setDialogOpen(true)} className="relative bg-white p-4 rounded-xl shadow-sm border w-72 h-36 cursor-pointer">
                <button onClick={(e)=>{e.stopPropagation(); handleDelete()}} className='absolute bottom-2 right-3 hover:text-red-500 cursor-pointer'><Trash size={18}/></button>
                <h3 className="text-lg font-semibold">{note.title}</h3>
                <p className="text-sm text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: preview }}/>
                <p className="text-sm text-gray-600 mt-2">{category}</p>
                <small className="text-xs text-gray-400 block mt-2">{date}</small>
            </div>
            <ViewNote open={dialogOpen} handleClose={()=> setDialogOpen(false)} note={note} onNoteUpdate={onNoteUpdate}/>
        </>
    )
}
