import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./components/NewNote";
import "bootstrap/dist/css/bootstrap.min.css";
import { NoteData, RawNote, Tag } from "./hooks/types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import NoteList from "./components/NoteList";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags?.filter((tag) => note?.tagIds.includes(tag?.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes: any) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag?.id) },
      ];
    });
  }
  function addTag(tag: Tag) {
    setTags((prev: any) => [...prev, tag]);
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<NoteList availableTags={tags} />} />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id">
          <Route index element={<h1>index</h1>} />
          <Route path="edit" element={<>edit</>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />{" "}
        {/*this will send you to the home page  */}
      </Routes>
    </Container>
  );
}

export default App;
