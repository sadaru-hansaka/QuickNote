'use client'

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBArRichText from './MenuBarRichText';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { useImperativeHandle, forwardRef } from 'react';
import {useEffect} from 'react';

export default function RichTextEditor({onEditorReady}){
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList:{
          HTMLAttributes:{
            class:"list-disc ml-3",
          }
        },
        orderedList:{
          HTMLAttributes:{
            class:"list-decimal ml-3",
          }
        }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight
    ],
    content: '<p>Hello World! 🌎️</p>',
    editorProps:{
      attributes:{
        class:"min-h-[156px] border rounder-md bg-slate-50 py-2 px-3",
      }
    },

  })

  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor]);

  return (
    <>
      <MenuBArRichText editor={editor}/>
      <EditorContent editor={editor} />
    </>
  )
}

