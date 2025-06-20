import { Trash } from 'lucide-react';
import axios from 'axios';
import {useState} from 'react';
import ViewNote from './ViewNote';

export default function NoteCard({note, onNoteDelete}){
    const content = note.note;
    // const content = note?.content || ""; 
    // display only 100 charachters from the content on the notes cards
    // const plainText = content.replace(/<[^>]+>/g, "");
    const preview = content.length > 120 ? content.slice(0, 120) + "..." : content;
    const date = new Date(note.addedDate).toLocaleDateString();

    // delete notes
    const handleDelete = async () => {
        try{
            // console.log({note._id});
            const res = await axios.delete(`http://localhost:3000/api/notes/${note._id}`);
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
            <div  className="relative bg-white p-4 rounded-xl shadow-sm border w-72 h-36">
                <button onClick={handleDelete} className='absolute bottom-2 right-3 hover:text-red-500 cursor-pointer'><Trash size={18}/></button>
                <h3 onClick={()=>setDialogOpen(true)} className="text-lg font-semibold">{note.title}</h3>
                <p onClick={()=>setDialogOpen(true)} className="text-sm text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: preview }}/>
                <small onClick={()=>setDialogOpen(true)} className="text-xs text-gray-400 block mt-2">{date}</small>
            </div>
            <ViewNote open={dialogOpen} handleClose={()=> setDialogOpen(false)} note={note}/>
        </>
    )
}
