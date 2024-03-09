import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login/login';
import Systems from './systems/systems';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');
    if (token === 'true') {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('TOKEN', 'true');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem('TOKEN', 'false');
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? <Navigate to="/systems" replace /> : <Login onLogin={handleLogin} setName={setName} />
            }
          />
          <Route
            path="/systems"
            element={
              isLoggedIn ? (
                <Systems isLoggedIn={isLoggedIn} onLogout={handleLogout} name={name} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/*" element={<Navigate to={isLoggedIn ? '/systems' : '/login'} replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
