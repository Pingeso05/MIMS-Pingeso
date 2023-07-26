import React from 'react';
import { AppRouter } from './routes/AppRouter';
import { AuthProvider } from './context/AuthContext';

function App() {
  const isLoggedIn = false; 

  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>

  );
}

export default App;
