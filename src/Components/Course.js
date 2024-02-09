// Course.js
import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import Auth from '../Middleware/auth';
import CourseItem from './CourseItem';
import CourseModal from './CourseModal'; // Make sure to import CourseModal
import { useNavigate } from 'react-router-dom';

const Course = (props) => {
    const [course, setcourse] = useState([]);
    let { showAlert } = props
    const navigate = useNavigate()


    // Course.js
    // ...

    const checkHOD = useCallback(async () => {
        try {
            let email;
            if (localStorage.getItem('email')) {
                email = localStorage.getItem('email');
            } else {
                navigate('/');
            }
            const departmentId = localStorage.getItem('departmentId');

            const response = await fetch(`http://localhost:9000/api/auth/checkHOD`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    deptId: departmentId,
                }),
            });

            console.log(response);

            if (response.ok) {
                const data = await response.json();

                // Check if the email from the response is not equal to the stored email
                if (data !== email) {
                    // Use navigate to go to '/'
                    navigate('/');
                }
            } else {
                console.error('Failed to check HOD:', response.statusText);
            }
        } catch (error) {
            console.error('Error checking HOD:', error.message);
        }
    }, [navigate]);
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
            console.log(newCourse);
            await axios.post('http://localhost:9000/api/course/createCourse', newCourse, {
                headers: {
                    'Content-Type': 'application/json',
                    'deptId': localStorage.getItem('departmentId'),
                    'userID': localStorage.getItem('userId'),
                    'authority': localStorage.getItem('authority'),
                },
            });
            showAlert('Course Added successfully ', 'success')
            // After successfully adding, update the course list
            getCourse();
        } catch (error) {
            console.error("Error adding course:", error);
        }
    };

    useEffect(() => {
        checkHOD();
        getCourse();
        gettingShortNameViaDeptId();
    }, [checkHOD]);

    return (
        <>
            <Auth />

            <div>
                <i
                    className="fa-solid fa-left-long btn  btn-lg rounded-pill mx-4 my-2"
                    onClick={() => {
                        navigate(-2);
                        localStorage.removeItem('deptName');
                    }}
                ></i>
            </div>
            <div className="container my-3">
                <h4>
                    <Auth />
                </h4>
                <button className="btn btn-primary" onClick={checkHOD}>
                    check
                </button>
                <h5 className="my-3"> This is {localStorage.getItem('deptName')}</h5>
                <CourseModal addCourseInDept={addCourseInDept} />
                <CourseItem course={course} getCourse={getCourse} showAlert={showAlert} />
            </div>
        </>
    );
};

export default Course;