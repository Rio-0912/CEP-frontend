import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Graph from './Graph';


const Reports = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalStudents, setTotalStudents] = useState(0);
    const [batchId, setBatchId] = useState('');
    const [Batch, setBatch] = useState([]);
    const [course, setCourse] = useState([]);
    const [courseId, setCourseId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleBatchChange = (e) => {
        setBatchId(e.target.value);
    };

    const getCourse = async () => {
        const deptId = localStorage.getItem('departmentId');

        try {
            const response = await axios.get(`https://cep-backend.vercel.app/api/course/getDeptCourses/${deptId}`, {
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

            const newCourse = response.data;
            setCourse(newCourse);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const getBatches = useCallback(async () => {
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
            setBatch(newBatch);

        } catch (error) {
            console.error('Error fetching batches:', error);
        }
    }, [courseId]);

    const fetchTotalAmountByCourse = async () => {
        try {
            const response = await axios.get(`https://cep-backend.vercel.app/api/report/totalAmountByCourse/${courseId}`);

            if (response.data.success) {
                if (response.data.totalAmount !== null && response.data.totalAmount !== undefined) {
                    setTotalAmount(response.data.totalAmount);
                } else {
                    setTotalAmount(0);
                }
            } else {
                setError(response.data.error || 'Failed to fetch total amount');
            }
        } catch (error) {
            setError('Error fetching total amount by course:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTotalAmountByBatch = async () => {
        try {
            const response = await axios.get(`https://cep-backend.vercel.app/api/report/totalAmount/${batchId}`);

            if (response.data.success) {
                if (response.data.totalAmount !== null && response.data.totalAmount !== undefined) {
                    setTotalAmount(response.data.totalAmount);
                } else {
                    setTotalAmount(0);
                }
            } else {
                setError(response.data.error || 'Failed to fetch total amount');
                error()
            }
        } catch (error) {
            setError('Error fetching total amount by batch:', error);

            loading()
        } finally {
            setLoading(false);

        }
    };

    const fetchTotalStudentsByBatch = async () => {
        try {
            const response = await axios.get(`https://cep-backend.vercel.app/api/report/totalStudentsByBatch/${batchId}`);

            if (response.data.success) {
                setTotalStudents(response.data.totalStudents);
            } else {
                console.error(response.data.error || 'Failed to fetch total students');
            }
        } catch (error) {
            console.error('Error fetching total students by batch:', error);
        }
    };

    const fetchTotalStudentsByCourse = async () => {
        try {
            const response = await axios.get(`https://cep-backend.vercel.app/api/report/totalStudentsByCourse/${courseId}`);

            if (response.data.success) {
                setTotalStudents(response.data.totalStudents);
            } else {
                console.error(response.data.error || 'Failed to fetch total students');
            }
        } catch (error) {
            console.error('Error fetching total students by course:', error);
        }
    };
    const [courseStats, setCourseStats] = useState([]);
    const [batchStats, setBatchStats] = useState([]);



    const fetchCertificationStatsForCourse = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/report/certificationStatsForCourse/${courseId}`);
            setCourseStats(response.data);
        } catch (error) {
            setError('Error fetching certification stats for course:', error.message);
        }
    };

    const fetchCertificationStatsForBatch = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/report/certificationStatsForBatch/${batchId}`);
            setBatchStats(response.data);
        } catch (error) {
            setError('Error fetching certification stats for batch:', error.message);
        }
    };


    useEffect(() => {
        const fetchTotalAmount = async () => {
            if (batchId) {
               
                await fetchTotalAmountByBatch();
                await fetchCertificationStatsForBatch();
                await fetchTotalStudentsByBatch();
            } else if (courseId) {
                
                await fetchTotalAmountByCourse();
                await fetchCertificationStatsForCourse()
                await fetchTotalStudentsByCourse();
            }
        };

        fetchTotalAmount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [batchId, courseId]);
 

    useEffect(() => {
        getCourse();
    }, []);

    useEffect(() => {
        if (courseId) {
            setTotalAmount(0);
            setTotalStudents(0);
            getBatches();
        }
    }, [courseId, getBatches]);

    const handleCourseChange = (e) => {
        setCourseId(e.target.value);
        setBatchId(''); // Reset batchId when course changes
        setTotalAmount(0); // Reset totalAmount when course changes
        setTotalStudents(0); // Reset totalStudents when course changes
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5 ">
                    <div className="card bg-light m-2 p-2">
                        <div className="card-body">
                            <div className="row ">
                                <div className="col-12">
                                    <label className="form-label select-label mx-2">Course</label>
                                    <select className="select" value={courseId} onChange={handleCourseChange}>
                                        <option value="">Select a course</option>
                                        {course.map((cour) => (
                                            <option key={cour._id} value={cour._id}>
                                                {cour.name}
                                            </option>
                                        ))}
                                    </select>
                                    <label className="form-label select-label mx-2">Batch</label>
                                    <select className="select dropdown-toogle" disabled={!Batch.length} value={batchId} onChange={handleBatchChange}>
                                        <option value="">Select a Batch</option>
                                        {Batch.length ? (
                                            Batch.map((bat) => (
                                                <option key={bat._id} value={bat._id}>
                                                    {bat.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>Loading batches...</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <h5 className="card-title">
                                <h3>Total Amount Collected : <div className='text-success'>₹ {totalAmount}</div></h3>
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 ">
                    <div className="card bg-light m-2 p-2">
                        <div className="card-body">
                            <div className="row ">
                                <div className="col-12">
                                    <label className="form-label select-label mx-2">Course</label>
                                    <select className="select" value={courseId} onChange={handleCourseChange}>
                                        <option value="">Select a course</option>
                                        {course.map((cour) => (
                                            <option key={cour._id} value={cour._id}>
                                                {cour.name}
                                            </option>
                                        ))}
                                    </select>
                                    <label className="form-label select-label mx-2">Batch</label>
                                    <select className="select dropdown-toogle" disabled={!Batch.length} value={batchId} onChange={handleBatchChange}>
                                        <option value="">Select a Batch</option>
                                        {Batch.length ? (
                                            Batch.map((bat) => (
                                                <option key={bat._id} value={bat._id}>
                                                    {bat.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>Loading batches...</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <h5 className="card-title">
                                <h3>Total Students : <div className={`text-success`}>{totalStudents}</div></h3>
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 ">
                    <div className="card bg-light m-2 p-2">
                        <div className="card-body">
                            <div className="row ">
                                <div className="col-12">
                                    <label className="form-label select-label mx-2">Course</label>
                                    <select className="select" value={courseId} onChange={handleCourseChange}>
                                        <option value="">Select a course</option>
                                        {course.map((cour) => (
                                            <option key={cour._id} value={cour._id}>
                                                {cour.name}
                                            </option>
                                        ))}
                                    </select>
                                    <label className="form-label select-label mx-2">Batch</label>
                                    <select className="select dropdown-toogle" disabled={!Batch.length} value={batchId} onChange={handleBatchChange}>
                                        <option value="">Select a Batch</option>
                                        {Batch.length ? (
                                            Batch.map((bat) => (
                                                <option key={bat._id} value={bat._id}>
                                                    {bat.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>Loading batches...</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                           
                      {courseId && batchId ? <Graph data={batchStats}/> : courseId? <Graph data={courseStats}/>: 'No dat to fetch'}
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card bg-success text-white m-2">
                        <div className="card-body">
                            <h2 className="card-title">This is a title</h2>
                            <p className="card-text">This is body text inside my Bootstrap card.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-success text-white m-2">
                        <div className="card-body">
                            <h2 className="card-title">This is a title</h2>
                            <p className="card-text">This is body text inside my Bootstrap card.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Reports;
