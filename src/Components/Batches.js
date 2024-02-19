import React, { useState, useEffect, useCallback } from 'react';
import Auth from '../Middleware/auth';
import axios from 'axios';
import BatchItem from './BatchItem';
import BatchModal from './BatchModal';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import Loader from '../Assets/Loader.json'

const Batches = ({ showAlert }) => {

    const [batch, setbatch] = useState([]);
    const courseId = localStorage.getItem('courseId');
    const [loading, setLoading] = useState(true);
    const history = useNavigate();
    const checkHOD = useCallback(async () => {
        try {
            let email;
            if (localStorage.getItem('email')) {
                email = localStorage.getItem('email');
            } else {
                history('/');
            }
            const departmentId = localStorage.getItem('departmentId');

            const response = await fetch(`https://cep-backend.vercel.app/api/auth/checkHOD`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    deptId: departmentId,
                }),
            });

            // console.log(response);

            if (response.ok) {
                const { name, email: responseEmail } = await response.json();

                // Check if the email from the response is not equal to the stored email
                if (responseEmail !== email) {
                    // Use navigate to go to '/'
                    history('/');
                } else {
                    // Set the name and email in local storage
                    localStorage.setItem('deptName', name);
                    localStorage.setItem('email', responseEmail);
                }
            } else {
                console.error('Failed to check HOD:', response.statusText);
            }
        } catch (error) {
            console.error('Error checking HOD:', error.message);
        }
    }, [history]);

    const addBatchViaMain = async (newBatch) => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'deptId': localStorage.getItem('departmentId'),
                'userID': localStorage.getItem('userId'),
                'authority': localStorage.getItem('authority'),
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
            const response = await axios.get(`https://cep-backend.vercel.app/api/batch/getBatches/${courseId}`, {
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
            setLoading(false)
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    // useEffect(() => {
    //     checkHODAccess();
    // }, [checkHODAccess]); // Only run once on mount

    useEffect(() => {
        checkHOD()
        getBatches()
    },)



    return (
        <div>
            {loading ? (

                <Player
                    src={Loader}
                    className="player"
                    autoplay
                    loop
                    style={{ height: '300px', width: '300px' }}
                />

            ) : (


                <><div>
                    <div><i className="fa-solid fa-left-long btn  btn-lg rounded-pill mx-4 my-2" onClick={() => { history(-1); }}></i></div>
                    <div className="container">
                        <h4><Auth /></h4>
                        <h5 className='my-3'> Course of {localStorage.getItem('courseName')}</h5>
                        <BatchModal addBatchViaMain={addBatchViaMain} />
                        <BatchItem batch={batch} getBatches={getBatches} showAlert={showAlert} />

                    </div>
                </div></>
            )}


            {!loading && batch.length === 0 && <p>No data available</p>}
        </div>
    )
}

export default Batches
