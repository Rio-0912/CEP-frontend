import React, { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Alert from './Alert';

const AddStudent = (props) => {
    const { showAlert } = props;
    const history = useNavigate();
    const batchId = localStorage.getItem('batchId')
    // State variables for storing input field values
    const [name, setName] = useState('');
    const [DOB, setDOB] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [transactionNumber, setTransactionNumber] = useState('');
    const [amount, setAmount] = useState();
    const [isCertified, setIsCertified] = useState(false);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:9000/api/student/createStudent/${batchId}`, {
                name,
                gender,
                DOB,
                phoneNo,
                address,
                city,
                pincode,
                email,
                transactionNumber,
                amount,
                isCertified
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'userID': localStorage.getItem('userId'),
                    'authority': localStorage.getItem('authority'),
                    'departmentId': localStorage.getItem('departmentId'),
                },
            });
            
            console.log('Response:', response.data);
            // Check if the request was successful
            if (response.status === 201) {
                console.log('completed');
            } else {
                console.log('completed');
            }
            setAddress('');
            setName('');
            setAmount('');
            setPhoneNo('')
            setCity('')
            setEmail('')
            setDOB('')
            setGender('')
            setIsCertified(false)
            setPincode('')
            setTransactionNumber('')
            showAlert('Student added successfully ', 'success');
            
        } catch (error) {
            // Handle other errors
            console.error("Error adding course:", error);
        }
    };


    return (
        <div>

            <div><i className="fa-solid fa-left-long btn  btn-lg rounded-pill mx-4 my-2" onClick={() => { history(-1); }}></i></div>
            <Alert message={'THis is alert'} type={'success'} />
            <div className="container">
                <div className="row justify-content-center align-items-center ">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" >
                            <div className="card-body p-md-4 ">
                                <h3 className="mb-3 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                                <form onSubmit={handleFormSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <div className="form-outline">
                                                <input required type="text" id="firstName" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                                <label className="form-label" htmlFor="firstName"> Name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-outline">
                                                <input required type="date" id="lastName" className="form-control" value={DOB} onChange={(e) => setDOB(e.target.value)} max={new Date().toISOString().split("T")[0]} />
                                                <label className="form-label" htmlFor="lastName">Date Of Birth</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3 d-flex align-items-center">
                                            <div className="form-outline datepicker w-100">
                                                <input required type="text" className="form-control" id="birthdayDate" value={address} onChange={(e) => setAddress(e.target.value)} />
                                                <label htmlFor="birthdayDate" className="form-label">Address</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3 d-flex align-items-center">
                                            <div className="form-outline datepicker w-100">
                                                <input required type="text" className="form-control" id="birthdayDate" value={city} onChange={(e) => setCity(e.target.value)} />
                                                <label htmlFor="birthdayDate" className="form-label">City</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3 d-flex align-items-center">
                                            <div className="form-outline datepicker w-100">
                                                <input required type="number" className="form-control" id="birthdayDate" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                                                <label htmlFor="birthdayDate" className="form-label">Pincode</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <h6 className="mb-2 pb-1">Gender: </h6>
                                            <div className="form-check form-check-inline" >
                                                <input required className="form-check-input" type="radio" name="gender" id="femaleGender" value="F" checked={gender === 'F'} onChange={(e) => setGender(e.target.value)} />
                                                <label className="form-check-label" htmlFor="femaleGender">Female</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input required className="form-check-input" type="radio" name="gender" id="maleGender" value="M" checked={gender === 'M'} onChange={(e) => setGender(e.target.value)} />
                                                <label className="form-check-label" htmlFor="maleGender">Male</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input required className="form-check-input" type="radio" name="gender" id="otherGender" value="O" checked={gender === 'O'} onChange={(e) => setGender(e.target.value)} />
                                                <label className="form-check-label" htmlFor="otherGender">Other</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3 pb-2">
                                            <div className="form-outline">
                                                <input required type="email" id="emailAddress" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <label className="form-label" htmlFor="emailAddress">Email</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3 pb-2">
                                            <div className="form-outline">
                                                <input required type="tel" id="phoneNumber" className="form-control" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                                                <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3 pb-2">
                                            <div className="form-outline">
                                                <input required type="tel" id="transactionNumber" className="form-control" value={transactionNumber} onChange={(e) => setTransactionNumber(e.target.value)} />
                                                <label className="form-label" htmlFor="transactionNumber">Transaction Number</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3 pb-2">
                                            <div className="form-outline">
                                                <input required type="number" id="amount" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                                <label className="form-label" htmlFor="amount">Amount</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <label className="form-label select-label mx-2">Is Certified</label>
                                            <select className="select" value={isCertified ? "Yes" : "No"} onChange={(e) => setIsCertified(e.target.value === 'Yes')}>
                                                <option value="No">No</option>
                                                <option value="Yes">Yes</option>
                                            </select>
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

            </div>
        </div>
    );
};

export default AddStudent;
