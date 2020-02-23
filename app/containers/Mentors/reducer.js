/*
 *
 * Mentors Reducer
 *
 */

import { ActionTypes } from './actions';

/* eslint-disable default-case, no-param-reassign */

export const initialState = {
  mentorsList: [],
  edit: {
    mentor: {},
    id: '',
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOADED_MENTORS: {
      const { mentors } = action.payload;
      return {
        ...state,
        mentorsList: mentors,
      };
    }
    case ActionTypes.EDIT_MENTOR: {
      const { mentor, id } = action.payload;
      return {
        ...state,
        edit: {
          id,
          mentor,
        },
      };
    }
    case ActionTypes.CLEAR_EDIT_MENTOR: {
      return {
        ...state,
        edit: {
          id: '',
          mentor: {},
        },
      };
    }
    case ActionTypes.FETCH_MENTOR_SUCCESS: {
      const { mentor } = action.payload;
      return {
        ...state,
        edit: {
          id: mentor._id,
          mentor,
        },
      };
    }
    default:
      return state;
  }
}
