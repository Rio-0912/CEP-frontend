// AuthProvider.js
import React, { useState } from 'react';
import AuthContext from './authContext';

const AuthProvider = (props) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userData: null,
  });

  const login = (userData) => {
    setAuthState({
      isAuthenticated: true,
      userData,
    });
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      userData: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
