import React from "react";
import { EditNoteProps } from "../hooks/types";
import NoteForm from "./NoteForm";
import { useNote } from "./NoteLayout";

const EditNote = ({ onSubmit, onAddTag, availableTags }: EditNoteProps) => {
  const note = useNote();
  return (
    <div>
      <h1>Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </div>
  );
};

export default EditNote;
