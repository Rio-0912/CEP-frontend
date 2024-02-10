import React, { useState, useRef } from 'react';
import Auth from '../Middleware/auth';

const Modal = ({ addDept }) => {
    const [name, setname] = useState('');
    const [shortName, setshortName] = useState('');
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');

    // Create a ref for the modal element
    const modalRef = useRef();

    const addDepartment = async (e) => {
        e.preventDefault();

        try {
            // Call the addDept function to handle adding the new department
            addDept({ name, shortName, email, password });

            // Clear form fields after submitting
            setname('');
            setshortName('');
            setemail('');
            setPassword('');

            // Programmatically close the modal using the ref
            modalRef.current.click();
        } catch (error) {
            console.error("Error adding department:", error);
        }
    };

    return (
        <div>
            <div className="d-none"><Auth/></div>  
            <div className="d-flex justify-content-end">
                <button
                    type="button"
                    className="btn btn-outline-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    Add Department
                </button>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add dept</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={modalRef}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={addDepartment}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Department Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="departmentName"
                                        aria-describedby="emailHelp"
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Department Short Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ShortName"
                                        aria-describedby="emailHelp"
                                        value={shortName}
                                        onChange={(e) => setshortName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="Email"
                                        aria-describedby="emailHelp"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
