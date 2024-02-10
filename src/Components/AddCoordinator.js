import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GetCoordinator from './GetCoordinator';

const AddCoordinator = (props) => {
    const { showAlert } = props;
    const history = useNavigate();

    // State variables for storing input field values
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [authority, setauthority] = useState('Coordinator')
    const deptId = localStorage.getItem('departmentId');
    const navigate = useNavigate()
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

    const [coordinator, setCoordinator] = useState()
    const getCods = async () => {
        try {
            const response = await axios.get(`https://cep-backend.vercel.app/api/auth/getCoordinators/${deptId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'userID': localStorage.getItem('userId'),
                    'authority': localStorage.getItem('authority'),
                    'deptId': localStorage.getItem('deptId')
                },
                
            });
            if (!response.data.success) {
                throw new Error(response.data.error || 'No data in the response');
            }

            const newCoordinator = response.data.coordinators;
            setCoordinator(newCoordinator);
        } catch (error) {
            console.error('Error fetching coordinators:', error.message);
        }
    };
    useEffect(() => {
        checkHOD()
        getCods()
    })


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(' i got clikecd');
        window.scrollTo(0, 0)
        setauthority('Coordinator')
        console.log(email,
            password,
            authority,
            deptId);
        // AddCoordinator component (handleFormSubmit function)

        try {
            const response = await axios.post(`https://cep-backend.vercel.app/api/auth/createUser`, {
                email,
                password,
                authority,
                deptId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'deptId': localStorage.getItem('departmentId'),
                    'userId': localStorage.getItem('userId'),
                    'authority': localStorage.getItem('authority'),
                },
            });

            // Check if the request was successful
            if (response.status === 201) {
                console.log('completed');
                setemail('');
                setpassword('');
                showAlert('Coordinator added successfully ', 'success');
            } else {
                console.log('in else');
            }
        } catch (error) {
            // Handle other errors
            if (error.response && error.response.status === 400 && error.response.data.error.includes('Email already exists')) {
                showAlert('Email already exists. Please use a different one.', 'danger');
            } else {
                showAlert('An error occurred while adding the Coordinator', 'danger');
                console.error("Error adding Coordinator:", error);
            }
        }
    }


    return (
        <div>
            <div>

                <div><i className="fa-solid fa-left-long btn  btn-lg rounded-pill mx-4 my-2" id='up' onClick={() => { history(-1); }}></i></div>

                <div className="container">
                    <div className="row justify-content-center align-items-center ">
                        <div className="col-12 col-lg-9 col-xl-7">
                            <div className="card shadow-2-strong card-registration" >
                                <div className="card-body p-md-4 ">
                                    <h3 className="mb-3 pb-2 pb-md-0 mb-md-5">Add Cordinator in {localStorage.getItem('shortName')}</h3>
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <div className="form-outline">
                                                    <input required type="text" id="firstName" className="form-control" value={email} onChange={(e) => setemail(e.target.value)} />
                                                    <label className="form-label" htmlFor="firstName"> Email</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <div className="form-outline">
                                                    <input required type="text" id="lastName" className="form-control" disabled value='Coordinator' onChange={(e) => setauthority(e.target.value)} />
                                                    <label className="form-label" htmlFor="lastName">Authority</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3 d-flex align-items-center">
                                                <div className="form-outline datepicker w-100">
                                                    <input required type="text" className="form-control" id="birthdayDate" value={password} onChange={(e) => setpassword(e.target.value)} />
                                                    <label htmlFor="birthdayDate" className="form-label">Password</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-2">
                                            <input required className="btn btn-primary btn-lg" type="submit" value="Submit" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <GetCoordinator coordinator={coordinator} getCods={getCods} />
                </div >
            </div >


        </div>
    )
}

export default AddCoordinator
