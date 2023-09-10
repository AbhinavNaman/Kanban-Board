//reducers>jobs.js
import { FETCH_ALL, CREATE, UPDATE, FETCH_NOTE, DELETE, UPDATE_PIN} from '../constants/actionTypes';

export default (state= {notes: [], note:[] }, action) => {

  switch (action.type) {

    case FETCH_ALL:
      return {...state, notes: action.payload};

    // case UPDATE_PIN:
    //   return {...state, notes: action.payload};

    case FETCH_NOTE:
      return {...state, note:action.payload};

    case CREATE:
      return {...state, notes: [...state.notes, action.payload]};

    case DELETE:
      return {...state, notes: state.notes.filter((note) => note._id !== action.payload)};

    case UPDATE:
      return {...state, notes: state.notes.map((note)=> note._id === action.payload._id ? action.payload : note)};

    default:
      return state;
  }
};
