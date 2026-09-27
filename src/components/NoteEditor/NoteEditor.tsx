import React from 'react';
import { ChevronLeft, Trash2 } from 'lucide-react';
import type { Note } from '../../types/note'; // 
import './NoteEditor.module.css'; 



interface NoteEditorProps {
  note: Note;
  onBack: () => void;
  onUpdateNote: (updatedNote: Note) => void;
  onDeleteNote: (id: string) => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ note, onBack, onUpdateNote, onDeleteNote }) => {
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateNote({ ...note, title: e.target.value, updatedAt: Date.now() });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateNote({ ...note, content: e.target.value, updatedAt: Date.now() });
  };

  return (
    <div className="note-editor-screen">
      <div className="editor-nav-bar">
        <button className="nav-back-btn" onClick={onBack}>
          <ChevronLeft size={24} />
          <span>Нотатки</span>
        </button>
        <button className="nav-delete-btn" onClick={() => onDeleteNote(note.id)}>
          <Trash2 size={22} />
        </button>
      </div>

      <div className="editor-fields">
        <input 
          type="text" 
          className="editor-title-input"
          placeholder="Заголовок"
          value={note.title}
          onChange={handleTitleChange}
        />
        <textarea 
          className="editor-textarea"
          placeholder="Введіть текст..."
          value={note.content}
          onChange={handleContentChange}
        />
      </div>
    </div>
  );
};
