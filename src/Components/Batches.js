import React, { useState, useEffect } from 'react'
import Auth from '../Middleware/auth'
import axios from 'axios'
import BatchItem from './BatchItem'
import Navbar from './Navbar'
import BatchModal from './BatchModal'
import { useNavigate } from 'react-router-dom'

const Batches = () => {
    const [batch, setbatch] = useState([])
    const courseId = localStorage.getItem('courseId')
    const history = useNavigate()

    const addBatchViaMain = async (newBatch) => {
        try {
            await axios.post(`http://localhost:9000/api/batch/createBatch/${courseId}`, newBatch, {
                headers: {
                    'Content-Type': 'application/json',
                    'userID': localStorage.getItem('userId'),
                    'authority': localStorage.getItem('authority'),
                    'departmentId': localStorage.getItem('departmentId'),
                },
            });

            // After successfully adding, update the course list
            getBatches()
        } catch (error) {
            console.error("Error adding course:", error);
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
    useEffect(() => {
        getBatches()
    },)



    return (
        <div>
           <div >
                <div><i className="fa-solid fa-left-long btn  btn-lg rounded-pill mx-4 my-2" onClick={() => { history(-1); localStorage.removeItem('courseId') }}></i></div>
                <div className="container">
                    <h4><Auth /></h4>
                    <h5 className='my-3'> Course of {localStorage.getItem('courseName')}</h5>
                    <BatchModal addBatchViaMain={addBatchViaMain} />
                    <BatchItem batch={batch} getBatches={getBatches} />

                </div>
            </div>
        </div>
    )
}

export default Batches
