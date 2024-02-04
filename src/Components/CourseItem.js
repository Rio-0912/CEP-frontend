import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const CourseItem = ({ course, getCourse }) => {
    const courseDelete = async (courseId) => {
        try {
            // Make API call to delete department
            const response = await axios.delete(`http://localhost:9000/api/course/deleteCourse/${courseId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'userID': localStorage.getItem('userId'),
                    'authority': localStorage.getItem('authority'),
                    'departmentId': localStorage.getItem('departmentId'),
                },
            });
    
            // After successfully deleting, update the department list
            getCourse();
    
            // Check if the server returned an error
            if (response.status !== 200) {
                console.error("Error deleting department:", response.data);
            }
        } catch (error) {
            console.error("Error deleting department:", error);
        }
    };
    return (
        <div>
            <div className='row my-3 grid-col ' >

                {course.map((cour) => (
                    <div className=' col-md-4 my-2' key={cour._id}>
                        <div className='card'>
                            <div className='card-body '>
                                <h5 className='card-title mb-5 mt-2'>{cour.name}</h5>
                                <Link onClick={()=> courseDelete(cour._id)} className='btn mx-2 btn-outline-dark'>
                                    <i className='fa-solid fa-trash'></i></Link>
                                <Link to='/batch' className='btn mx-2 btn-outline-dark position-absolute  '  >
                                    View <i className="fa-solid fa-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CourseItem
