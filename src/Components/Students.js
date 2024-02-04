import React from 'react'
import Auth from '../Middleware/auth'
import Navbar from './Navbar'

const Students = () => {
    return (
        <div>
            <Navbar />
            <div className='container'>
              <h4><Auth /></h4>  
                <h5>Tis is studen</h5>
            </div>
        </div>
    )
}

export default Students
