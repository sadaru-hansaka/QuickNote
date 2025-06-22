import { Toggle } from '@radix-ui/react-toggle';
import { AlignCenter, AlignLeft, AlignRight, Bold, Heading1, Heading2, Heading3, Highlighter, Italic, List, ListOrdered, Strikethrough } from 'lucide-react';
import React,{useState,useEffect} from 'react';
import { Editor } from "@tiptap/react";

export default function MenuBArRichText({editor}){
    const [, setRefresh] = useState(false);

    useEffect(() => {
        if (!editor) return;

        const update = () => setRefresh(prev => !prev);
        editor.on('selectionUpdate', update);
        editor.on('transaction', update);

        return () => {
            editor.off('selectionUpdate', update);
            editor.off('transaction', update);
        };
    }, [editor]);

    if (!editor) {
        return null
    }

    const Options = [
        {
            icon: <Heading1 className="size-4"/>,
            onClick:()=> editor.chain().focus().toggleHeading({level:1}).run(),
            pressed: editor.isActive('heading', {level:1}),
        },
        {
            icon: <Heading2 className="size-4"/>,
            onClick:()=> editor.chain().focus().toggleHeading({level:2}).run(),
            pressed: editor.isActive('heading', {level:2}),
        },
        {
            icon: <Heading3 className="size-4"/>,
            onClick:()=> editor.chain().focus().toggleHeading({level:3}).run(),
            pressed: editor.isActive('heading', {level:3}),
        },
        {
            icon: <Bold className="size-4"/>,
            onClick:()=> editor.chain().focus().toggleBold().run(),
            pressed: editor.isActive("bold"),
        },
        {
            icon: <Italic className="size-4"/>,
            onClick:()=> editor.chain().focus().toggleItalic().run(),
            pressed: editor.isActive("italic"),
        },
        {
            icon: <Strikethrough className='size-4'/>,
            onClick: ()=> editor.chain().focus().toggleStrike().run(),
            pressed: editor.isActive("strike"),
        },
        {
            icon: <AlignLeft className='size-4'/>,
            onClick: ()=> editor.chain().focus().setTextAlign("left").run(),
            pressed: editor.isActive({textAlign:"left"}),
        },
        {
            icon: <AlignCenter className='size-4'/>,
            onClick: ()=> editor.chain().focus().setTextAlign("center").run(),
            pressed: editor.isActive({textAlign:"center"}),
        },
        {
            icon: <AlignRight className='size-4'/>,
            onClick: ()=> editor.chain().focus().setTextAlign("right").run(),
            pressed: editor.isActive({textAlign:"right"}),
        },
        {
            icon: <List className="size-4"/>,
            onClick:()=> editor.chain().focus().toggleBulletList().run(),
            pressed: editor.isActive("bulletList"),
        },
        {
            icon: <ListOrdered className="size-4"/>,
            onClick:()=> editor.chain().focus().toggleOrderedList().run(),
            pressed: editor.isActive("orderedList"),
        },
        {
            icon: <Highlighter className="size-4"/>,
            onClick:()=> editor.chain().focus().toggleHighlight().run(),
            pressed: editor.isActive("highlight"),
        },
    ]

    return (
        <div className='border rounded-md p-1 mb-1 bg-slate-50 space-x-5 z-50'>
            {Options.map((option, index) => (
                <Toggle
                    key={index}
                    pressed={option.pressed}
                    onPressedChange={option.onClick}
                    className="data-[state=on]:bg-gray-500 rounded p-1"
                >
                    {option.icon}
                </Toggle>
            ))}

        </div>
    )
}