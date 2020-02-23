/* @flow */

import { fork, all } from 'redux-saga/effects';

import MenotrsSaga from 'containers/Mentors/saga';

function* rootSaga() {
  yield all([fork(MenotrsSaga)]);
}

export default rootSaga;
