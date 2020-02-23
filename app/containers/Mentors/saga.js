/*
 *
 * Mentors Saga
 *
 */

import { put, takeLatest, all, call } from 'redux-saga/effects';
import request from 'utils/request';
import history from 'utils/history';
import MentorsAction, { ActionTypes } from './actions';

const myApi = 'http://localhost:3000/api/';

export function* handleLoadPage(action) {
  const { location } = action.payload;
  const path = location.pathname.split('/');
  const id = path[path.length - 1];

  if (location.pathname === '/') {
    yield call(LoadMentors);
  }

  if (location.pathname.includes('/mentor_admin') && id) {
    yield put(MentorsAction.fetchMentor(id));
    const requestURL = `${myApi}/${id}`;
    const response = yield call(request, requestURL);
    if (response.success) {
      const mentor = response.mentor[0] ? response.mentor[0] : [];
      yield put(MentorsAction.fetchMentorSuccess(mentor));
    }
  }
}

export function* LoadMentors() {
  try {
    yield put(MentorsAction.loadMentors());
    const response = yield call(request, myApi);
    yield put(MentorsAction.loadedMentors(response.mentors));
  } catch (err) {
    throw err;
  }
}

export function* handleSaveNewMentor(action) {
  const { mentor } = action.payload;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mentor),
  };
  try {
    const response = yield call(request, myApi, options);
    if (response.success) {
      yield put(MentorsAction.saveMentorSuccess());
      yield call(history.push, '/');
    }
  } catch (err) {
    throw err;
  }
}

export function* handleDeleteMentor(action) {
  const { id } = action.payload;
  const requestURL = `${myApi}/${id}`;
  const options = {
    method: 'DELETE',
  };
  try {
    const response = yield call(request, requestURL, options);
    if (response.success) {
      yield put(MentorsAction.deleteMentorSuccess());
      yield call(LoadMentors);
    }
  } catch (err) {
    throw err;
  }
}

export function* handleEditMentor(action) {
  const { mentor, id } = action.payload;
  try {
    yield put(MentorsAction.editMentor(id, mentor));
    yield call(history.push, `/mentor_admin/${id}`);
  } catch (err) {
    throw err;
  }
}

export function* handleSaveEditedMentor(action) {
  const { mentor, id } = action.payload;
  const requestURL = `${myApi}/${id}`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mentor),
  };
  try {
    const response = yield call(request, requestURL, options);
    if (response.success) {
      yield put(MentorsAction.saveMentorSuccess());
      yield call(history.push, '/');
    }
  } catch (err) {
    throw err;
  }
}

function* MenotrsSaga() {
  yield all([
    yield takeLatest('@@router/LOCATION_CHANGE', handleLoadPage),
    yield takeLatest(ActionTypes.SAVE_NEW_MENTOR, handleSaveNewMentor),
    yield takeLatest(ActionTypes.GO_TO_EDIT_MENTOR_FORM, handleEditMentor),
    yield takeLatest(ActionTypes.SAVE_EDITED_MENTOR, handleSaveEditedMentor),
    yield takeLatest(ActionTypes.DELETE_MENTOR, handleDeleteMentor),
  ]);
}

export default MenotrsSaga;

// import AppSelectors from '../App/selectors';
// const routeSelector = AppSelectors.makeSelectLocation();
// const route = yield select(routeSelector);
