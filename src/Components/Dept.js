// DeptContainer.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import DeptItem from './DeptItem';
import Auth from '../Middleware/auth';
import { Player } from '@lottiefiles/react-lottie-player';
import Loader from '../Assets/Loader.json'

const Dept = (props) => {
    const [depts, setDepts] = useState([]);
    const [loading, setLoading] = useState(true);
    let { showAlert } = props
    const getDepts = async () => {
        try {

            const response = await axios.get(`https://cep-backend.vercel.app/api/dept/getDept`, {
                headers: {
                    'Content-Type': 'application/json',
                    'userID': localStorage.getItem('userId'),
                    'authority': localStorage.getItem('authority'),
                    'departmentId': localStorage.getItem('departmentId'),
                },
            });
            console.log('i ma here');
            if (!response.data) {
                throw new Error('No data in the response');
            }

            const newDept = response.data;
            setDepts(newDept);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const addDept = async (newDept) => {
        try {
            // Logic to add a new department (make API call, etc.)
            await axios.post('https://cep-backend.vercel.app/api/dept/createDept', newDept, {
                headers: {
                    'Content-Type': 'application/json',
                    'userID': localStorage.getItem('userId'),
                    'authority': localStorage.getItem('authority'),
                    'departmentId': localStorage.getItem('departmentId'),
                }
            });

            // After successfully adding, update the department list
            getDepts();
            showAlert('Department Added Successful', 'success')
            setLoading(false);
        } catch (error) {
            console.error("Error adding department:", error);

        }
    };

    const deleteDept = async (deptId) => {
        try {
            // Logic to delete a department (make API call, etc.)
            await axios.delete(`https://cep-backend.vercel.app/api/dept/deleteDept/${deptId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'userID': localStorage.getItem('userId'),
                    'authority': localStorage.getItem('authority'),
                    'departmentId': localStorage.getItem('departmentId'),
                },
            });

            showAlert('Department Deleted Successful', 'success')
            // After successfully deleting, update the department list
            getDepts();
            setLoading(false);
        } catch (error) {
            console.error("Error deleting department:", error);
            showAlert('Error is deleting department', 'danger')
        }
    };

    useEffect(() => {
        getDepts();
    }, []);

    return (
        <div>
            <div className="d-none"><Auth /></div>
            <Modal addDept={addDept} />

            {loading ? (

                <Player
                    src={Loader}
                    className="player"
                    autoplay
                    loop
                    style={{ height: '300px', width: '300px' }}
                />

            ) : (
                <DeptItem depts={depts} deleteDept={deleteDept} getDepts={getDepts} showAlert={showAlert} />
            )}


            {!loading && depts.length === 0 && <p>No data available</p>}
        </div>
    );
};

export default Dept;
