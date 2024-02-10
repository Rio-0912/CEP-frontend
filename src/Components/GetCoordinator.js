import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GetCoordinator = ({ showAlert, getcods, coordinator }) => {

    const deleteCoordinator = async (codId) => {
        try {
            // Make API call to delete department
            const response = await axios.delete(`https://cep-backend.vercel.app/api/auth/deleteCoordinator/${codId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'userID': localStorage.getItem('userId'),
                    'authority': localStorage.getItem('authority'),
                    'deptId': localStorage.getItem('departmentId'),
                },
            });

            // After successfully deleting, update the department list
            if (response.status !== 201) {
                showAlert('Some Error occurred', 'warning');
            }

            getcods();
            showAlert('Batch Deleted Successfully', 'warning');
            // Check if the server returned an error
        } catch (error) {
            console.error("Error deleting department:", error);
        }
    };

    return (
        <div>
            <div>
                <div style={{ maxHeight: '200px' }}>
                    {coordinator && coordinator.length > 0 ? (
                        <table className="table table-striped" style={{ maxHeight: '75vh' }}>
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Authority</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {coordinator.map((cod) => (
                                    <tr key={cod._id}>
                                        <td>{cod.email}</td>
                                        <td>{cod.password}</td>
                                        <td>{cod.authority}</td>
                                        
                                        <td>
                                            <Link className="fa-solid fa-trash btn btn-outline-dark mx-1" onClick={(e) => deleteCoordinator(cod._id)}></Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <h5 className='m-3'>No Batches Here</h5>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GetCoordinator;
