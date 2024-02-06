import React, { useState,useRef } from 'react'
import axios from 'axios'

const UpdateStudent = ({ id, stud }) => {
    const modalId = `exampleModal-${id}`;
    const [name, setName] = useState(stud.name);
    const [DOB, setDOB] = useState(stud.DOB);
    const [address, setAddress] = useState(stud.address);
    const [city, setCity] = useState(stud.city);
    const [pincode, setPincode] = useState(stud.pincode);
    const [gender, setGender] = useState(stud.gender);
    const [email, setEmail] = useState(stud.email);
    const [phoneNo, setPhoneNo] = useState(stud.phoneNo);
    const [transactionNumber, setTransactionNumber] = useState(stud.transactionNumber);
    const [amount, setAmount] = useState(stud.amount);
    const [isCertificateIssued, setisCertificateIssued] = useState(stud.isCertified);
    const modalRef = useRef();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send PUT request to update student information
            const response = await axios.put(`http://localhost:9000/api/student/updateStudent/${id}`, {
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
                isCertificateIssued

            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'userID': localStorage.getItem('userId'),
                        'authority': localStorage.getItem('authority'),
                        'departmentId': localStorage.getItem('departmentId'),
                    }
                });

            // Handle success response
            if (response.data.success) {
                // Do something on success, like showing a success message
                console.log('Student updated successfully');
            }
           
            console.log(response);
        } catch (error) {
            // Handle error
            console.error('Error updating student:', error);
        }
    };
const closeModal = () =>{
    modalRef.current.click();
}

    return (
        <span>
          
            <button className="btn btn-outline-dark mx-2" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
                <i className="fa-solid fa-pen-to-square" />
            </button>

            <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={modalRef}></button>
                        </div>
                        <div className="modal-body">
                            <div className="row justify-content-center align-items-center ">
                                <div className="col-12 col-lg-9 col-xl-7">
                                    <div className="card shadow-2-strong card-registration" >
                                        <div className="card-body p-md-4 ">
                                            <h3 className="mb-3 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                                            <form onClick={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <div className="form-outline">
                                                            <input required type="text" id="firstName" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                                            <label className="form-label" htmlFor="firstName"> Name</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <div className="form-outline">
                                                            <input type="date" required id="lastName" className="form-control" value={DOB} onChange={(e) => setDOB(e.target.value)} max={new Date().toISOString().split("T")[0]} />
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
                                                        <select className="select" value={isCertificateIssued ? "Yes" : "No"} onChange={(e) => setisCertificateIssued
                                                            (e.target.value === 'Yes')}>
                                                            <option value="No">No</option>
                                                            <option value="Yes">Yes</option>
                                                        </select>

                                                    </div>

                                                </div>

                                                <div className="mt-4 pt-2">
                                                    <input required className="btn btn-primary btn-lg" type="submit" value="Submit" onClick={closeModal}/>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </span>
    );
};

export default UpdateStudent;



