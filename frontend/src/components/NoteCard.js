import { Trash } from 'lucide-react';
import axios from 'axios';

export default function NoteCard({id,title,content,date}){

    const plainText = content.replace(/<[^>]+>/g, "");
    const preview = plainText.length > 100 ? plainText.slice(0, 100) + "..." : plainText;

    const handleDelete = async () => {
        try{
            console.log({id});
            const res = await axios.delete(`http://localhost:3000/api/notes/${id}`);

            if(res.data.success){
                alert('Note deleted!');
            }
        }catch (error) {
            console.error("Delete failed:", error);
            alert('Failed to delete note');
        }
    }

    return(
        <div className="relative bg-white p-4 rounded-xl shadow-sm border w-72 h-36">
            <button onClick={handleDelete} className='absolute bottom-2 right-3 hover:text-red-500 cursor-pointer'><Trash size={18}/></button>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-gray-600 mt-2">{preview}</p>
            <small className="text-xs text-gray-400 block mt-2">{date}</small>
        </div>
    )
}
