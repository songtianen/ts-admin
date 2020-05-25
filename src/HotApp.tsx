import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import PageRouter from './routers/PageRouters';
import store, { sagaMiddleware } from './store';

import rootSaga from './sagas';
// (在这里引用saga))解决循环依赖的问题
sagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <PageRouter />
    </Provider>
  );
};

export default hot(App);
