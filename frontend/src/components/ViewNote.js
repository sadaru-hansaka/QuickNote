import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger,DialogClose,DialogFooter,} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {useState} from 'react';
import AddNotes from "./AddNotes";

export default function ViewNote({open,handleClose,note}){

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const content = note.note;

    return(
        <>
            <Dialog open={open} onOpenChange={handleClose}>
                <DialogContent className={"sm:max-w-[800px] max-h-[80vh] overflow-y-auto"}>
                    <DialogHeader>
                        <DialogTitle>{note.title}</DialogTitle>
                           
                    </DialogHeader>

                    <div className="prose  max-w-full prose-sm mt-4 text-gray-800" dangerouslySetInnerHTML={{ __html: content }}/>
                    <DialogFooter>
                        <Button onClick={() => {setIsDialogOpen(true); setIsEditing(true); setSelectedNote(note)}}>Edit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AddNotes open={isDialogOpen} handleClose={() => setIsDialogOpen(false)} isEditing={isEditing} noteToEdit={selectedNote} />
        </>
    );
};