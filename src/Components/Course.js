// Course.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Auth from '../Middleware/auth';
import CourseItem from './CourseItem';
import CourseModal from './CourseModal'; // Make sure to import CourseModal

const Course = () => {
    const [course, setcourse] = useState([]);

    const gettingShortNameViaDeptId = async () => {
        const deptId = localStorage.getItem('departmentId')
        try {
            const response = await axios.get(`http://localhost:9000/api/dept/shortNameFromDeptId/${deptId}`, {
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
            console.log(response);
            const shortName = response.data;
            localStorage.setItem('shortName', shortName.shortName)



        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }

    const getCourse = async () => {
        const deptId = localStorage.getItem('departmentId')
        console.log(deptId);
        try {
            const response = await axios.get(`http://localhost:9000/api/course/getDeptCourses/${deptId}`, {
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

            const newCourse = response.data;
            setcourse(newCourse);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const addCourseInDept = async (newCourse) => {
        try {
            await axios.post('http://localhost:9000/api/course/createCourse', newCourse, {
                headers: {
                    'Content-Type': 'application/json',
                    'userID': localStorage.getItem('userId'),
                    'authority': localStorage.getItem('authority'),
                    'departmentId': localStorage.getItem('departmentId'),
                },
            });

            // After successfully adding, update the course list
            getCourse();
        } catch (error) {
            console.error("Error adding course:", error);
        }
    };

    useEffect(() => {
        getCourse();
        gettingShortNameViaDeptId()
    }, []);

    return (
        <>
            <Navbar />
            <div className='container my-3'>
                <h4><Auth /></h4>
                <h5 className='my-3'> This is "Dept Name"</h5>
                <CourseModal addCourseInDept={addCourseInDept} />
                <CourseItem course={course} getCourse={getCourse} />
            </div>
        </>
    );
};

export default Course;
