import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IphoneFrame } from '../IphoneFrame/IphoneFrame';
import { NoteList } from '../NoteList/NoteList';
import { NoteEditor } from '../NoteEditor/NoteEditor';
import { fetchNotes, createNote, updateNote, deleteNote } from '../../services/noteService';
import type { Note } from '../../types/note';



function App() {
  const queryClient = useQueryClient();
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const { data: notes = [], isLoading, isError } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setActiveNoteId(newNote.id);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setActiveNoteId(null);
    },
  });

  const handleCreateNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: '',
      content: '',
      updatedAt: Date.now(),
    };
    createMutation.mutate(newNote);
  };

  const activeNote = notes.find((note) => note.id === activeNoteId);

  return (
    <IphoneFrame>
      {isLoading && <div style={{ padding: 20, textAlign: 'center' }}>Завантаження...</div>}
      {isError && <div style={{ padding: 20, textAlign: 'center', color: 'red' }}>Помилка з'єднання з сервером</div>}

      {!isLoading && !isError && (
        activeNote ? (
          <NoteEditor
  note={activeNote}
  onBack={() => setActiveNoteId(null)}
  onUpdateNote={(updated) => updateMutation.mutate(updated)}
  onDeleteNote={(id) => deleteMutation.mutate(id)}
/>
        ) : (
          <NoteList
            notes={notes}
            onSelectNote={setActiveNoteId}
            onCreateNote={handleCreateNote}
          />
        )
      )}
    </IphoneFrame>
  );
}

export default App;
