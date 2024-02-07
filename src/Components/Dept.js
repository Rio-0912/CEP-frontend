// DeptContainer.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import DeptItem from './DeptItem';

const Dept = (props) => {
    const [depts, setDepts] = useState([]);
    let { showAlert } = props
    const getDepts = async () => {
        try {
           
            const response = await axios.get(`http://localhost:9000/api/dept/getDept`, {
                headers: {
                    'Content-Type': 'application/json',
                    'userID': localStorage.getItem('userId'),
                    'authority': localStorage.getItem('authority'),
                    'departmentId': localStorage.getItem('departmentId'),
                },
            });

            if (!response.data) {
                throw new Error('No data in the response');
            }

            const newDept = response.data;
            setDepts(newDept);

        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const addDept = async (newDept) => {
        try {
            // Logic to add a new department (make API call, etc.)
            await axios.post('http://localhost:9000/api/dept/createDept', newDept, {
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
        } catch (error) {
            console.error("Error adding department:", error);

        }
    };

    const deleteDept = async (deptId) => {
        try {
            // Logic to delete a department (make API call, etc.)
            await axios.delete(`http://localhost:9000/api/dept/deleteDept/${deptId}`, {
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
            <Modal addDept={addDept} />
            <DeptItem depts={depts} deleteDept={deleteDept} getDepts={getDepts} showAlert={showAlert} />
        </div>
    );
};

export default Dept;
