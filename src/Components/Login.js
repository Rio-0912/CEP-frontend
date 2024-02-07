import React, { useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../Assets/Lotte.json';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    let history = useNavigate();
    let { showAlert } = props
    console.log(showAlert);
    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:9000/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                }),
            });

            const json = await response.json();
            console.log(json);

            if (json.success) {
                if (json.data.authority === 'Principal' || json.data.authority === 'Coordinator') {
                    localStorage.setItem('userId', json.data.userId);
                    localStorage.setItem('authority', json.data.authority);
                } else if (json.data.hodAccess) {
                    localStorage.setItem('departmentId', json.data.departmentId);
                }

                // Redirect based on roles
                if (json.data.authority === 'Principal' || json.data.hodAccess || json.data.authority === 'Coordinator') {
                    history('/home');
                    showAlert('Login Successful ', 'success')
                }
            } else {
                console.log('Authentication failed');
                showAlert('Invalid Credentials', 'danger')

            }
        } catch (error) {
            console.error('Error during login:', error);
        }

    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container p-3 ">
            <div className="row d-flex justify-content-center align-items-center ">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5 ">
                    <Lottie
                        animationData={animationData}
                        loop={true}
                        autoplay={true}
                    />
                </div>
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card  " style={{ borderRadius: "1rem" }}>
                        <div className="card-body p-5 text-center">

                            <div className="mb-md-5 mt-md-4 pb-5">

                                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                <p className=" mb-5">Please enter your login and password!</p>

                                <div className="form-outline form-white mb-4">
                                    <input type="email" id="typeEmailX" className="form-control form-control-lg" onChange={onChange} name='email' value={credentials.email} />
                                    <label className="form-label" htmlFor="typeEmailX">Email</label>
                                </div>

                                <div className="form-outline form-white mb-4">
                                    <input type="password" id="typePasswordX" className="form-control form-control-lg" onChange={onChange} name='password' value={credentials.password} />
                                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                                </div>
                                <button className="btn btn-outline-dark btn-lg px-5" type="submit" onClick={handleSubmit}>Login</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
