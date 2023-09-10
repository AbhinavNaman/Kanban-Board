//api>index.js
import axios from 'axios';
const API = axios.create({baseURL: 'http://localhost:5000'});
export const fetchNotes = () => API.get('/notes');

export const fetchNote = (id) => API.get(`/notes/${id}`);
export const createNote = (newNote) => API.post('/notes', newNote);
export const updateNote = (noteId, noteData) => API.patch(`/notes/${noteId}`, noteData);
export const updatePin = (id) => API.patch(`/notes/updatepin/${id}`);
export const deletePost = (id) => API.delete(`/notes/${id}`);
