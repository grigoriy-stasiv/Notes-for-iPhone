import React, { useState, useEffect } from 'react';
import { ChevronLeft, Trash2 } from 'lucide-react';
import type { Note } from '../../types/note';
import './NoteEditor.css';

interface NoteEditorProps {
  note: Note;
  onBack: () => void;
  onUpdateNote: (updatedNote: Note) => void;
  onDeleteNote: (id: string) => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ 
  note, 
  onBack, 
  onUpdateNote, 
  onDeleteNote 
}) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note.id]);

  const handleSaveAndGoBack = () => {
    onUpdateNote({
      ...note,
      title: title,
      content: content,
      updatedAt: Date.now()
    });
    onBack();
  };

  return (
    <div className="note-editor-screen">
      <div className="editor-nav-bar">
        <button className="nav-back-btn" onClick={handleSaveAndGoBack}>
          <ChevronLeft size={24} />
          <span>Нотатки</span>
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button className="nav-done-btn" onClick={handleSaveAndGoBack} style={{
            background: 'none', border: 'none', color: '#ff9500', fontSize: '17px', fontWeight: '600', cursor: 'pointer'
          }}>
            Готово
          </button>
          <button className="nav-delete-btn" onClick={() => onDeleteNote(note.id)}>
            <Trash2 size={22} />
          </button>
        </div>
      </div>

      <div className="editor-fields">
        <input
          type="text"
          className="editor-title-input"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="editor-textarea"
          placeholder="Введіть текст..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
};
