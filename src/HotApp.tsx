import React from 'react';
import { hot } from 'react-hot-loader/root';
import PageRouter from './routers/PageRouters';

const App = () => {
  return (
    <div>
      <PageRouter />
    </div>
  );
};

export default hot(App);
