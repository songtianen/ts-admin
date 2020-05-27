import { takeEvery, call, put } from 'redux-saga/effects';
// import { createBrowserHistory } from 'history';
import { AxiosResponse } from 'axios';
import {
  loginByUsername,
  loginRegister,
  IResponseServerStatus,
  IResponsetLoginByUsernameData,
  IResponsetloginRegisterData,
} from '../../../../api';
import { setToken, getToken } from '../../../../util/token';
import {
  BEFORE_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  DO_LOGIN,
  DO_REGISTER,
  ILoginActionsType,
} from './actions';

// let history = createBrowserHistory({
//   forceRefresh: false,
// });

function* fetchUser(action: ILoginActionsType['ILogin']) {
  try {
    yield put({ type: BEFORE_LOGIN, payload: {} });
    const userInfo: AxiosResponse<IResponsetLoginByUsernameData> &
      IResponseServerStatus = yield call(loginByUsername, action.payload);
    if (userInfo.statusCode === 200 && userInfo.data.accessToken) {
      const token = userInfo.data.accessToken;
      const setTokens = (_token: string) => {
        return new Promise((resolve, reject) => {
          setToken(_token);
          const itoken = getToken();
          if (itoken) {
            resolve(itoken);
          } else {
            reject(new Error('LocalStorage Error'));
          }
        });
      };

      yield put({ type: LOGIN_SUCCESS, payload: userInfo });
      setTokens(token).then(() => {
        // history.push('/');
        // console.log('setToken', doc);
      });
    }
    if (userInfo.statusCode === 500) {
      yield put({ type: LOGIN_ERROR, payload: userInfo });
    }
  } catch (error) {
    yield put({ type: LOGIN_ERROR, payload: error });
  }
}

function* register(action: ILoginActionsType['IRegister']) {
  try {
    yield put({ type: BEFORE_LOGIN, payload: {} });
    const userInfo: AxiosResponse<IResponsetloginRegisterData> &
      IResponseServerStatus = yield call(loginRegister, action.payload);
    if (userInfo.statusCode === 200 && userInfo.data.accessToken) {
      setToken(userInfo.data.accessToken);
      yield put({ type: REGISTER_SUCCESS, payload: userInfo });
      // history.push('/');
    }
    if (userInfo.statusCode === 500) {
      yield put({ type: LOGIN_ERROR, payload: userInfo });
    }
  } catch (error) {
    yield put({ type: LOGIN_ERROR, payload: error });
  }
}

function* watchFetchUser() {
  yield takeEvery(DO_LOGIN, fetchUser);
}
function* watchRegister() {
  yield takeEvery(DO_REGISTER, register);
}

// eslint-disable-next-line import/prefer-default-export
export const loginSagas = [watchFetchUser(), watchRegister()];
