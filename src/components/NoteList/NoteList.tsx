import React, { useState } from 'react';
import { Search, SquarePen } from 'lucide-react';
import type { Note } from '../../types/note';
import "./NoteList.css";

interface NoteListProps {
  notes: Note[];
  onSelectNote: (id: string) => void;
  onCreateNote: () => void;
}

export const NoteList: React.FC<NoteListProps> = ({ notes, onSelectNote, onCreateNote }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'numeric',
      year: '2-digit'
    });
  };

  return (
    <div className="notes-list-screen">
      <div className="header-container">
        <h1 className="main-title"> Мої Нотатки</h1>
      </div>

      <div className="search-bar">
        <Search size={18} className="search-icon" />
        <input 
          type="text" 
          placeholder="Пошук" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="notes-folder-container">
        {filteredNotes.length === 0 ? (
          <p className="no-notes">Немає нотаток</p>
        ) : (
          <div className="notes-group">
            {filteredNotes.map((note) => (
              <div key={note.id} className="note-row" onClick={() => onSelectNote(note.id)}>
                <div className="note-row-content">
                  <h3 className="note-row-title">{note.title || 'Нова нотатка'}</h3>
                  <div className="note-row-meta">
                    <span className="note-row-date">{formatDate(note.updatedAt)}</span>
                    <span className="note-row-snippet">
                      {note.content ? note.content.slice(0, 35) + (note.content.length > 35 ? '...' : '') : 'Немає додаткового тексту'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="ios-bottom-bar">
        <div className="notes-count">{notes.length} нотаток</div>
        <button className="create-note-btn" onClick={onCreateNote}>
          <SquarePen size={24} />
        </button>
      </div>
    </div>
  );
};
