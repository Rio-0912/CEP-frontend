import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './Components/Login';
import Home from './Components/Home';
import Course from './Components/Course';
import Batches from './Components/Batches';
import Students from './Components/Students'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home/>} />
          <Route path='/student' element={<Students/>} />
          <Route path='/batch' element={<Batches/>} />
          <Route path='/course' element={<Course/>} />
          <Route path='/' element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
