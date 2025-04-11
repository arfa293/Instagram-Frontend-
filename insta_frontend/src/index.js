import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import { ErrorBoundary } from "react-error-boundary";
import 'bootstrap/dist/css/bootstrap.min.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
      <App />
    </ErrorBoundary>
  </Provider>
);
