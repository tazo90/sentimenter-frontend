import React, { useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';

const App: React.FC = () => {
  const [data, error, loading]: any = useFetch('notes');

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <ul>
        {data.map((note: any) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
