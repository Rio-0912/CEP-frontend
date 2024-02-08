import React, { useState, useEffect } from 'react';
import Auth from '../Middleware/auth';
import axios from 'axios';
import BatchItem from './BatchItem';
import BatchModal from './BatchModal';
import { useNavigate } from 'react-router-dom';

const Batches = ({ showAlert }) => {
    
    const [batch, setbatch] = useState([]);
    const courseId = localStorage.getItem('courseId');
    const history = useNavigate();
    
    

    const addBatchViaMain = async (newBatch) => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'userID': localStorage.getItem('userId'),
                'authority': localStorage.getItem('authority'),
                'departmentId': localStorage.getItem('departmentId'),
            };
    
            // Add departmentId to headers only if HOD access
            if (localStorage.getItem('hodAccess')) {
                headers['deptId'] = localStorage.getItem('departmentId');
            }
    
            await axios.post(`http://localhost:9000/api/batch/createBatch/${courseId}`, newBatch, {
                headers: headers,
            });
    
            getBatches();
            showAlert('Batch created Successfully', 'success');
        } catch (error) {
            console.log(error.response);
            if (error.response && error.response.status === 400) {
                showAlert('Either a batch with the same name exists or You are Under Privileged ', 'danger');
            } else {
                console.error("Error adding course:", error);
            }
        }
    };
    


    const getBatches = async () => {
     
        try {
            const response = await axios.get(`http://localhost:9000/api/batch/getBatches/${courseId}`, {
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
            setbatch(newBatch);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    // useEffect(() => {
    //     checkHODAccess();
    // }, [checkHODAccess]); // Only run once on mount

    useEffect(() => {
        getBatches()
    },)



    return (
        <div>
            <div >
                <div><i className="fa-solid fa-left-long btn  btn-lg rounded-pill mx-4 my-2" onClick={() => { history(-1); }}></i></div>
                <div className="container">
                    <h4><Auth /></h4>
                    <h5 className='my-3'> Course of {localStorage.getItem('courseName')}</h5>
                    <BatchModal addBatchViaMain={addBatchViaMain} />
                    <BatchItem batch={batch} getBatches={getBatches} showAlert={showAlert} />

                </div>
            </div>
        </div>
    )
}

export default Batches
