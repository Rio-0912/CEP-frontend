import React, { useEffect, useState } from 'react'
import Auth from '../Middleware/auth'
import { Link, useNavigate } from 'react-router-dom'
import StudentItem from './StudentItem'
import axios from 'axios'

const Students = () => {
    const history = useNavigate()
    const [Students, setStudents] = useState([])
    const batchId = localStorage.getItem('batchId')
    const getStudents = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/student/getStudents/${batchId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'deptId': localStorage.getItem('departmentId'),
                    'userID': localStorage.getItem('userId'),
                    'authority': localStorage.getItem('authority'),
                },
            });

            if (!response.data) {
                throw new Error('No data in the response');
            }

            const newBatch = response.data;
            setStudents(newBatch);
            
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    useEffect(() => {
        getStudents()
    },)


    return (
        <div>
            <Auth/>
            <div><i className="fa-solid fa-left-long btn  btn-lg rounded-pill mx-4 my-2" onClick={() => { history(-1); }}></i></div>
            <div className='container'>
            <Link type="button" className="btn btn-outline-dark" to= '/addStudent'>
                Add Student
            </Link>
                <h4><Auth /></h4>
                <h5>This is {localStorage.getItem('batchName')}</h5>
                <StudentItem Students={Students} getStudents={getStudents}/>
            </div>
        </div>
    )
}

export default Students
