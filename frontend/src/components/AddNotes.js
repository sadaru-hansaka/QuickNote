import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger,DialogClose,DialogFooter,} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue,} from "@/components/ui/select";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import {useState,useRef,useEffect} from 'react';
import axios from 'axios';
import { ExternalLink} from 'lucide-react';
import Link from 'next/link';

export default function AddNotes({open, handleClose,isEditing = false, noteToEdit = null,onNoteSaved=()=>{},onNoteUpdated=()=>{}}){

    const [title, setTitle] = useState(noteToEdit?.title||'');
    const [editor, setEditor] = useState(null);
    const [categories, setCategories]=useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [user, setUser] = useState(null);
    // const editorRef = useRef();

    useEffect(() => {
        setTitle(noteToEdit?.title || '');
    }, [noteToEdit]);

    useEffect(() => {
        if (!open) return;
        const storedUser = localStorage.getItem('user');

        const fetchCategories = async (token) => {
            try {
                const res = await axios.get('http://localhost:3000/api/category',{
                    headers: { Authorization: token },
                });
                setCategories(res.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            fetchCategories(parsedUser.token);
        }
    }, [open]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const content = editor?.getHTML();
        console.log(content);

        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;

        try{
            if(isEditing && noteToEdit){
                const res = await axios.put(`http://localhost:3000/api/notes/${noteToEdit._id}`, {
                    title,
                    note: content,
                    categoryID:selectedCategory,
                },{
                    headers: {
                        Authorization: token,
                    },
                });
                if (res.data.success) {
                    alert("Note updated successfully!");
                    handleClose();
                    onNoteUpdated();
                }
            }else{
                const res = await axios.post('http://localhost:3000/api/notes', {title, note:content,categoryID:selectedCategory},{
                    headers: {
                        Authorization: token,
                    },
                });

                if (res.data.success) {
                    alert('Saved Successfully !');
                    setTitle('');
                    editor?.commands.clearContent();
                    handleClose();
                    onNoteSaved();
                }
            }
        }catch (error) {
            console.error(error);
            alert('Error saving note');
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={handleClose}>
                <form >
                    {/* <DialogTrigger asChild>
                        <Button variant="outline">Open Dialog</Button>ne
                    </DialogTrigger> */}
                    <DialogContent className="sm:max-w-[800px] h-[80vh]">
                        <DialogHeader>
                            <DialogTitle>{isEditing ? "Edit Note" : "Create a New Note"}</DialogTitle>
                            {/* <DialogDescription>
                                Make changes to your profile here. Click save when you&apos;re
                                done.
                            </DialogDescription> */}
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="name-1">Note Title</Label>
                                <Input id="name-1" value={title} onChange={(e)=>setTitle(e.target.value)} name="name" placeholder="Enter your note title..." />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="category-1">Category</Label>
                                <div className="flex items-center gap-5">
                                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {categories.map((cat) => (
                                                    <SelectItem key={cat._id} value={cat._id}>
                                                        {cat.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <Link href={'/categories'} className="flex text-sm items-center text-gray-500 ">Add Categories <ExternalLink size={16} className="ml-2"/></Link>
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Note Content</Label>
                                <RichTextEditor onEditorReady={setEditor} initialContent={isEditing ? noteToEdit?.note : ''}/>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={handleSubmit}>{isEditing ? "Update" : "Save"}</Button>
                        </DialogFooter>
                    </DialogContent>
                    
                </form>
            </Dialog>
        </>
    );
};