import React from 'react';
import axios from 'axios'
import UpdateStudent from './UpdateStudent';


const StudentItem = ({ Students, getStudents }) => {
    const studentDelete = async (studentId) => {
        try {
            // Make API call to delete department
            const response = await axios.delete(`https://cep-backend.vercel.app/api/student/deleteStudent/${studentId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'userId': localStorage.getItem('userId'),
                    'authority': localStorage.getItem('authority'),
                    'deptId': localStorage.getItem('departmentId'),
                },
            });
            
            // Check if the server returned an error
            if (response.status !== 200) {
                console.error("Error deleting department:", response.data);
            }
            // After successfully deleting, update the department list
            getStudents();
        } catch (error) {
            console.error("Error deleting department:", error);
        }
    };

   
    return (
        <div >
            <div className='row my-3 grid-col'>
                {Students.map((stud) => (

                    <div className='col-md-3 my-2' key={stud._id}>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>{stud.enrollmentNumber}</h5>
                                <h6 className='card-title'>{stud.name} <strong>{stud.gender}</strong> {stud.DOB}  {stud.category}</h6>
                                <div className='card-text my-1'> <strong>Address:</strong> {stud.address}</div>
                                <div className='card-text my-1'> <strong>Phone:</strong> {stud.phoneNo} </div>
                                <div className='card-text my-1'> <strong>Email:</strong> {stud.email} </div>
                                <div className='card-text my-1'> <strong>City:</strong> {stud.city} {stud.pincode}</div>
                                <div className='card-text my-1'> <strong>Certicate:</strong> {stud.isCertificateIssued === false ? <span style={{ color: 'red' }}>Not issued </span> : <span style={{ color: 'green', fontWeight: 900 }}>Issued</span>}</div>
                                <div className='card-text my-1'> <strong>Amount:</strong>  {stud.amount}</div>
                                <div className='card-text my-1'> <strong>Tranaction mumber:</strong>  {stud.transactionNumber}</div>
                                <button className='btn mx-2 btn-outline-dark' onClick={() => studentDelete(stud._id)} >
                                    <i className='fa-solid fa-trash'></i>
                                </button>
                                   <UpdateStudent id={stud._id} stud={stud}/>                           

                                
                            </div>
                        </div>
                    </div>
                ))}


            </div>

        </div>
    );
};

export default StudentItem;
