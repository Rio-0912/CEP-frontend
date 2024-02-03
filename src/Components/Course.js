import React from 'react'
import auth from '../Middleware/auth'
import Navbar from './Navbar'
import Auth from '../Middleware/auth'
import CourseItem from './CourseItem'
import CourseModal from './CourseModal'

const Course = () => {

    auth()

    return (
        <>
            <Navbar />
            <div className='container my-3'>
              <h4><Auth /></h4>  
              <h5 className='my-3'> This is "Dept Name"</h5>
              <CourseModal/>
                <CourseItem/>
                
            </div>
        </>
    )
}

export default Course
