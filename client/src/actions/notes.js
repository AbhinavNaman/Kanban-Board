//actions>jobs.js
import { FETCH_ALL, CREATE, DELETE, UPDATE, UPDATE_PIN, FETCH_NOTE } from '../constants/actionTypes';
import * as api from '../api/index';

export const fetchNotes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchNotes();

    dispatch({ type: FETCH_ALL, payload: data });

  } catch (error) {
    console.log(error.message);
  }
};


export const fetchNote = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchNote(id);

    dispatch({ type: FETCH_NOTE, payload: data });

  } catch (error) {
    console.log(error);
  }
};


export const createNote = (note) => async (dispatch) => {
  try {
    const { data } = await api.createNote(note);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateNote = (userId, note) => async (dispatch) => {
  try {
    console.log("123456",userId)
    console.log("asdfghj-->", note);
    const { data } = await api.updateNote(userId, note);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const updatePin = (id) => async (dispatch) => {
  try {
    console.log("----->",id);
    const { data } = await api.updatePin(id);

    dispatch({ type: UPDATE_PIN, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};


export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};