import React, { useState, useRef } from 'react';

const BatchModal = ({ addBatchViaMain }) => {
    const [name, setname] = useState('');
    const [cost, setcost] = useState('');
    const [time, settime] = useState('');
    const [faculty, setfaculty] = useState('');
    const [endingDate, setEndingDate] = useState(''); // 
    const [startingDate, setStartingDate] = useState('');
    const modalRef = useRef();

    const addBatch = async (e) => {
        e.preventDefault();
        try {
            // Call the addBatchViaMain function to handle adding the new batch
            addBatchViaMain({ name, cost, time, faculty, startingDate, endingDate,deptId: localStorage.getItem('departmentId') }); // Include endingDate in the function call

            // Clear form fields after submitting
            setname('');
            setcost('');
            setfaculty('');
            settime('');
            setStartingDate('');
            setEndingDate(''); // Clear endingDate as well

            // Programmatically close the modal using the ref
            modalRef.current.click();
        } catch (error) {
            console.error("Error adding batch:", error);
        }
    };

    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@g">
                Add Batch
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Add Batch
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={modalRef}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={addBatch}>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">
                                        Name
                                    </label>
                                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setname(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">
                                        Cost
                                    </label>
                                    <input type="text" className="form-control" id="cost" value={cost} onChange={(e) => setcost(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">
                                        Time
                                    </label>
                                    <input type="text" className="form-control" id="time" value={time} onChange={(e) => settime(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">
                                        Faculty
                                    </label>
                                    <input type="text" className="form-control" id="faculty" value={faculty} onChange={(e) => setfaculty(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">
                                        Starting Date
                                    </label>
                                    <input type="date" className="form-control" id="startingDate" value={startingDate} onChange={(e) => setStartingDate(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">
                                        Ending Date
                                    </label>
                                    <input type="date" className="form-control" id="endingDate" value={endingDate} onChange={(e) => setEndingDate(e.target.value)} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Add Batch
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BatchModal;
