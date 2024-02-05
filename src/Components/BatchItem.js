import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BatchItem = ({ getBatches, batch }) => {
    const batchDelete = async (batchId) => {
        try {
            // Make API call to delete department
            const response = await axios.delete(`http://localhost:9000/api/batch/deleteBatch/${batchId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'userID': localStorage.getItem('userId'),
                    'authority': localStorage.getItem('authority'),
                    'departmentId': localStorage.getItem('departmentId'),
                },
            });
            // After successfully deleting, update the department list
            getBatches();

            // Check if the server returned an error
            if (response.status !== 200) {
                console.error("Error deleting department:", response.data);
            }
        } catch (error) {
            console.error("Error deleting department:", error);
        }
    };

    return (
        <>
            <div style={{ maxHeight: '200px' }}>
                {batch.length > 0 ? (
                    <table className="table table-striped" style={{ maxHeight: '75vh' }}>
                        <thead>
                            <tr>
                                <th>Batch Number</th>
                                <th>Cost</th>
                                <th>Time</th>
                                <th>Faculty</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {batch.map((bat) => (
                                <tr key={bat._id}>
                                    <td>{bat.name}</td>
                                    <td>{bat.cost}</td>
                                    <td>{bat.time}</td>
                                    <td>{bat.faculty}</td>
                                    <td>
                                        <Link className="fa-solid fa-trash btn btn-outline-dark mx-1" onClick={(e) => batchDelete(bat._id)}></Link>
                                        <Link className="fa-solid fa-arrow-right btn btn-outline-dark" to={'/student'} onClick={()=>localStorage.setItem('batchId',bat._id)}></Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h5 className='m-3'>No Batches Here</h5>
                )}
            </div>
        </>
    );
};

export default BatchItem;
