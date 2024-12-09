'use client'

import { useEditor, EditorContent } from '@tiptap/react'

function App() {
  const editor = useEditor()

  return <EditorContent editor={editor} />
}
