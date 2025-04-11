import React from 'react';
import Register from './components/Register';
import { ErrorBoundary } from "react-error-boundary";


function App() {
  return (
    // <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
      <div className="App">
        <Register />
      </div>
    // </ErrorBoundary>
  );
}

export default App;
