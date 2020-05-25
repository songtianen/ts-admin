import { all } from 'redux-saga/effects';

import { appSagas } from '../views/layout/Layout/redux/saga';
import { loginSagas } from '../views/pages/user/redux/saga';
// import { roleSagas } from '../views/pages/Role/redux/saga';
// import { headerSagas } from '../views/ayout/Header/redux/saga';

export default function* rootSaga() {
  // yield all([...loginSagas, ...roleSagas, ...appSagas, ...headerSagas]);
  yield all([...appSagas, ...loginSagas]);
}
