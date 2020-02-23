/*
 *
 * Mentors Actions
 *
 */

export const ActionTypes = {
  LOAD_MENTORS: 'container/mentors/LOAD_MENTORS',
  LOADED_MENTORS: 'container/mentors/LOADED_MENTORS',
  SAVE_NEW_MENTOR: 'container/mentors/SAVE_NEW_MENTOR',
  SAVE_MENTOR_SUCCESS: 'container/mentors/SAVE_MENTOR_SUCCESS',
  DELETE_MENTOR: 'container/mentors/DELETE_MENTOR',
  DELETE_MENTOR_SUCCESS: 'container/mentors/DELETE_MENTOR_SUCCESS',
  EDIT_MENTOR: 'container/mentors/EDIT_MENTOR',
  GO_TO_EDIT_MENTOR_FORM: 'container/mentors/GO_TO_EDIT_MENTOR_FORM',
  CLEAR_EDIT_MENTOR: 'container/mentors/CLEAR_EDIT_MENTOR',
  SAVE_EDITED_MENTOR: 'container/mentors/SAVE_EDITED_MENTOR',
  FETCH_MENTOR: 'container/mentors/FETCH_MENTOR',
  FETCH_MENTOR_SUCCESS: 'container/mentors/FETCH_MENTOR_SUCCESS',
};

const loadMentors = () => ({
  type: ActionTypes.LOAD_MENTORS,
});

const loadedMentors = mentors => ({
  type: ActionTypes.LOADED_MENTORS,
  payload: {
    mentors,
  },
});

const saveNewMentor = mentor => ({
  type: ActionTypes.SAVE_NEW_MENTOR,
  payload: {
    mentor,
  },
});

const saveMentorSuccess = () => ({
  type: ActionTypes.SAVE_MENTOR_SUCCESS,
});

const deleteMentor = id => ({
  type: ActionTypes.DELETE_MENTOR,
  payload: {
    id,
  },
});

const deleteMentorSuccess = () => ({
  type: ActionTypes.DELETE_MENTOR_SUCCESS,
});

const editMentor = (id, mentor) => ({
  type: ActionTypes.EDIT_MENTOR,
  payload: {
    id,
    mentor,
  },
});

const goToEditMentorForm = (id, mentor) => ({
  type: ActionTypes.GO_TO_EDIT_MENTOR_FORM,
  payload: {
    id,
    mentor,
  },
});

const clearEditMentor = () => ({
  type: ActionTypes.CLEAR_EDIT_MENTOR,
});

const saveEditedMentor = (id, mentor) => ({
  type: ActionTypes.SAVE_EDITED_MENTOR,
  payload: {
    id,
    mentor,
  },
});

const fetchMentor = () => ({
  type: ActionTypes.FETCH_MENTOR,
});

const fetchMentorSuccess = mentor => ({
  type: ActionTypes.FETCH_MENTOR_SUCCESS,
  payload: {
    mentor,
  },
});

export default {
  loadMentors,
  loadedMentors,
  saveNewMentor,
  saveMentorSuccess,
  deleteMentor,
  deleteMentorSuccess,
  editMentor,
  goToEditMentorForm,
  clearEditMentor,
  saveEditedMentor,
  fetchMentor,
  fetchMentorSuccess,
};
