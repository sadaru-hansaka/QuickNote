import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger,DialogClose,DialogFooter,} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue,} from "@/components/ui/select";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import {useState,useRef,useEffect} from 'react';
import axios from 'axios';


export default function AddNotes({open, handleClose,isEditing = false, noteToEdit = null,onNoteSaved=()=>{},onNoteUpdated=()=>{}}){

    const [title, setTitle] = useState(noteToEdit?.title||'');
    const [editor, setEditor] = useState(null);
    // const editorRef = useRef();

    useEffect(() => {
        setTitle(noteToEdit?.title || '');
    }, [noteToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const content = editor?.getHTML();
        console.log(content);

        try{
            if(isEditing && noteToEdit){
                const res = await axios.put(`http://localhost:3000/api/notes/${noteToEdit._id}`, {
                    title,
                    note: content
                });
                if (res.data.success) {
                    alert("Note updated successfully!");
                    handleClose();
                    onNoteUpdated();
                }
            }else{
                const res = await axios.post('http://localhost:3000/api/notes', {title, note:content});

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
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Science</SelectItem>
                                        <SelectItem value="banana">Maths</SelectItem>
                                        <SelectItem value="blueberry">English</SelectItem>
                                        <SelectItem value="grapes">History</SelectItem>
                                        <SelectItem value="pineapple">I.C.T</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
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