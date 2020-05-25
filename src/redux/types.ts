import { IReduxAppState } from '../views/layout/Layout/redux/types';
import { IReduxLoginState } from '../views/pages/user/redux/types';
export interface IReduxState {
  app: IReduxAppState;
  login: IReduxLoginState;
}
