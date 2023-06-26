import React from 'react';
import { Choice } from './redux/slices/Choice';
import { Provider } from 'react-redux';
import { store } from './app/store';

function App() {
  return (
    <Provider store={store}>
      <Choice />
    </Provider>
  );
}

export default App;
