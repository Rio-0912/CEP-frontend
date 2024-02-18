import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Graph from './Charts/Graph';
import GenderGraph from './Charts/GenderGraph';
import { Player } from '@lottiefiles/react-lottie-player';
import Loader from '../Assets/Loader.json'
import LineChart from './Charts/LineChart';
import Auth from '../Middleware/auth';
import { useNavigate } from 'react-router-dom';



const Reports = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalStudents, setTotalStudents] = useState(0);
    const [batchId, setBatchId] = useState('');
    const [Batch, setBatch] = useState([]);
    const [course, setCourse] = useState([]);
    const [courseId, setCourseId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([])
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [gettingCountOfStudentsAsPerDate, setGettingCountOfStudentsAsPerDate] = useState([])
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

            console.log(response);

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
    const handleBatchChange = (e) => {
        setBatchId(''); // Reset batchId when course changes
        setTotalAmount(0); // Reset totalAmount when course changes
        setTotalStudents(0);
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
            setLoading(false)

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
            setLoading(false)
        } catch (error) {
            console.error('Error fetching batches:', error);
        }
    }, [courseId]);

    const fetchTotalAmountByCourse = async () => {
        try {
            console.log(`${courseId}/${fromDate}/${toDate}`);
            const response = await axios.get(`https://cep-backend.vercel.app/api/report/totalAmountByCourse/${courseId}/${fromDate}/${toDate}`);

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
            const response = await axios.get(`https://cep-backend.vercel.app/api/report/totalAmount/${batchId}/${fromDate}/${toDate}`);

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


        } finally {
            setLoading(false);

        }
    };

    const fetchTotalStudentsByBatch = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/report/totalStudentsByBatch/${batchId}/${fromDate}/${toDate}`);

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
            const response = await axios.get(`http://localhost:9000/api/report/totalStudentsByCourse/${courseId}/${fromDate}/${toDate}`);

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
    const [batchGender, setbatchGender] = useState([])
    const [courseGender, setcourseGender] = useState([])



    const fetchCertificationStatsForCourse = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/report/certificationStatsForCourse/${courseId}/${fromDate}/${toDate}`);
            setCourseStats(response.data);
        } catch (error) {
            setError('Error fetching certification stats for course:', error.message);
        }
    };

    const fetchCertificationStatsForBatch = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/report/certificationStatsForBatch/${batchId}/${fromDate}/${toDate}`);
            setBatchStats(response.data);
        } catch (error) {
            setError('Error fetching certification stats for batch:', error.message);
        }
    };
    const genderRatioForCourse = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/report/courseWiseGender/${courseId}/${fromDate}/${toDate}`);
            setcourseGender(response.data);
        } catch (error) {
            setError('Error fetching certification stats for course:', error.message);
        }
    };

    const genderRatioForBatch = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/report/batchWiseGender/${batchId}/${fromDate}/${toDate}`);
            setbatchGender(response.data);
        } catch (error) {
            setError('Error fetching certification stats for batch:', error.message);
        }
    };
    const fetchStudentCategoryByCourse = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/report/countStudentsByCategory/${courseId}/${fromDate}/${toDate}`);
            console.log(response.data);
            setCategory(response.data);
        } catch (error) {
            setError('Error fetching category stats for course:', error.message);
        }
    };
    const fetchStudentCategoryByBatch = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/report/countStudentsByCategoryForBatch/${batchId}/${fromDate}/${toDate}`);
            console.log(response.data);
            setCategory(response.data);
        } catch (error) {
            setError('Error fetching category stats for course:', error.message);
        }
    };

    const enrolledStudentsInCourseAsPerDates = async () => {
        // Add logic to handle fetching data based on selected date range
        try {
            const response = await axios.get(`https://cep-backend.vercel.app/api/report/enrollmentStatsBetweenDatesForCourse/${courseId}/${fromDate}/${toDate}`);
            setGettingCountOfStudentsAsPerDate(response.data)
            console.log(response.data);
            // Handle the response and update state accordingly
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const enrolledStudentsInBatcheAsPerDates = async () => {
        // Add logic to handle fetching data based on selected date range
        try {
            const response = await axios.get(`https://cep-backend.vercel.app/api/report/enrollmentStatsBetweenDatesForBatch/${batchId}/${fromDate}/${toDate}`);
            console.log(response.data);
            setGettingCountOfStudentsAsPerDate(response.data)
            // Handle the response and update state accordingly
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleFromDateChange = (e) => {

        setFromDate(e.target.value);
        setBatchId(''); // Reset batchId when course changes
        setTotalAmount(0); // Reset totalAmount when course changes
        setTotalStudents(0);
    };

    const handleToDateChange = (e) => {

        setToDate(e.target.value);
        setBatchId(''); // Reset batchId when course changes
        setTotalAmount(0); // Reset totalAmount when course changes
        setTotalStudents(0);
    };
    useEffect(() => {
        const fetchTotalAmount = async () => {
            checkHOD()
            if (batchId) {

                await fetchTotalAmountByBatch();
                await enrolledStudentsInBatcheAsPerDates();
                await fetchStudentCategoryByBatch();
                await fetchCertificationStatsForBatch();
                await fetchTotalStudentsByBatch();
                await genderRatioForBatch();

            } else if (courseId) {

                await fetchStudentCategoryByCourse();
                await enrolledStudentsInCourseAsPerDates();
                await fetchTotalAmountByCourse();
                await fetchCertificationStatsForCourse();
                await fetchTotalStudentsByCourse();
                await genderRatioForCourse();

            }
        };

        fetchTotalAmount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [batchId, courseId, fromDate, toDate]);


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
            <div className="d-none"><Auth /></div>
            {loading ? (

                <Player
                    src={Loader}
                    className="player"
                    autoplay
                    loop
                    style={{ height: '300px', width: '300px' }}
                />

            ) : (




                <>
                    <div className="row align-items-center">
                        <div className="col-md-2 ">
                            From
                            <input className="mx-2 form-control" type="date" value={fromDate} onChange={handleFromDateChange} />
                            To
                            <input className="mx-2 form-control" type="date" value={toDate} disabled={fromDate === ''} onChange={handleToDateChange} />
                        </div>
                        <div className="col-md-2 ">
                            <div className=" ">
                                <label className=" select-label ">Course</label>
                                <select className="select form-control" value={courseId} disabled={toDate === ''} onChange={handleCourseChange}>
                                    <option value="">Select a course</option>
                                    {course.map((cour) => (
                                        <option key={cour._id} value={cour._id}>
                                            {cour.name}
                                        </option>
                                    ))}
                                </select>
                                <label className=" select-label mx-2">Batch</label>
                                <select className="select dropdown-toogle form-control" disabled={!Batch.length} value={batchId} onChange={handleBatchChange}>
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
                    </div>
                    <div className="row ">
                        <div className="col-md-3 ">
                            <div className="card bg-light m-2">
                                <div className="card-body">
                                    <div className="row ">

                                    </div>
                                    <h5 className="card-title">
                                        Amount Collected <div className='text-success'>₹ {totalAmount}</div>
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 ">
                            <div className="card bg-light m-2">
                                <div className="card-body">

                                    <h5 className="card-title">
                                        Total Students : <div className={`text-success`}>{totalStudents}</div>
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 ">
                            <div className="card bg-light m-2">
                                <div className="card-body">

                                    <h5 className="card-title">
                                        On Going Course : <div className={`text-success`}>{totalStudents}</div>
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 ">
                            <div className="card bg-light m-2">
                                <div className="card-body">
                                    <div className="row ">

                                    </div>
                                    <h5>Students Enrolled</h5>
                                    {/* {courseId && batchId ? <LineChart data={gettingCountOfStudentsAsPerDate} /> : courseId ? <Graph data={gettingCountOfStudentsAsPerDate} /> : 'No dat to fetch'} */}
                                    <LineChart data={gettingCountOfStudentsAsPerDate} />

                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 ">
                            <div className="card bg-light m-2">
                                <div className="card-body">

                                    <h3>Is Certified</h3>
                                    {courseId && batchId ? <Graph data={batchStats} /> : courseId ? <Graph data={courseStats} /> : 'No dat to fetch'}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 ">
                            <div className="card bg-light m-2">
                                <div className="card-body">

                                    <h3>Gender Ratio</h3>
                                    {courseId && batchId ? <GenderGraph data={batchGender} /> : courseId ? <GenderGraph data={courseGender} /> : 'No dat to fetch'}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 ">
                            <div className="card bg-light m-2">
                                <div className="card-body">

                                    <h3>Category Ratio</h3>
                                    {courseId && batchId ? <Graph data={category} /> : courseId ? <Graph data={category} /> : 'No data to fetch'}
                                </div>
                            </div>
                        </div>

                    </div></>

            )}
            {!loading && course.length === 0 && <p>No data available</p>}

        </div>
    );
};

export default Reports;
