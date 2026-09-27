import axios from 'axios';
import type { Note } from '../types/note';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

export const fetchNotes = async (): Promise<Note[]> => {
  const { data } = await instance.get<Note[]>('/notes');
  return data.sort((a, b) => b.updatedAt - a.updatedAt);
};

export const createNote = async (newNote: Note): Promise<Note> => {
  const { data } = await instance.post<Note>('/notes', newNote);
  return data;
};

export const updateNote = async (updatedNote: Note): Promise<Note> => {
  const { data } = await instance.put<Note>(`/notes/${updatedNote.id}`, updatedNote);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await instance.delete<Note>(`/notes/${id}`);
  return data;
};
