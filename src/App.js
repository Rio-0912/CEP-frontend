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
import GetCoordinator from './Components/GetCoordinator';
import AddCoordinator from './Components/AddCoordinator';

function App() {
  const [alert, setalert] = useState(null)
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null)
    }, 5000);
  }
  return (
    <>
      
        <BrowserRouter>
        <Navbar/>
            <Alert alert={alert}/>
          <Routes>
            <Route path='/home' element={<Home showAlert={showAlert}/>} />
            <Route path='/getCoordinator' element={<GetCoordinator showAlert={showAlert}/>} />
            <Route path='/addCodinator' element={<AddCoordinator showAlert={showAlert}/>} />
            <Route path='/addStudent' element={<AddStudent showAlert={showAlert}/>} />
            <Route path='/student' element={<Students showAlert={showAlert}/>} />
            <Route path='/batch' element={<Batches showAlert={showAlert}/>} />
            <Route path='/course' element={<Course showAlert={showAlert}/>} />
            <Route path='/' element={<Login showAlert={showAlert}/>} />
          </Routes>
        </BrowserRouter>
      
    </>
  );
}

export default App;
