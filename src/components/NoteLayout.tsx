import React from 'react'
import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { Note, NoteLayoutProps } from '../hooks/types'

const NoteLayout = ({notes}: NoteLayoutProps) => {
  const { id } = useParams()
  const note = notes.find(text => text.id === id)

  if( note == null) return <Navigate to="/" replace />
  
  return <Outlet context={note} />
}

export default NoteLayout

export function useNote(){
    return useOutletContext<Note>()
}