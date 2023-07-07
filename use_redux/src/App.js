import React from 'react';
import Choice from './components/Choice';
import { Provider } from 'react-redux';
import { store } from './redux/app/store';

function App() {
  return (
    <Provider store={store}>
      <Choice />
    </Provider>
  );
}

export default App;
