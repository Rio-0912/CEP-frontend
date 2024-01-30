import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './Components/Login';
import Home from './Components/Home';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home/>} />
          <Route path='/' element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
