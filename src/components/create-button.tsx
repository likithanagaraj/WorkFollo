import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

interface props  {
  children: React.ReactNode
  link : string
  className?: string
}

function CreateButton({children,link,className}:props) {
  return (
   <Link href={link}>
    <Button   className={className}>
      {children}
    </Button>
   </Link>
  )
}

export default CreateButton