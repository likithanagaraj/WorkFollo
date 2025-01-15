"use client"
import Editor from '@/components/editor-novel'
import React from 'react'

const defaultValue = "HI"; 

function page() {
  const [content, setContent] = React.useState(defaultValue);

  function updateContent(newContent: string): void {
    setContent(newContent);
  }

  return (
    <div>
      <Editor />
    </div>
  )
}

export default page