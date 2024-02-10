// DeptItem.jsx
import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const DeptItem = ({ depts, deleteDept, getDepts, showAlert }) => {
    const navigate = useNavigate()
    
    const goingToCourseWithId = (deptId) =>{
        console.log('i amclickd ');
        localStorage.setItem('departmentId', deptId);
        navigate('/course')
    }

    const handleDelete = async (deptId) => {
        try {
            // Make API call to delete department
            const response = await axios.delete(`https://cep-backend.vercel.app/api/dept/deleteDept/${deptId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'userID': localStorage.getItem('userId'),
                    'authority': localStorage.getItem('authority'),
                    'departmentId': localStorage.getItem('departmentId'),
                },
            });
    
            // After successfully deleting, update the department list
            getDepts();
            showAlert('Department Deleted Successful', 'success')
            // Check if the server returned an error
            if (response.status !== 200) {
                console.error("Error deleting department:", response.data);
                showAlert('Error is deleting department', 'danger')
            }
        } catch (error) {
            console.error("Error deleting department:", error);
          
        }
    };
    
    return (
        <div className='row my-3 grid-col'>
          
            {depts.map((item) => (
                <div className='col-md-4 my-2' key={item._id}>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>{item.name}</h5>
                            <h6 className='card-title'>{item.shortName}</h6>
                            <p className='card-text'>No of batches</p>
                            <button className='btn mx-2 btn-outline-dark' onClick={() => handleDelete(item._id)}>
                                <i className='fa-solid fa-trash'></i>
                            </button>
                           
                            <Link onClick={()=>{goingToCourseWithId(item._id); localStorage.setItem('deptName', item.name); localStorage.setItem('email',item.email) }} className='btn mx-2 btn-outline-dark' to={'/course'}>
                               View <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DeptItem;
