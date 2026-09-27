import axios from 'axios';
import type { Note } from '../types/note';

const API_URL = 'https://6ab95de8f84897980b729014.mockapi.io/notes';

export const fetchNotes = async (): Promise<Note[]> => {
  const response = await axios.get<Note[]>(API_URL);
  return response.data;
};


export const createNote = async (newNote: Note): Promise<Note> => {
  const response = await axios.post<Note>(API_URL, newNote);
  return response.data;
};


export const updateNote = async (updatedNote: Note): Promise<Note> => {
  const response = await axios.put<Note>(`${API_URL}/${updatedNote.id}`, updatedNote);
  return response.data;
};


export const deleteNote = async (id: string | number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
