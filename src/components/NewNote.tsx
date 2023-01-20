import React from 'react'
import { NewNoteProps } from '../hooks/types'
import NoteForm from './NoteForm'

const NewNote = ({ onSubmit,onAddTag,availableTags}: NewNoteProps) => {
  return (
    <div className='my-4'>
        <h1>NewNote</h1>
        <NoteForm onSubmit={onSubmit} onAddTag ={onAddTag} availableTags={availableTags} />
    </div>
  )
}

export default NewNote    