import React,{useState} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './Components/Login';
import Home from './Components/Home';
import Course from './Components/Course';
import Batches from './Components/Batches';
import Students from './Components/Students';
import AddStudent from './Components/AddStudent'
import Alert from './Components/Alert';
import Navbar from './Components/Navbar';

function App() {
  const [alert, setalert] = useState(null)
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null)
    }, 2000);
  }
  return (
    <>
      
        <BrowserRouter>
        <Navbar/>
            <Alert alert={alert}/>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/addStudent' element={<AddStudent showAlert={showAlert}/>} />
            <Route path='/student' element={<Students />} />
            <Route path='/batch' element={<Batches />} />
            <Route path='/course' element={<Course />} />
            <Route path='/' element={<Login />} />
          </Routes>
        </BrowserRouter>
      
    </>
  );
}

export default App;
